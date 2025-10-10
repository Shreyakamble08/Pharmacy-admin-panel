// Base URL for API calls (adjust for production)
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://pharmacy-api.vercel.app'; // Replace with actual production API URL

// User profile data
const user = {
  name: "Shreya Kamble",
  role: "Admin"
};

// Display user profile in the UI
function displayUserProfile() {
  const userInitials = document.getElementById('user-initials');
  const userName = document.getElementById('user-name');
  const userRole = document.getElementById('user-role');

  const nameParts = user.name.trim().split(' ');
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : nameParts[0][0];
  userInitials.textContent = initials.toUpperCase();

  userName.textContent = user.name;
  userRole.textContent = user.role;
}

displayUserProfile();

// Global variables for inventory and pagination
let inventory = [];
let totalPages = 1;
let currentPage = 0;
let pageSize = 10;
let allProducts = []; // Store all products for stats calculation

// Debounce function to prevent rapid sidebar toggling
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Update sidebar arrow icon based on state
function updateSidebarArrow(isHidden, isCollapsed, isMobileView) {
  const arrow = $('#sidebar-arrow');
  if (isMobileView) {
    arrow.removeClass('fa-chevron-right fa-chevron-left')
         .addClass(isHidden ? 'fa-chevron-right' : 'fa-chevron-left');
  } else {
    arrow.removeClass('fa-chevron-right fa-chevron-left')
         .addClass(isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left');
  }
}

$(document).ready(function() {
  // Initialize DataTable with removed columns (Issue #7: Table Columns)
  const table = $('#inventoryTable').DataTable({
    scrollX: true,
    fixedHeader: true,
    autoWidth: false,
    searching: false, // Search disabled as per previous requirement
    columns: [
      { 
        data: null, 
        render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1,
        className: "text-center"
      },
      { data: 'productName', className: "text-left" },
      { data: 'productCategory', className: "text-left" },
      { data: 'productSubCategory', className: "text-left" },
      { data: 'batchNo', className: "text-left" },
      { data: 'productQuantity', className: "text-center" },
      { 
        data: 'productOldPrice', 
        render: $.fn.dataTable.render.number(',', '.', 2, '₹'),
        className: "text-right"
      },
      { 
        data: 'productPrice', 
        render: $.fn.dataTable.render.number(',', '.', 2, '₹'),
        className: "text-right"
      },
      { data: 'expDate', className: "text-left" },
      { data: 'brandName', className: "text-left" },
      { 
        data: 'prescriptionRequired',
        render: data => data ? 'Yes' : 'No',
        className: "text-center"
      },
      {
        data: null,
        render: (data) => `
          <div class="flex justify-center space-x-2">
            <button onclick="showViewModal(${data.productId})" class="action-btn bg-blue-100 text-blue-600" title="View"><i class="fas fa-eye"></i></button>
            <button onclick="showEditModal(${data.productId})" class="action-btn bg-green-100 text-green-600" title="Edit"><i class="fas fa-edit"></i></button>
            <button onclick="showDeleteConfirm(${data.productId})" class="action-btn bg-red-100 text-red-600" title="Delete"><i class="fas fa-trash"></i></button>
          </div>
        `,
        orderable: false
      }
    ],
    createdRow: function(row, data, dataIndex) {
      // Fix: Highlight rows based on quantity and expiry (Issue #6: Inventory Stats)
      const quantity = parseInt(data.productQuantity) || 0;
      const reorderLevel = parseInt(data.reorderLevel || 0);
      const expDate = new Date(data.expDate);
      const today = new Date('2025-10-08');
      const daysToExpiry = (expDate - today) / (1000 * 60 * 60 * 24);
      
      $(row).removeClass('alert-medium alert-low alert-expired');
      if (isNaN(daysToExpiry) || daysToExpiry <= 30) {
        $(row).addClass('alert-expired');
      } else if (quantity <= reorderLevel * 0.5) {
        $(row).addClass('alert-low');
      } else if (quantity <= reorderLevel) {
        $(row).addClass('alert-medium');
      }
    },
    pageLength: pageSize,
    lengthMenu: [10, 25, 50, 100],
    language: {
      lengthMenu: "Show _MENU_ entries",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      emptyTable: "No products available in the inventory.",
      paginate: {
        previous: "<i class='fas fa-chevron-left'></i>",
        next: "<i class='fas fa-chevron-right'></i>"
      }
    },
    dom: '<"flex justify-between items-center mb-4"l>rt<"flex justify-between items-center mt-4"ip>'
  });

  // Initial fetch of all products for stats and current page
  fetchAllProducts();
  fetchProducts();

  flatpickr(".flatpickr", {
    dateFormat: "Y-m-d"
  });

  let isSidebarHidden = true;
  let isSidebarCollapsed = false;

  const toggleSidebarMobile = debounce(function() {
    const sidebar = $('#sidebar');
    const isMobileView = window.matchMedia('(max-width: 768px)').matches;
    isSidebarHidden = !isSidebarHidden;
    sidebar.toggleClass('-translate-x-full');
    if (!isSidebarHidden) {
      sidebar.removeClass('w-20').addClass('w-64');
      $('#sidebar-title, .nav-text').removeClass('hidden');
    }
    updateSidebarArrow(isSidebarHidden, isSidebarCollapsed, isMobileView);
  }, 100);

  const toggleSidebarLogo = debounce(function() {
    const sidebar = $('#sidebar');
    const isMobileView = window.matchMedia('(max-width: 768px)').matches;

    if (isMobileView) {
      isSidebarHidden = !isSidebarHidden;
      sidebar.toggleClass('-translate-x-full');
      if (!isSidebarHidden) {
        sidebar.removeClass('w-20').addClass('w-64');
        $('#sidebar-title, .nav-text').removeClass('hidden');
      }
    } else {
      isSidebarCollapsed = !isSidebarCollapsed;
      sidebar.toggleClass('w-64 w-20');
      $('#sidebar-title, .nav-text').toggleClass('hidden');
      $('#sidebar-logo').toggleClass('mr-2 mx-auto');
      $('.nav-icon').toggleClass('mr-3 mx-auto');
    }
    updateSidebarArrow(isSidebarHidden, isSidebarCollapsed, isMobileView);
  }, 100);

  $('#toggle-sidebar-mobile, #close-sidebar').on('click', toggleSidebarMobile);
  $('#toggle-sidebar-logo').on('click', toggleSidebarLogo);

  $('#add-medicine').click(function() {
    $('#modalTitle').text('Add Medicine');
    $('#medicineForm')[0].reset();
    $('#mainImagePreview').attr('src', '').addClass('hidden');
    $('#subImagesPreview').empty();
    $('#custom-fields').addClass('hidden');
    $('#custom-fields-container').empty();
    $('#medicineForm').removeData('editId');
    $('#mainImage').prop('required', true); // Require image for new products
    $('#medicineModal').show();
  });

  $('.close').click(function() {
    closeModal($(this).closest('.modal').attr('id'));
  });

  $('#mainImage').change(function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $('#mainImagePreview').attr('src', e.target.result).removeClass('hidden');
      };
      reader.readAsDataURL(file);
    } else {
      $('#mainImagePreview').attr('src', '').addClass('hidden');
    }
  });

  $('#subImages').change(function(event) {
    const files = event.target.files;
    $('#subImagesPreview').empty();
    if (files.length > 4) {
      Toastify({
        text: 'You can upload up to 4 sub-images.',
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
      $(this).val('');
      return;
    }
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        $('#subImagesPreview').append(
          `<img src="${e.target.result}" alt="Sub Image Preview ${index + 1}" class="image-preview w-24 h-24 object-cover rounded" />`
        );
      };
      reader.readAsDataURL(file);
    });
  });

  $('#toggle-custom-fields').click(function() {
    $('#custom-fields').toggleClass('hidden');
  });

  $('#add-custom-field').click(function() {
    const fieldId = `custom-field-${Date.now()}`;
    $('#custom-fields-container').append(`
      <div id="${fieldId}" class="flex gap-2 items-center">
        <input type="text" class="custom-field-name w-1/2 border rounded-lg p-2" placeholder="Field Name" required />
        <input type="text" class="custom-field-value w-1/2 border rounded-lg p-2" placeholder="Field Value" required />
        <button type="button" class="delete-custom-field bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600">Delete</button>
      </div>
    `);
    $('.delete-custom-field').off('click').on('click', function() {
      $(this).parent().remove();
    });
  });

  $('#medicineForm').submit(function(e) {
    e.preventDefault();
    // Fix: Image validation for edit mode (Issue #2: Edit Form Image Handling)
    const editId = $('#medicineForm').data('editId');
    const mainImageFile = $('#mainImage').prop('files')[0];
    const hasExistingMainImage = $('#mainImagePreview').attr('src') && $('#mainImagePreview').attr('src') !== '';
    
    if (!editId && !mainImageFile) {
      Toastify({
        text: 'Please upload a main image for a new product.',
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
      return;
    }
    if (editId && !mainImageFile && !hasExistingMainImage) {
      Toastify({
        text: 'Please upload a main image or ensure an existing image is present.',
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
      return;
    }

    const formData = new FormData();
    const customFields = {};
    $('#custom-fields-container .custom-field-name').each(function(index) {
      const name = $(this).val();
      const value = $(this).siblings('.custom-field-value').val();
      if (name && value) {
        customFields[name] = value;
      }
    });
    const productData = {
      productName: $('#name').val() || '',
      productCategory: $('#category').val() || '',
      productSubCategory: $('#subCategory').val() || '',
      productPrice: parseFloat($('#sellingPrice').val()) || 0,
      productOldPrice: parseFloat($('#costPrice').val()) || 0,
      productStock: $('#productStock').val() || '',
      productStatus: $('#productStatus').val() || '',
      productDescription: $('#description').val() || '',
      productQuantity: parseInt($('#quantity').val()) || 0,
      prescriptionRequired: $('#prescriptionRequired').val() === 'Yes',
      brandName: $('#brand').val() || '',
      mfgDate: $('#mfgDate').val() || '',
      expDate: $('#expDate').val() || '',
      batchNo: $('#batchNumber').val() || '',
      benefitsList: $('#benefits').val().split('\n').filter(line => line.trim()) || [],
      directionsList: $('#directions').val().split('\n').filter(line => line.trim()) || [],
      productDynamicFields: customFields,
      productSizes: $('#productSizes').val().split('\n').filter(line => line.trim()) || []
    };

    formData.append('productData', JSON.stringify(productData));
    if (mainImageFile) {
      formData.append('productMainImage', mainImageFile);
    }
    const subImages = $('#subImages').prop('files');
    Array.from(subImages).slice(0, 4).forEach(file => {
      formData.append('productSubImages', file);
    });

    const url = editId 
      ? `${API_BASE_URL}/api/products/patch-product/${editId}`
      : `${API_BASE_URL}/api/products/create-product`;
    const method = editId ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to ${editId ? 'update' : 'create'} product: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Fix: Refresh all products and current page (Issue #6: Inventory Stats)
        fetchAllProducts();
        fetchProducts(currentPage, pageSize);
        closeModal('medicineModal');
        Toastify({
          text: editId ? 'Product updated successfully!' : 'Product added successfully!',
          duration: 3000,
          style: { background: 'linear-gradient(to right, #00b09b, #96c93d)' }
        }).showToast();
        $('#medicineForm').removeData('editId');
      })
      .catch(error => {
        console.error('Error saving product:', error);
        Toastify({
          text: `Error: ${error.message}`,
          duration: 3000,
          style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
        }).showToast();
      });
  });

  $('#filter-category').change(function() {
    // Fix: Ensure proper filtering and pagination reset, handle 500 errors (Issue #4: Dropdown Filters)
    const category = $(this).val();
    currentPage = 0;
    if (category && category !== '') {
      const normalizedCategory = category.replace(/&/g, '%26'); // Normalize category for URL
      fetch(`${API_BASE_URL}/api/products/get-by-category/${encodeURIComponent(normalizedCategory)}?page=${currentPage}&size=${pageSize}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch products for category ${category}: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          inventory = data.content || [];
          totalPages = data.totalPages || 1;
          const table = $('#inventoryTable').DataTable();
          table.clear().rows.add(inventory).draw();
          updateOverviewCards(allProducts);
          if (inventory.length === 0) {
            Toastify({
              text: `No products found for category: ${category}`,
              duration: 3000,
              style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
            }).showToast();
          }
        })
        .catch(error => {
          console.error('Error fetching products by category:', error);
          Toastify({
            text: `Failed to load products for category: ${error.message}`,
            duration: 3000,
            style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
          }).showToast();
          // Fallback to fetching all products
          fetchProducts(currentPage, pageSize);
        });
    } else {
      fetchProducts(currentPage, pageSize);
    }
  });

  $('#bulk-upload').click(function() {
    $('#bulkUploadModal').show();
    $('#bulkUploadForm')[0].reset();
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadLoader').removeClass('hidden');
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
  });

  $('#bulkUploadForm').submit(function(e) {
    e.preventDefault();
    const formData = new FormData();
    const excelFile = $('#bulkExcelInput').prop('files')[0];
    const images = $('#bulkImagesInput').prop('files');

    if (excelFile) {
      formData.append('excelFile', excelFile);
      Array.from(images).forEach(file => {
        formData.append('productImages', file);
      });

      $('#bulkUploadOverlay').removeClass('hidden');
      $('#bulkUploadLoader').removeClass('hidden');
      $('#bulkUploadAcknowledgment').addClass('hidden');

      fetch(`${API_BASE_URL}/api/products/bulk-products-upload`, {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Bulk upload failed: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setTimeout(() => {
            $('#bulkUploadLoader').addClass('hidden');
            $('#bulkUploadedCount').text(data.uploadedCount || 0);
            $('#bulkSkippedCount').text(data.skippedCount || 0);

            if (data.skippedReasons && data.skippedReasons.length > 0) {
              $('#bulkSkippedReasonsContainer').removeClass('hidden');
              const list = $('#bulkSkippedReasonsList');
              list.empty();
              data.skippedReasons.forEach((reason) => {
                const li = $('<li>').text(reason).addClass('ml-4');
                list.append(li);
              });
            } else {
              $('#bulkSkippedReasonsContainer').addClass('hidden');
            }

            $('#bulkUploadAcknowledgment').removeClass('hidden');
            // Fix: Refresh all products and current page (Issue #6: Inventory Stats)
            fetchAllProducts();
            fetchProducts(currentPage, pageSize);
            Toastify({
              text: `Successfully imported ${data.uploadedCount || 'multiple'} items`,
              duration: 3000,
              style: { background: 'linear-gradient(to right, #00b09b, #96c93d)' }
            }).showToast();
          }, 1500);
        })
        .catch(error => {
          console.error('Error during bulk upload:', error);
          $('#bulkUploadLoader').addClass('hidden');
          $('#bulkUploadAcknowledgment').addClass('hidden');
          $('#bulkUploadOverlay').addClass('hidden');
          Toastify({
            text: `Error during bulk upload: ${error.message}`,
            duration: 3000,
            style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
          }).showToast();
        });
    } else {
      Toastify({
        text: 'Please upload an Excel file.',
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    }
  });

  window.resetBulkUpload = function() {
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadForm')[0].reset();
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
    closeModal('bulkUploadModal');
  };

  $('#export-csv').click(function() {
    // Fix: Use allProducts for export to include all items (Issue #6: Inventory Stats)
    const products = allProducts;
    const wsData = [
      ['Sr. No.', 'Product Name', 'Category', 'Sub Category', 'Brand', 'Batch No.', 'Quantity', 'Cost Price', 'Selling Price', 'Expiry Date', 'Prescription', 'Description', 'Images'],
      ...products.map((item, index) => [
        index + 1,
        item.productName || '',
        item.productCategory || '',
        item.productSubCategory || '',
        item.brandName || '',
        item.batchNo || '',
        item.productQuantity || 0,
        item.productOldPrice || 0,
        item.productPrice || 0,
        item.expDate || '',
        item.prescriptionRequired ? 'Yes' : 'No',
        item.productDescription || '',
        [item.productMainImage, ...(item.productSubImages || [])].filter(img => img).join(';')
      ])
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory_export.xlsx');
  });

  $('#confirmDelete').click(function() {
    deleteItem();
  });

  $('#inventoryTable_length select').on('change', function() {
    // Fix: Update pageSize and reset page for pagination (Issue #5: Show Entries & Pagination)
    pageSize = parseInt($(this).val());
    currentPage = 0;
    const category = $('#filter-category').val();
    if (category && category !== '') {
      const normalizedCategory = category.replace(/&/g, '%26');
      fetch(`${API_BASE_URL}/api/products/get-by-category/${encodeURIComponent(normalizedCategory)}?page=${currentPage}&size=${pageSize}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch products for category ${category}: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          inventory = data.content || [];
          totalPages = data.totalPages || 1;
          const table = $('#inventoryTable').DataTable();
          table.clear().rows.add(inventory).draw();
          updateOverviewCards(allProducts);
        })
        .catch(error => {
          console.error('Error fetching paginated category products:', error);
          Toastify({
            text: `Failed to load page ${currentPage + 1}: ${error.message}`,
            duration: 3000,
            style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
          }).showToast();
          // Fallback to fetching all products
          fetchProducts(currentPage, pageSize);
        });
    } else {
      fetchProducts(currentPage, pageSize);
    }
  });

  $('#inventoryTable_previous, #inventoryTable_next').on('click', function() {
    // Fix: Handle pagination with category filter (Issue #5: Pagination)
    const newPage = $(this).attr('id') === 'inventoryTable_previous' ? currentPage - 1 : currentPage + 1;
    if (newPage >= 0 && newPage < totalPages) {
      currentPage = newPage;
      const category = $('#filter-category').val();
      if (category && category !== '') {
        const normalizedCategory = category.replace(/&/g, '%26');
        fetch(`${API_BASE_URL}/api/products/get-by-category/${encodeURIComponent(normalizedCategory)}?page=${currentPage}&size=${pageSize}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch products for category ${category}: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            inventory = data.content || [];
            totalPages = data.totalPages || 1;
            const table = $('#inventoryTable').DataTable();
            table.clear().rows.add(inventory).draw();
            updateOverviewCards(allProducts);
          })
          .catch(error => {
            console.error('Error fetching paginated category products:', error);
            Toastify({
              text: `Failed to load page ${newPage + 1}: ${error.message}`,
              duration: 3000,
              style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
            }).showToast();
            // Fallback to fetching all products
            fetchProducts(currentPage, pageSize);
          });
      } else {
        fetchProducts(currentPage, pageSize);
      }
    }
  });
});

function fetchAllProducts() {
  fetch(`${API_BASE_URL}/api/products/get-all-products?page=0&size=1000`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch all products: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      allProducts = data.content || [];
      updateOverviewCards(allProducts);
    })
    .catch(error => {
      console.error('Error fetching all products:', error);
      Toastify({
        text: `Failed to load stats: ${error.message}`,
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    });
}

function fetchProducts(page = 0, size = 10) {
  // Fix: Update pagination variables and improve error handling (Issue #5: Pagination)
  console.log(`Fetching products: page=${page}, size=${size}`);
  currentPage = page;
  pageSize = size;
  fetch(`${API_BASE_URL}/api/products/get-all-products?page=${page}&size=${size}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      inventory = data.content || [];
      totalPages = data.totalPages || 1;
      console.log('Inventory data:', inventory, 'Total pages:', totalPages);
      const table = $('#inventoryTable').DataTable();
      table.clear().rows.add(inventory).draw();
      updateOverviewCards(allProducts);
      if (inventory.length === 0) {
        console.warn('No products returned from API');
        Toastify({
          text: 'No products found in the inventory.',
          duration: 3000,
          style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
        }).showToast();
      }
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      Toastify({
        text: `Failed to load products: ${error.message}. Check if the server is running at ${API_BASE_URL}.`,
        duration: 5000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    });
}

function updateOverviewCards(data) {
  // Fix: Use all products for stats and handle null/undefined values (Issue #6: Inventory Stats)
  const today = new Date('2025-10-08');
  $('#total-items').text(data.length || 0);
  $('#medium-stock').text(data.filter(item => {
    const quantity = parseInt(item.productQuantity) || 0;
    const reorderLevel = parseInt(item.reorderLevel || 0);
    return quantity <= reorderLevel && quantity > reorderLevel * 0.5;
  }).length);
  $('#low-stock').text(data.filter(item => {
    const quantity = parseInt(item.productQuantity) || 0;
    const reorderLevel = parseInt(item.reorderLevel || 0);
    return quantity <= reorderLevel * 0.5;
  }).length);
  $('#expired').text(data.filter(item => {
    const expDate = new Date(item.expDate);
    return isNaN(expDate.getTime()) || (expDate - today) / (1000 * 60 * 60 * 24) <= 30;
  }).length);
}

let currentImageIndex = 0;

function showViewModal(id) {
  console.log(`Fetching product details for ID: ${id}`);
  fetch(`${API_BASE_URL}/api/products/get-product/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.status}`);
      }
      return response.json();
    })
    .then(item => {
      if (!item) {
        Toastify({
          text: 'Product not found',
          duration: 3000,
          style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
        }).showToast();
        return;
      }
      console.log('Product details:', item);
      const detailsHtml = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Product Name:</strong> ${item.productName || 'N/A'}</div>
          <div><strong>Category:</strong> ${item.productCategory || 'N/A'}</div>
          <div><strong>Sub Category:</strong> ${item.productSubCategory || 'N/A'}</div>
          <div><strong>Brand:</strong> ${item.brandName || 'N/A'}</div>
          <div><strong>Batch Number:</strong> ${item.batchNo || 'N/A'}</div>
          <div><strong>Quantity:</strong> ${item.productQuantity || 0}</div>
          <div><strong>Cost Price:</strong> ₹${(item.productOldPrice || 0).toFixed(2)}</div>
          <div><strong>Selling Price:</strong> ₹${(item.productPrice || 0).toFixed(2)}</div>
          <div><strong>Expiry Date:</strong> ${item.expDate || 'N/A'}</div>
          <div><strong>Prescription Required:</strong> ${item.prescriptionRequired ? 'Yes' : 'No'}</div>
          <div class="md:col-span-2"><strong>Description:</strong> ${item.productDescription || 'None'}</div>
          <div class="md:col-span-2"><strong>Benefits:</strong> ${(item.benefitsList || []).join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Directions:</strong> ${(item.directionsList || []).join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Sizes:</strong> ${(item.productSizes || []).join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Custom Fields:</strong> ${
            Object.entries(item.productDynamicFields || {})
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ') || 'None'
          }</div>
        </div>
      `;
      $('#detailsContent').html(detailsHtml);

      const mainImage = $('#detailsMainImage');
      const gallery = $('#detailsImageGallery');
      const navLeft = $('#galleryNavLeft');
      const navRight = $('#galleryNavRight');
      gallery.empty();
      currentImageIndex = 0;

      const images = [item.productMainImage, ...(item.productSubImages || [])].filter(img => img && typeof img === 'string' && img.trim() !== '');
      if (images.length > 0) {
        const validImages = images.map(img => img.startsWith('http') ? img : `${API_BASE_URL}${img}`);
        mainImage.attr('src', validImages[0]).removeClass('hidden');
        validImages.forEach((imgSrc, index) => {
          gallery.append(`<img src="${imgSrc}" alt="Product Image ${index + 1}" class="image-gallery-img ${index === 0 ? 'active' : ''}" onclick="updateMainImage('${imgSrc}', ${index})"/>`);
        });
        navLeft.toggleClass('hidden', validImages.length <= 1);
        navRight.toggleClass('hidden', validImages.length <= 1);
      } else {
        mainImage.attr('src', 'https://via.placeholder.com/400?text=No+Image').removeClass('hidden');
        gallery.append('<p class="text-gray-500 text-center">No images available</p>');
        navLeft.addClass('hidden');
        navRight.addClass('hidden');
      }

      navLeft.off('click').on('click', () => {
        if (currentImageIndex > 0) {
          currentImageIndex--;
          updateMainImage(validImages[currentImageIndex], currentImageIndex);
        }
      });

      navRight.off('click').on('click', () => {
        if (currentImageIndex < validImages.length - 1) {
          currentImageIndex++;
          updateMainImage(validImages[currentImageIndex], currentImageIndex);
        }
      });

      $('#detailsModal').show();
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
      Toastify({
        text: `Failed to load product details: ${error.message}`,
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    });
}

function updateMainImage(src, index) {
  $('#detailsMainImage').attr('src', src);
  $('.image-gallery-img').removeClass('active').eq(index).addClass('active');
  currentImageIndex = index;
}

function showEditModal(id) {
  // Fix: Handle image field for editing without requiring re-upload (Issue #2: Edit Form Image Handling)
  console.log(`Fetching product for edit, ID: ${id}`);
  fetch(`${API_BASE_URL}/api/products/get-product/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch product for edit: ${response.status}`);
      }
      return response.json();
    })
    .then(item => {
      if (!item) {
        Toastify({
          text: 'Product not found',
          duration: 3000,
          style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
        }).showToast();
        return;
      }
      console.log('Product for edit:', item);

      $('#modalTitle').text('Edit Medicine');
      $('#medicineForm')[0].reset();
      $('#name').val(item.productName || '');
      $('#category').val(item.productCategory || '');
      $('#subCategory').val(item.productSubCategory || '');
      $('#sellingPrice').val(item.productPrice ? item.productPrice.toFixed(2) : '');
      $('#costPrice').val(item.productOldPrice ? item.productOldPrice.toFixed(2) : '');
      $('#productStock').val(item.productStock || '');
      $('#productStatus').val(item.productStatus || '');
      $('#description').val(item.productDescription || '');
      $('#quantity').val(item.productQuantity || 0);
      $('#prescriptionRequired').val(item.prescriptionRequired ? 'Yes' : 'No');
      $('#brand').val(item.brandName || '');
      $('#mfgDate').val(item.mfgDate || '');
      $('#expDate').val(item.expDate || '');
      $('#batchNumber').val(item.batchNo || '');
      $('#benefits').val((item.benefitsList || []).join('\n'));
      $('#directions').val((item.directionsList || []).join('\n'));
      $('#productSizes').val((item.productSizes || []).join('\n'));

      $('#mainImagePreview').attr('src', item.productMainImage ? 
        (item.productMainImage.startsWith('http') ? item.productMainImage : `${API_BASE_URL}${item.productMainImage}`) : '')
        .toggleClass('hidden', !item.productMainImage);
      $('#mainImage').prop('required', !item.productMainImage);
      $('#subImagesPreview').empty();
      (item.productSubImages || []).forEach((imgSrc, index) => {
        if (imgSrc) {
          const validImgSrc = imgSrc.startsWith('http') ? imgSrc : `${API_BASE_URL}${imgSrc}`;
          $('#subImagesPreview').append(
            `<img src="${validImgSrc}" alt="Sub Image Preview ${index + 1}" class="image-preview w-24 h-24 object-cover rounded" />`
          );
        }
      });

      $('#custom-fields').removeClass('hidden');
      $('#custom-fields-container').empty();
      Object.entries(item.productDynamicFields || {}).forEach(([key, value]) => {
        const fieldId = `custom-field-${Date.now()}-${key}`;
        $('#custom-fields-container').append(`
          <div id="${fieldId}" class="flex gap-2 items-center">
            <input type="text" class="custom-field-name w-1/2 border rounded-lg p-2" value="${key}" placeholder="Field Name" required />
            <input type="text" class="custom-field-value w-1/2 border rounded-lg p-2" value="${value}" placeholder="Field Value" required />
            <button type="button" class="delete-custom-field bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600">Delete</button>
          </div>
        `);
      });
      $('.delete-custom-field').off('click').on('click', function() {
        $(this).parent().remove();
      });

      $('#medicineForm').data('editId', id);
      $('#medicineModal').show();
    })
    .catch(error => {
      console.error('Error fetching product for edit:', error);
      Toastify({
        text: `Failed to load product for edit: ${error.message}`,
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    });
}

function showDeleteConfirm(id) {
  $('#confirmDelete').data('deleteId', id);
  $('#deleteModal').show();
}

function deleteItem() {
  const id = $('#confirmDelete').data('deleteId');
  fetch(`${API_BASE_URL}/api/products/delete-product/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }
      return response.text();
    })
    .then(message => {
      fetchAllProducts();
      fetchProducts(currentPage, pageSize);
      closeModal('deleteModal');
      Toastify({
        text: message || 'Product deleted successfully!',
        duration: 3000,
        style: { background: 'linear-gradient(to right, #00b09b, #96c93d)' }
      }).showToast();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      Toastify({
        text: `Failed to delete product: ${error.message}`,
        duration: 3000,
        style: { background: 'linear-gradient(to right, #ff5e62, #f09819)' }
      }).showToast();
    });
}

function closeModal(modalId) {
  $(`#${modalId}`).hide();
  if (modalId === 'medicineModal') {
    $('#medicineForm').removeData('editId');
    $('#medicineForm')[0].reset();
    $('#mainImagePreview').attr('src', '').addClass('hidden');
    $('#subImagesPreview').empty();
    $('#custom-fields').addClass('hidden');
    $('#custom-fields-container').empty();
    $('#mainImage').prop('required', true);
  }
  if (modalId === 'bulkUploadModal') {
    $('#bulkUploadForm')[0].reset();
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadLoader').removeClass('hidden');
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
  }
}

window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      closeModal(modals[i].id);
    }
  }
}
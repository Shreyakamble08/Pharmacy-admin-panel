const user = {
  name: "Shreya Kamble",
  role: "Admin"
};

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

let inventory = [];

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
  const table = $('#inventoryTable').DataTable({
    scrollX: true,
    fixedHeader: true,
    autoWidth: false,
    searching: false, // Disable search functionality
    columns: [
      { 
        data: null, 
        render: (data, type, row, meta) => meta.row + 1,
        className: "text-center"
      },
      { data: 'productName', className: "text-left" },
      { data: 'productCategory', className: "text-left" },
      { data: 'productSubCategory', className: "text-left" },
      { data: 'batchNo', className: "text-left" },
      { 
        data: 'productQuantity',
        className: "text-center"
      },
      { 
        data: 'reorderLevel', 
        defaultContent: "N/A",
        className: "text-center"
      },
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
      { 
        data: 'brandName', 
        className: "text-left"
      },
      { 
        data: 'storageLocation', 
        defaultContent: "N/A",
        className: "text-left"
      },
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
      const quantity = parseInt(data.productQuantity);
      const reorderLevel = parseInt(data.reorderLevel || 0);
      const expDate = new Date(data.expDate);
      const today = new Date('2025-10-08');
      const daysToExpiry = (expDate - today) / (1000 * 60 * 60 * 24);
      
      $(row).removeClass('alert-medium alert-low alert-expired');
      if (daysToExpiry <= 30) {
        $(row).addClass('alert-expired');
      } else if (quantity <= reorderLevel * 0.5) {
        $(row).addClass('alert-low');
      } else if (quantity <= reorderLevel) {
        $(row).addClass('alert-medium');
      }
    },
    pageLength: 10,
    lengthMenu: [10, 25, 50, 100],
    language: {
      search: "", // Not used since searching is disabled
      searchPlaceholder: "", // Not used
      lengthMenu: "Show _MENU_ entries",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      emptyTable: "No products available in the inventory.",
      paginate: {
        previous: "<i class='fas fa-chevron-left'></i>",
        next: "<i class='fas fa-chevron-right'></i>"
      }
    },
    dom: '<"flex justify-between items-center mb-4"l>rt<"flex justify-between items-center mt-4"ip>' // Removed 'f' to exclude search input
  });

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
      alert('You can upload up to 4 sub-images.');
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
      updateOverviewCards(inventory);
    });
  });

  $('#medicineForm').submit(function(e) {
    e.preventDefault();
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
      productName: $('#name').val(),
      productCategory: $('#category').val(),
      productSubCategory: $('#subCategory').val(),
      productPrice: parseFloat($('#sellingPrice').val()),
      productOldPrice: parseFloat($('#costPrice').val()),
      productStock: $('#productStock').val(),
      productStatus: $('#productStatus').val(),
      productDescription: $('#description').val(),
      productQuantity: parseInt($('#quantity').val()),
      prescriptionRequired: $('#prescriptionRequired').val() === 'Yes',
      brandName: $('#brand').val(),
      mfgDate: $('#mfgDate').val(),
      expDate: $('#expDate').val(),
      batchNo: $('#batchNumber').val(),
      benefitsList: $('#benefits').val().split('\n').filter(line => line.trim()),
      directionsList: $('#directions').val().split('\n').filter(line => line.trim()),
      productDynamicFields: customFields,
      productSizes: $('#productSizes').val().split('\n').filter(line => line.trim())
    };

    formData.append('productData', JSON.stringify(productData));
    if ($('#mainImage').prop('files')[0]) {
      formData.append('productMainImage', $('#mainImage').prop('files')[0]);
    }
    const subImages = $('#subImages').prop('files');
    Array.from(subImages).slice(0, 4).forEach(file => {
      formData.append('productSubImages', file);
    });

    const editId = $('#medicineForm').data('editId');
    const url = editId 
      ? `http://localhost:8080/api/products/patch-product/${editId}`
      : 'http://localhost:8080/api/products/create-product';
    const method = editId ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        fetchProducts();
        closeModal('medicineModal');
        Toastify({
          text: editId ? 'Product updated successfully!!' : 'Product added successfully!!',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
        }).showToast();
        $('#medicineForm').removeData('editId');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the product.');
      });
  });

  $('#filter-category').change(function() {
    const category = $(this).val();
    if (category) {
      fetch(`http://localhost:8080/api/products/get-by-category/${category}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch products by category');
          }
          return response.json();
        })
        .then(data => {
          inventory = data;
          table.clear().rows.add(data).draw();
          updateOverviewCards(data);
        })
        .catch(error => {
          console.error('Error fetching products by category:', error);
          Toastify({
            text: 'Failed to load products for category: ' + error.message,
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
          }).showToast();
        });
    } else {
      fetchProducts();
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

      fetch('http://localhost:8080/api/products/bulk-products-upload', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Bulk upload failed with status: ' + response.status);
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
            fetchProducts();
            Toastify({
              text: `Successfully imported ${data.uploadedCount || 'multiple'} items`,
              duration: 3000,
              backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
            }).showToast();
          }, 1500);
        })
        .catch(error => {
          console.error('Error during bulk upload:', error);
          $('#bulkUploadLoader').addClass('hidden');
          $('#bulkUploadAcknowledgment').addClass('hidden');
          $('#bulkUploadOverlay').addClass('hidden');
          Toastify({
            text: 'An error occurred during bulk upload: ' + error.message,
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
          }).showToast();
        });
    } else {
      Toastify({
        text: 'Please upload an Excel file.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    }
  });

  window.resetBulkUpload = function() {
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadForm')[0].reset();
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
  };

  $('#export-csv').click(function() {
    fetch('http://localhost:8080/api/products/get-all-products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products for export');
        }
        return response.json();
      })
      .then(data => {
        const products = data.content || [];
        const wsData = [
          ['Sr. No.', 'Product Name', 'Category', 'Sub Category', 'Brand', 'Batch No.', 'Quantity', 'Cost Price', 'Selling Price', 'Expiry Date', 'Supplier Name', 'Prescription', 'Description', 'Images'],
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
            item.brandName || '',
            item.prescriptionRequired ? 'Yes' : 'No',
            item.productDescription || '',
            [item.productMainImage, ...(item.productSubImages || [])].filter(img => img).join(';')
          ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
        XLSX.writeFile(wb, 'inventory_export.xlsx');
      })
      .catch(error => {
        console.error('Error exporting Excel:', error);
        Toastify({
          text: 'Failed to export Excel: ' + error.message,
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
        }).showToast();
      });
  });

  $('#confirmDelete').click(function() {
    deleteItem();
  });

  $('#inventoryTable_length select').on('change', function() {
    const pageSize = parseInt($(this).val());
    fetchProducts(0, pageSize);
  });

  $('#inventoryTable_previous, #inventoryTable_next').on('click', function() {
    const info = table.page.info();
    const newPage = $(this).attr('id') === 'inventoryTable_previous' ? info.page - 1 : info.page + 1;
    if (newPage >= 0 && newPage < info.pages) {
      fetchProducts(newPage, info.length);
    }
  });
});

function fetchProducts(page = 0, size = 10) {
  console.log(`Fetching products: page=${page}, size=${size}`);
  fetch(`http://localhost:8080/api/products/get-all-products?page=${page}&size=${size}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      inventory = data.content || [];
      console.log('Inventory data:', inventory);
      const table = $('#inventoryTable').DataTable();
      table.clear().rows.add(inventory).draw();
      updateOverviewCards(inventory);
      if (inventory.length === 0) {
        console.warn('No products returned from API');
        Toastify({
          text: 'No products found in the inventory.',
          duration: 3000,
          backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
        }).showToast();
      }
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      Toastify({
        text: 'Failed to load products: ' + error.message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    });
}

function updateOverviewCards(data) {
  const today = new Date('2025-10-08');
  $('#total-items').text(data.length);
  $('#medium-stock').text(data.filter(item => item.productQuantity <= (item.reorderLevel || 0) && item.productQuantity > (item.reorderLevel || 0) * 0.5).length);
  $('#low-stock').text(data.filter(item => item.productQuantity <= (item.reorderLevel || 0) * 0.5).length);
  $('#expired').text(data.filter(item => {
    const expDate = new Date(item.expDate);
    const daysToExpiry = (expDate - today) / (1000 * 60 * 60 * 24);
    return daysToExpiry <= 30;
  }).length);
}

let currentImageIndex = 0;

function showViewModal(id) {
  console.log(`Fetching product details for ID: ${id}`);
  fetch(`http://localhost:8080/api/products/get-product/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      return response.json();
    })
    .then(item => {
      if (!item) {
        alert('Product not found');
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
        const validImages = images.map(img => {
          return img.startsWith('http') ? img : `http://localhost:8080${img}`;
        });
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
        text: 'Failed to load product details: ' + error.message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    });
}

function updateMainImage(src, index) {
  $('#detailsMainImage').attr('src', src);
  $('.image-gallery-img').removeClass('active').eq(index).addClass('active');
  currentImageIndex = index;
}

function showEditModal(id) {
  console.log(`Fetching product for edit, ID: ${id}`);
  fetch(`http://localhost:8080/api/products/get-product/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch product for edit');
      }
      return response.json();
    })
    .then(item => {
      $('#modalTitle').text('Edit Medicine');
      $('#name').val(item.productName);
      $('#category').val(item.productCategory);
      $('#subCategory').val(item.productSubCategory);
      $('#sellingPrice').val(item.productPrice);
      $('#costPrice').val(item.productOldPrice);
      $('#productStock').val(item.productStock);
      $('#productStatus').val(item.productStatus);
      $('#description').val(item.productDescription);
      $('#quantity').val(item.productQuantity);
      $('#prescriptionRequired').val(item.prescriptionRequired ? 'Yes' : 'No');
      $('#brand').val(item.brandName);
      $('#mfgDate').val(item.mfgDate);
      $('#expDate').val(item.expDate);
      $('#batchNumber').val(item.batchNo);
      $('#benefits').val((item.benefitsList || []).join('\n'));
      $('#directions').val((item.directionsList || []).join('\n'));
      $('#productSizes').val((item.productSizes || []).join('\n'));

      $('#mainImagePreview').attr('src', item.productMainImage?.startsWith('http') ? item.productMainImage : `http://localhost:8080${item.productMainImage || ''}`).toggleClass('hidden', !item.productMainImage);
      $('#subImagesPreview').empty();
      (item.productSubImages || []).forEach((imgSrc, index) => {
        if (imgSrc) {
          const validImgSrc = imgSrc.startsWith('http') ? imgSrc : `http://localhost:8080${imgSrc}`;
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
        updateOverviewCards(inventory);
      });

      $('#medicineForm').data('editId', id);
      $('#medicineModal').show();
    })
    .catch(error => {
      console.error('Error fetching product for edit:', error);
      Toastify({
        text: 'Failed to load product for edit: ' + error.message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    });
}

function showDeleteConfirm(id) {
  $('#confirmDelete').data('deleteId', id);
  $('#deleteModal').show();
}

function deleteItem() {
  const id = $('#confirmDelete').data('deleteId');
  fetch(`http://localhost:8080/api/products/delete-product/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return response.text();
    })
    .then(message => {
      fetchProducts();
      closeModal('deleteModal');
      Toastify({
        text: message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      Toastify({
        text: 'Failed to delete product: ' + error.message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
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
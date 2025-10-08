// Assuming Toastify and SheetJS are included via CDN in the HTML
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

// Inventory data store
let inventory = [];

// Debounce function to prevent rapid clicks
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

// Function to update sidebar arrow based on state
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
  // Initialize DataTable
  const table = $('#inventoryTable').DataTable({
    scrollX: true,
    fixedHeader: true,
    autoWidth: false,
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
        render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        className: "text-right"
      },
      { 
        data: 'productPrice', 
        render: $.fn.dataTable.render.number(',', '.', 2, '$'),
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
    language: {
      search: "",
      searchPlaceholder: "Search table...",
      lengthMenu: "Show _MENU_ entries",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      paginate: {
        previous: "<i class='fas fa-chevron-left'></i>",
        next: "<i class='fas fa-chevron-right'></i>"
      }
    },
    dom: '<"flex justify-between items-center mb-4"l>rt<"flex justify-between items-center mt-4"ip>'
  });

  // Fetch all products
  fetchProducts();

  // Initialize Flatpickr
  flatpickr(".flatpickr", {
    dateFormat: "Y-m-d"
  });

  // Sidebar Toggle Functionality
  let isSidebarHidden = true;
  let isSidebarCollapsed = false;

  // Debounced toggle functions
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

  // Attach debounced event handlers
  $('#toggle-sidebar-mobile, #close-sidebar').on('click', toggleSidebarMobile);
  $('#toggle-sidebar-logo').on('click', toggleSidebarLogo);

  // Add Medicine Modal
  $('#add-medicine').click(function() {
    $('#modalTitle').text('Add Medicine');
    $('#medicineForm')[0].reset();
    $('#mainImagePreview').attr('src', '').addClass('hidden');
    $('#subImagesPreview').empty();
    $('#custom-fields').addClass('hidden');
    $('#custom-fields-container').empty();
    $('#medicineModal').show();
  });

  // Close Modals
  $('.close').click(function() {
    closeModal($(this).closest('.modal').attr('id'));
  });

  // Image Previews
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

  // Custom Fields Functionality
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

  // Form Submission
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

  // Category Filter
  $('#filter-category').change(function() {
    const category = $(this).val();
    if (category) {
      fetch(`http://localhost:8080/api/products/get-by-category/${category}`)
        .then(response => response.json())
        .then(data => {
          table.clear().rows.add(data).draw();
          updateOverviewCards(data);
        })
        .catch(error => console.error('Error fetching products by category:', error));
    } else {
      fetchProducts();
    }
  });

  // Bulk Upload Modal
  $('#bulk-upload').click(function() {
    $('#bulkUploadModal').show();
    $('#bulkUploadForm')[0].reset();
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadLoader').removeClass('hidden');
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
  });

  // Bulk Upload Form Submission
  $('#bulkUploadForm').submit(function(e) {
    e.preventDefault();
    const formData = new FormData();
    const excelFile = $('#bulkExcelInput').prop('files')[0];
    const images = $('#bulkImagesInput').prop('files');

    if (excelFile) {
      formData.append('excelFile', excelFile);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      // Show loader
      $('#bulkUploadOverlay').removeClass('hidden');
      $('#bulkUploadLoader').removeClass('hidden');
      $('#bulkUploadAcknowledgment').addClass('hidden');

      fetch('http://localhost:8080/api/products/bulk-upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // Hide loader and show acknowledgment after 1.5s
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
          console.error('Error:', error);
          $('#bulkUploadLoader').addClass('hidden');
          $('#bulkUploadAcknowledgment').addClass('hidden');
          $('#bulkUploadOverlay').addClass('hidden');
          alert('An error occurred during bulk upload.');
        });
    } else {
      alert('Please upload an Excel file.');
    }
  });

  // Reset Bulk Upload
  window.resetBulkUpload = function() {
    $('#bulkUploadAcknowledgment').addClass('hidden');
    $('#bulkUploadOverlay').addClass('hidden');
    $('#bulkUploadForm')[0].reset();
    $('#bulkSkippedReasonsContainer').addClass('hidden');
    $('#bulkSkippedReasonsList').empty();
  };

  // Export Excel
  $('#export-csv').click(function() {
    fetch('http://localhost:8080/api/products/get-all-products')
      .then(response => response.json())
      .then(data => {
        const products = data.content;
        const wsData = [
          ['Sr. No.', 'Product Name', 'Category', 'Sub Category', 'Brand', 'Batch No.', 'Quantity', 'Cost Price', 'Selling Price', 'Expiry Date', 'Supplier Name', 'Prescription', 'Description', 'Images'],
          ...products.map((item, index) => [
            index + 1,
            item.productName,
            item.productCategory,
            item.productSubCategory,
            item.brandName,
            item.batchNo,
            item.productQuantity,
            item.productOldPrice,
            item.productPrice,
            item.expDate,
            item.brandName,
            item.prescriptionRequired ? 'Yes' : 'No',
            item.productDescription,
            [item.productMainImage, ...item.productSubImages].filter(img => img).join(';')
          ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
        XLSX.write(wb, 'inventory_export.xlsx');
      })
      .catch(error => console.error('Error exporting Excel:', error));
  });

  // Delete confirmation
  $('#confirmDelete').click(function() {
    deleteItem();
  });
});

function fetchProducts(page = 0, size = 10) {
  fetch(`http://localhost:8080/api/products/get-all-products?page=${page}&size=${size}`)
    .then(response => response.json())
    .then(data => {
      inventory = data.content;
      $('#inventoryTable').DataTable().clear().rows.add(inventory).draw();
      updateOverviewCards(inventory);
    })
    .catch(error => console.error('Error fetching products:', error));
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
  fetch(`http://localhost:8080/api/products/get-product/${id}`)
    .then(response => response.json())
    .then(item => {
      const detailsHtml = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Product Name:</strong> ${item.productName}</div>
          <div><strong>Category:</strong> ${item.productCategory}</div>
          <div><strong>Sub Category:</strong> ${item.productSubCategory}</div>
          <div><strong>Brand:</strong> ${item.brandName}</div>
          <div><strong>Batch Number:</strong> ${item.batchNo}</div>
          <div><strong>Quantity:</strong> ${item.productQuantity}</div>
          <div><strong>Cost Price:</strong> $${item.productOldPrice.toFixed(2)}</div>
          <div><strong>Selling Price:</strong> $${item.productPrice.toFixed(2)}</div>
          <div><strong>Expiry Date:</strong> ${item.expDate}</div>
          <div><strong>Prescription Required:</strong> ${item.prescriptionRequired ? 'Yes' : 'No'}</div>
          <div class="md:col-span-2"><strong>Description:</strong> ${item.productDescription}</div>
          <div class="md:col-span-2"><strong>Benefits:</strong> ${item.benefitsList.join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Directions:</strong> ${item.directionsList.join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Sizes:</strong> ${item.productSizes.join(', ') || 'None'}</div>
          <div class="md:col-span-2"><strong>Custom Fields:</strong> ${
            Object.entries(item.productDynamicFields)
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

      const images = [item.productMainImage, ...item.productSubImages].filter(img => img);
      if (images.length > 0) {
        mainImage.attr('src', images[0]).removeClass('hidden');
        images.forEach((imgSrc, index) => {
          if (imgSrc) {
            gallery.append(`<img src="${imgSrc}" alt="Product Image ${index + 1}" class="image-gallery-img ${index === 0 ? 'active' : ''}" onclick="updateMainImage('${imgSrc}', ${index})"/>`);
          }
        });
        navLeft.toggleClass('hidden', images.length <= 1);
        navRight.toggleClass('hidden', images.length <= 1);
      } else {
        mainImage.attr('src', 'https://via.placeholder.com/400?text=No+Image').removeClass('hidden');
        gallery.append('<p class="text-gray-500 text-center">No images available</p>');
        navLeft.addClass('hidden');
        navRight.addClass('hidden');
      }

      navLeft.off('click').on('click', () => {
        if (currentImageIndex > 0) {
          currentImageIndex--;
          updateMainImage(images[currentImageIndex], currentImageIndex);
        }
      });

      navRight.off('click').on('click', () => {
        if (currentImageIndex < images.length - 1) {
          currentImageIndex++;
          updateMainImage(images[currentImageIndex], currentImageIndex);
        }
      });

      $('#detailsModal').show();
    })
    .catch(error => console.error('Error fetching product details:', error));
}

function updateMainImage(src, index) {
  $('#detailsMainImage').attr('src', src);
  $('.image-gallery-img').removeClass('active').eq(index).addClass('active');
  currentImageIndex = index;
}

function showEditModal(id) {
  fetch(`http://localhost:8080/api/products/get-product/${id}`)
    .then(response => response.json())
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
      $('#benefits').val(item.benefitsList.join('\n'));
      $('#directions').val(item.directionsList.join('\n'));
      $('#productSizes').val(item.productSizes.join('\n'));

      $('#mainImagePreview').attr('src', item.productMainImage || '').toggleClass('hidden', !item.productMainImage);
      $('#subImagesPreview').empty();
      item.productSubImages.forEach((imgSrc, index) => {
        if (imgSrc) {
          $('#subImagesPreview').append(
            `<img src="${imgSrc}" alt="Sub Image Preview ${index + 1}" class="image-preview w-24 h-24 object-cover rounded" />`
          );
        }
      });

      $('#custom-fields').removeClass('hidden');
      $('#custom-fields-container').empty();
      Object.entries(item.productDynamicFields).forEach(([key, value]) => {
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
    .catch(error => console.error('Error fetching product for edit:', error));
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
    .then(response => response.text())
    .then(message => {
      fetchProducts();
      closeModal('deleteModal');
      Toastify({
        text: message,
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5e62, #f09819)'
      }).showToast();
    })
    .catch(error => console.error('Error deleting product:', error));
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
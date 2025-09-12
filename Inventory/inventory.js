// User profile functionality
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
let inventory = [
  {
    id: 1,
    name: 'Paracetamol',
    category: 'Tablet',
    genericName: 'Acetaminophen',
    brand: 'MediCorp',
    batchNumber: 'BAT123',
    quantity: 50,
    reorderLevel: 30,
    costPrice: 0.50,
    sellingPrice: 1.00,
    expDate: '2026-03-15',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf A1',
    prescriptionRequired: 'No',
    description: 'Pain reliever and fever reducer. Used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Ibuprofen',
    category: 'Tablet',
    genericName: 'Ibuprofen',
    brand: 'PharmaInc',
    batchNumber: 'BAT456',
    quantity: 10,
    reorderLevel: 20,
    costPrice: 0.75,
    sellingPrice: 1.50,
    expDate: '2025-12-01',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf B2',
    prescriptionRequired: 'Yes',
    description: 'Anti-inflammatory drug. Reduces hormones that cause inflammation and pain in the body.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Aspirin',
    category: 'Tablet',
    genericName: 'Acetylsalicylic Acid',
    brand: 'HealthCo',
    batchNumber: 'BAT789',
    quantity: 5,
    reorderLevel: 10,
    costPrice: 0.30,
    sellingPrice: 0.80,
    expDate: '2025-09-01',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf C3',
    prescriptionRequired: 'Yes',
    description: 'Pain reliever and blood thinner. Used to reduce fever and relieve mild to moderate pain from conditions such as muscle aches, toothaches, common cold, and headaches.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Amoxicillin',
    category: 'Capsule',
    genericName: 'Amoxicillin',
    brand: 'MediCorp',
    batchNumber: 'BAT101',
    quantity: 35,
    reorderLevel: 25,
    costPrice: 1.20,
    sellingPrice: 2.50,
    expDate: '2026-05-20',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf D4',
    prescriptionRequired: 'Yes',
    description: 'Antibiotic used to treat a number of bacterial infections. This includes middle ear infection, strep throat, pneumonia, skin infections, and urinary tract infections.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'Vitamin C',
    category: 'Tablet',
    genericName: 'Ascorbic Acid',
    brand: 'HealthCo',
    batchNumber: 'BAT202',
    quantity: 100,
    reorderLevel: 50,
    costPrice: 0.15,
    sellingPrice: 0.40,
    expDate: '2026-10-15',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf E5',
    prescriptionRequired: 'No',
    description: 'Vitamin C is used to prevent and treat vitamin C deficiency. Also used to boost the immune system.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 6,
    name: 'Cough Syrup',
    category: 'Syrup',
    genericName: 'Dextromethorphan',
    brand: 'PharmaInc',
    batchNumber: 'BAT303',
    quantity: 15,
    reorderLevel: 20,
    costPrice: 1.00,
    sellingPrice: 2.00,
    expDate: '2025-11-10',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf F6',
    prescriptionRequired: 'No',
    description: 'Relieves cough and cold symptoms.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 7,
    name: 'Antibiotic Injection',
    category: 'Injection',
    genericName: 'Penicillin',
    brand: 'MediCorp',
    batchNumber: 'BAT404',
    quantity: 8,
    reorderLevel: 15,
    costPrice: 5.00,
    sellingPrice: 10.00,
    expDate: '2026-04-01',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf G7',
    prescriptionRequired: 'Yes',
    description: 'Used for severe bacterial infections.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 8,
    name: 'Ointment A',
    category: 'Ointment',
    genericName: 'Hydrocortisone',
    brand: 'HealthCo',
    batchNumber: 'BAT505',
    quantity: 20,
    reorderLevel: 25,
    costPrice: 0.80,
    sellingPrice: 1.50,
    expDate: '2025-10-15',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf H8',
    prescriptionRequired: 'No',
    description: 'Topical cream for skin inflammation.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 9,
    name: 'Diabetes Tablet',
    category: 'Tablet',
    genericName: 'Metformin',
    brand: 'PharmaInc',
    batchNumber: 'BAT606',
    quantity: 30,
    reorderLevel: 40,
    costPrice: 0.90,
    sellingPrice: 1.80,
    expDate: '2026-06-30',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf I9',
    prescriptionRequired: 'Yes',
    description: 'Controls blood sugar levels.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 10,
    name: 'Allergy Syrup',
    category: 'Syrup',
    genericName: 'Cetirizine',
    brand: 'MediCorp',
    batchNumber: 'BAT707',
    quantity: 12,
    reorderLevel: 20,
    costPrice: 1.20,
    sellingPrice: 2.50,
    expDate: '2025-09-20',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf J10',
    prescriptionRequired: 'No',
    description: 'Relieves allergy symptoms.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 11,
    name: 'Pain Relief Injection',
    category: 'Injection',
    genericName: 'Morphine',
    brand: 'HealthCo',
    batchNumber: 'BAT808',
    quantity: 5,
    reorderLevel: 10,
    costPrice: 6.00,
    sellingPrice: 12.00,
    expDate: '2026-02-15',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf K11',
    prescriptionRequired: 'Yes',
    description: 'Strong pain relief for severe conditions.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 12,
    name: 'Burn Ointment',
    category: 'Ointment',
    genericName: 'Silver Sulfadiazine',
    brand: 'PharmaInc',
    batchNumber: 'BAT909',
    quantity: 25,
    reorderLevel: 30,
    costPrice: 1.50,
    sellingPrice: 3.00,
    expDate: '2025-12-31',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf L12',
    prescriptionRequired: 'No',
    description: 'Treats burn wounds.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 13,
    name: 'Antacid Tablet',
    category: 'Tablet',
    genericName: 'Omeprazole',
    brand: 'MediCorp',
    batchNumber: 'BAT1010',
    quantity: 40,
    reorderLevel: 50,
    costPrice: 0.70,
    sellingPrice: 1.40,
    expDate: '2026-07-20',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf M13',
    prescriptionRequired: 'No',
    description: 'Relieves heartburn and acid reflux.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 14,
    name: 'Cold Syrup',
    category: 'Syrup',
    genericName: 'Pseudoephedrine',
    brand: 'HealthCo',
    batchNumber: 'BAT1111',
    quantity: 18,
    reorderLevel: 25,
    costPrice: 1.10,
    sellingPrice: 2.20,
    expDate: '2025-11-05',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf N14',
    prescriptionRequired: 'No',
    description: 'Relieves nasal congestion.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 15,
    name: 'Antibiotic Ointment',
    category: 'Ointment',
    genericName: 'Neomycin',
    brand: 'PharmaInc',
    batchNumber: 'BAT1212',
    quantity: 10,
    reorderLevel: 15,
    costPrice: 0.90,
    sellingPrice: 1.80,
    expDate: '2026-03-10',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf O15',
    prescriptionRequired: 'No',
    description: 'Prevents bacterial skin infections.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 16,
    name: 'Blood Pressure Tablet',
    category: 'Tablet',
    genericName: 'Lisinopril',
    brand: 'MediCorp',
    batchNumber: 'BAT1313',
    quantity: 25,
    reorderLevel: 30,
    costPrice: 0.85,
    sellingPrice: 1.70,
    expDate: '2026-08-15',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf P16',
    prescriptionRequired: 'Yes',
    description: 'Manages high blood pressure.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 17,
    name: 'Flu Injection',
    category: 'Injection',
    genericName: 'Influenza Vaccine',
    brand: 'HealthCo',
    batchNumber: 'BAT1414',
    quantity: 30,
    reorderLevel: 40,
    costPrice: 4.00,
    sellingPrice: 8.00,
    expDate: '2025-10-01',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf Q17',
    prescriptionRequired: 'No',
    description: 'Annual flu prevention.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 18,
    name: 'Skin Cream',
    category: 'Ointment',
    genericName: 'Betamethasone',
    brand: 'PharmaInc',
    batchNumber: 'BAT1515',
    quantity: 15,
    reorderLevel: 20,
    costPrice: 1.30,
    sellingPrice: 2.60,
    expDate: '2026-01-20',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf R18',
    prescriptionRequired: 'No',
    description: 'Treats skin inflammation and itching.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 19,
    name: 'Antidepressant Tablet',
    category: 'Tablet',
    genericName: 'Sertraline',
    brand: 'MediCorp',
    batchNumber: 'BAT1616',
    quantity: 20,
    reorderLevel: 25,
    costPrice: 1.00,
    sellingPrice: 2.00,
    expDate: '2026-09-10',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf S19',
    prescriptionRequired: 'Yes',
    description: 'Treats depression and anxiety.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 20,
    name: 'Eye Drops',
    category: 'Syrup',
    genericName: 'Artificial Tears',
    brand: 'HealthCo',
    batchNumber: 'BAT1717',
    quantity: 50,
    reorderLevel: 60,
    costPrice: 0.60,
    sellingPrice: 1.20,
    expDate: '2025-12-25',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf T20',
    prescriptionRequired: 'No',
    description: 'Relieves dry eyes.',
    image: 'https://via.placeholder.com/150'
  }
];

let historyData = {
  1: [
    { date: '2025-09-01', action: 'Stock Added', quantityChange: '+100', note: 'Initial stock' },
    { date: '2025-09-05', action: 'Stock Sold', quantityChange: '-50', note: 'Sale to customer' }
  ],
  2: [
    { date: '2025-09-02', action: 'Stock Added', quantityChange: '+50', note: 'Restock' },
    { date: '2025-09-06', action: 'Stock Sold', quantityChange: '-40', note: 'Sale to customer' }
  ],
  3: [
    { date: '2025-08-01', action: 'Stock Added', quantityChange: '+20', note: 'Initial stock' },
    { date: '2025-08-15', action: 'Stock Sold', quantityChange: '-15', note: 'Sale to customer' }
  ],
  4: [
    { date: '2025-07-10', action: 'Stock Added', quantityChange: '+80', note: 'Initial stock' },
    { date: '2025-08-22', action: 'Stock Sold', quantityChange: '-45', note: 'Hospital order' }
  ],
  5: [
    { date: '2025-06-05', action: 'Stock Added', quantityChange: '+200', note: 'Initial stock' },
    { date: '2025-07-18', action: 'Stock Sold', quantityChange: '-100', note: 'Pharmacy chain order' }
  ],
  6: [
    { date: '2025-09-03', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-09-07', action: 'Stock Sold', quantityChange: '-15', note: 'Retail sale' }
  ],
  7: [
    { date: '2025-09-04', action: 'Stock Added', quantityChange: '+20', note: 'Initial stock' },
    { date: '2025-09-08', action: 'Stock Sold', quantityChange: '-12', note: 'Hospital supply' }
  ],
  8: [
    { date: '2025-08-20', action: 'Stock Added', quantityChange: '+40', note: 'Initial stock' },
    { date: '2025-09-01', action: 'Stock Sold', quantityChange: '-20', note: 'Customer purchase' }
  ],
  9: [
    { date: '2025-09-05', action: 'Stock Added', quantityChange: '+50', note: 'Initial stock' },
    { date: '2025-09-09', action: 'Stock Sold', quantityChange: '-25', note: 'Pharmacy sale' }
  ],
  10: [
    { date: '2025-08-15', action: 'Stock Added', quantityChange: '+25', note: 'Initial stock' },
    { date: '2025-09-02', action: 'Stock Sold', quantityChange: '-13', note: 'Retail sale' }
  ],
  11: [
    { date: '2025-09-06', action: 'Stock Added', quantityChange: '+15', note: 'Initial stock' },
    { date: '2025-09-09', action: 'Stock Sold', quantityChange: '-10', note: 'Emergency use' }
  ],
  12: [
    { date: '2025-08-25', action: 'Stock Added', quantityChange: '+35', note: 'Initial stock' },
    { date: '2025-09-03', action: 'Stock Sold', quantityChange: '-15', note: 'Customer purchase' }
  ],
  13: [
    { date: '2025-09-01', action: 'Stock Added', quantityChange: '+60', note: 'Initial stock' },
    { date: '2025-09-07', action: 'Stock Sold', quantityChange: '-20', note: 'Retail sale' }
  ],
  14: [
    { date: '2025-08-10', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-09-04', action: 'Stock Sold', quantityChange: '-12', note: 'Pharmacy sale' }
  ],
  15: [
    { date: '2025-09-02', action: 'Stock Added', quantityChange: '+20', note: 'Initial stock' },
    { date: '2025-09-08', action: 'Stock Sold', quantityChange: '-10', note: 'Customer purchase' }
  ],
  16: [
    { date: '2025-08-30', action: 'Stock Added', quantityChange: '+40', note: 'Initial stock' },
    { date: '2025-09-06', action: 'Stock Sold', quantityChange: '-15', note: 'Retail sale' }
  ],
  17: [
    { date: '2025-09-03', action: 'Stock Added', quantityChange: '+50', note: 'Initial stock' },
    { date: '2025-09-09', action: 'Stock Sold', quantityChange: '-20', note: 'Hospital supply' }
  ],
  18: [
    { date: '2025-08-20', action: 'Stock Added', quantityChange: '+25', note: 'Initial stock' },
    { date: '2025-09-05', action: 'Stock Sold', quantityChange: '-10', note: 'Customer purchase' }
  ],
  19: [
    { date: '2025-09-04', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-09-08', action: 'Stock Sold', quantityChange: '-15', note: 'Pharmacy sale' }
  ],
  20: [
    { date: '2025-08-15', action: 'Stock Added', quantityChange: '+70', note: 'Initial stock' },
    { date: '2025-09-07', action: 'Stock Sold', quantityChange: '-20', note: 'Retail sale' }
  ]
};

$(document).ready(function() {
  // Initialize DataTable
  const table = $('#inventoryTable').DataTable({
    scrollX: true,
    fixedHeader: true,
    autoWidth: false,
    data: inventory,
    columns: [
      { 
        data: null, 
        render: (data, type, row, meta) => meta.row + 1,
        className: "text-center"
      },
      { data: 'name' },
      { data: 'category' },
      { data: 'genericName' },
      { data: 'batchNumber' },
      { 
        data: 'quantity',
        className: "text-center"
      },
      { 
        data: 'reorderLevel',
        className: "text-center"
      },
      { 
        data: 'costPrice', 
        render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        className: "text-right"
      },
      { 
        data: 'sellingPrice', 
        render: $.fn.dataTable.render.number(',', '.', 2, '$'),
        className: "text-right"
      },
      { data: 'expDate' },
      { data: 'supplierName' },
      { data: 'storageLocation' },
      { 
        data: 'prescriptionRequired',
        className: "text-center"
      },
      {
        data: null,
        render: (data) => `
          <div class="flex justify-center space-x-2">
            <button onclick="showViewModal(${data.id})" class="action-btn bg-blue-100 text-blue-600" title="View"><i class="fas fa-eye"></i></button>
            <button onclick="showEditModal(${data.id})" class="action-btn bg-green-100 text-green-600" title="Edit"><i class="fas fa-edit"></i></button>
            <button onclick="showDeleteConfirm(${data.id})" class="action-btn bg-red-100 text-red-600" title="Delete"><i class="fas fa-trash"></i></button>
            <button onclick="showHistory(${data.id})" class="action-btn bg-purple-100 text-purple-600" title="History"><i class="fas fa-history"></i></button>
          </div>
        `,
        orderable: false
      }
    ],
    createdRow: function(row, data, dataIndex) {
      const quantity = parseInt(data.quantity);
      const reorderLevel = parseInt(data.reorderLevel);
      const expDate = new Date(data.expDate);
      const today = new Date('2025-09-09');
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
    dom: '<"flex justify-between items-center mb-4"lf>rt<"flex justify-between items-center mt-4"ip>'
  });

  // Update overview cards
  updateOverviewCards();

  // Initialize Flatpickr
  flatpickr(".flatpickr", {
    dateFormat: "Y-m-d"
  });

  // Sidebar Toggle
  let isCollapsed = false;
  $('#toggle-sidebar-logo, #toggle-sidebar-mobile').click(function() {
    isCollapsed = !isCollapsed;
    $('#sidebar').toggleClass('sidebar-collapsed w-64');
    $('#sidebar-arrow').toggleClass('rotate-180');
    if (isCollapsed) {
      $('#sidebar').css('width', '64px');
    } else {
      $('#sidebar').css('width', '16rem');
    }
  });

  $('#close-sidebar').click(function() {
    $('#sidebar').addClass('-translate-x-full').removeClass('translate-x-0');
    $('#sidebar-arrow').removeClass('rotate-180');
    isCollapsed = false;
    $('#sidebar').removeClass('sidebar-collapsed').css('width', '16rem');
  });

  // Add Medicine Modal
  $('#add-medicine').click(function() {
    $('#modalTitle').text('Add Medicine');
    $('#medicineForm')[0].reset();
    $('#imagePreview').addClass('hidden');
    $('#medicineModal').show();
  });

  // Close Modals
  $('.close').click(function() {
    $(this).closest('.modal').hide();
  });

  // Image Preview
  $('#image').change(function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $('#imagePreview').attr('src', e.target.result).removeClass('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  // Form Submission
  $('#medicineForm').submit(function(e) {
    e.preventDefault();
    const item = {
      id: $('#medicineForm').data('editId') || Math.max(...inventory.map(i => i.id)) + 1,
      name: $('#name').val(),
      category: $('#category').val(),
      genericName: $('#genericName').val(),
      brand: $('#brand').val(),
      batchNumber: $('#batchNumber').val(),
      quantity: parseInt($('#quantity').val()),
      reorderLevel: parseInt($('#reorderLevel').val()),
      costPrice: parseFloat($('#costPrice').val()),
      sellingPrice: parseFloat($('#sellingPrice').val()),
      expDate: $('#expDate').val(),
      supplierName: $('#supplierName').val(),
      storageLocation: $('#storageLocation').val(),
      prescriptionRequired: $('#prescriptionRequired').val(),
      description: $('#description').val(),
      image: $('#imagePreview').attr('src') || 'https://via.placeholder.com/150'
    };

    if ($('#medicineForm').data('editId')) {
      const index = inventory.findIndex(i => i.id === item.id);
      inventory[index] = item;
    } else {
      inventory.push(item);
    }

    table.clear().rows.add(inventory).draw();
    updateOverviewCards();
    closeModal('medicineModal');
    $('#medicineForm').removeData('editId');
  });

  // Category Filter
  $('#filter-category').change(function() {
    table.column(2).search($(this).val()).draw();
  });

  // Search input
  $('#search').on('keyup', function() {
    table.search(this.value).draw();
  });

  // Bulk Upload
  $('#bulk-upload').click(function() {
    $('#bulkUploadInput').click();
  });

  $('#bulkUploadInput').change(function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target.result;
        const rows = text.split('\n').slice(1).filter(row => row);
        rows.forEach(row => {
          const [name, category, genericName, batchNumber, quantity, reorderLevel, costPrice, sellingPrice, expDate, supplierName, storageLocation, prescriptionRequired, description] = row.split(',');
          inventory.push({
            id: Math.max(...inventory.map(i => i.id)) + 1,
            name,
            category,
            genericName,
            brand: '',
            batchNumber,
            quantity: parseInt(quantity),
            reorderLevel: parseInt(reorderLevel),
            costPrice: parseFloat(costPrice),
            sellingPrice: parseFloat(sellingPrice),
            expDate,
            supplierName,
            storageLocation,
            prescriptionRequired,
            description,
            image: 'https://via.placeholder.com/150'
          });
        });
        table.clear().rows.add(inventory).draw();
        updateOverviewCards();
        alert(`Successfully imported ${rows.length} items`);
      };
      reader.readAsText(file);
    }
  });

  // Export CSV
  $('#export-csv').click(function() {
    const data = [
      ['Sr. No.', 'Product Name', 'Category', 'Generic Name', 'Batch No.', 'Quantity', 'Reorder Level', 'Cost Price', 'Selling Price', 'Expiry Date', 'Supplier Name', 'Storage Location', 'Prescription', 'Description'],
      ...inventory.map((item, index) => [
        index + 1,
        `"${item.name}"`,
        item.category,
        `"${item.genericName}"`,
        item.batchNumber,
        item.quantity,
        item.reorderLevel,
        item.costPrice,
        item.sellingPrice,
        item.expDate,
        `"${item.supplierName}"`,
        item.storageLocation,
        item.prescriptionRequired,
        `"${item.description}"`
      ])
    ];
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_export.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Delete confirmation
  $('#confirmDelete').click(function() {
    deleteItem();
  });
});

function updateOverviewCards() {
  const today = new Date('2025-09-09');
  $('#total-items').text(inventory.length);
  $('#medium-stock').text(inventory.filter(item => item.quantity <= item.reorderLevel && item.quantity > item.reorderLevel * 0.5).length);
  $('#low-stock').text(inventory.filter(item => item.quantity <= item.reorderLevel * 0.5).length);
  $('#expired').text(inventory.filter(item => {
    const expDate = new Date(item.expDate);
    const daysToExpiry = (expDate - today) / (1000 * 60 * 60 * 24);
    return daysToExpiry <= 30;
  }).length);
}

function showViewModal(id) {
  const item = inventory.find(i => i.id === id);
  const detailsHtml = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><strong>Product Name:</strong> ${item.name}</div>
      <div><strong>Category:</strong> ${item.category}</div>
      <div><strong>Generic Name:</strong> ${item.genericName}</div>
      <div><strong>Brand:</strong> ${item.brand || 'N/A'}</div>
      <div><strong>Batch Number:</strong> ${item.batchNumber}</div>
      <div><strong>Quantity:</strong> ${item.quantity}</div>
      <div><strong>Reorder Level:</strong> ${item.reorderLevel}</div>
      <div><strong>Cost Price:</strong> $${item.costPrice.toFixed(2)}</div>
      <div><strong>Selling Price:</strong> $${item.sellingPrice.toFixed(2)}</div>
      <div><strong>Expiry Date:</strong> ${item.expDate}</div>
      <div><strong>Supplier:</strong> ${item.supplierName}</div>
      <div><strong>Storage Location:</strong> ${item.storageLocation}</div>
      <div><strong>Prescription Required:</strong> ${item.prescriptionRequired}</div>
    </div>
    <div class="mt-4"><strong>Description:</strong> ${item.description}</div>
  `;
  $('#detailsContent').html(detailsHtml);
  $('#detailsImage').attr('src', item.image).removeClass('hidden');
  $('#detailsModal').show();
}

function showEditModal(id) {
  const item = inventory.find(i => i.id === id);
  $('#modalTitle').text('Edit Medicine');
  $('#name').val(item.name);
  $('#category').val(item.category);
  $('#genericName').val(item.genericName);
  $('#brand').val(item.brand || '');
  $('#batchNumber').val(item.batchNumber);
  $('#quantity').val(item.quantity);
  $('#reorderLevel').val(item.reorderLevel);
  $('#costPrice').val(item.costPrice);
  $('#sellingPrice').val(item.sellingPrice);
  $('#expDate').val(item.expDate);
  $('#supplierName').val(item.supplierName);
  $('#storageLocation').val(item.storageLocation);
  $('#prescriptionRequired').val(item.prescriptionRequired);
  $('#description').val(item.description);
  $('#imagePreview').attr('src', item.image).removeClass('hidden');
  $('#medicineForm').data('editId', id);
  $('#medicineModal').show();
}

function showDeleteConfirm(id) {
  $('#confirmDelete').data('deleteId', id);
  $('#deleteModal').show();
}

function deleteItem() {
  const id = $('#confirmDelete').data('deleteId');
  inventory = inventory.filter(i => i.id !== id);
  $('#inventoryTable').DataTable().clear().rows.add(inventory).draw();
  updateOverviewCards();
  closeModal('deleteModal');
}

function showHistory(id) {
  const history = historyData[id] || [];
  const tbody = $('#historyTable');
  tbody.empty();
  if (history.length === 0) {
    tbody.append('<tr><td colspan="4" class="text-center p-4">No history available for this product</td></tr>');
  } else {
    history.forEach(entry => {
      tbody.append(`
        <tr>
          <td class="p-3">${entry.date}</td>
          <td class="p-3">${entry.action}</td>
          <td class="p-3 ${entry.quantityChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}">${entry.quantityChange}</td>
          <td class="p-3">${entry.note}</td>
        </tr>
      `);
    });
  }
  $('#historyModal').show();
}

function closeModal(modalId) {
  $(`#${modalId}`).hide();
  $('#medicineForm').removeData('editId');
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = 'none';
    }
  }
}
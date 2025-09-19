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
    images: [
      'https://via.placeholder.com/400?text=Paracetamol+1',
      'https://via.placeholder.com/400?text=Paracetamol+2',
      'https://via.placeholder.com/400?text=Paracetamol+3',
      'https://via.placeholder.com/400?text=Paracetamol+4'
    ]
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
    images: ['https://via.placeholder.com/400?text=Ibuprofen+1']
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
    images: []
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
    images: ['https://via.placeholder.com/400?text=Amoxicillin+1', 'https://via.placeholder.com/400?text=Amoxicillin+2']
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
    images: ['https://via.placeholder.com/400?text=Vitamin+C+1', 'https://via.placeholder.com/400?text=Vitamin+C+2', 'https://via.placeholder.com/400?text=Vitamin+C+3']
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
    images: ['https://via.placeholder.com/400?text=Cough+Syrup+1']
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
    images: ['https://via.placeholder.com/400?text=Injection+1', 'https://via.placeholder.com/400?text=Injection+2', 'https://via.placeholder.com/400?text=Injection+3', 'https://via.placeholder.com/400?text=Injection+4']
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
    images: []
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
    images: ['https://via.placeholder.com/400?text=Diabetes+1', 'https://via.placeholder.com/400?text=Diabetes+2']
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
    images: ['https://via.placeholder.com/400?text=Allergy+1', 'https://via.placeholder.com/400?text=Allergy+2', 'https://via.placeholder.com/400?text=Allergy+3', 'https://via.placeholder.com/400?text=Allergy+4']
  },
  {
    id: 11,
    name: 'Antacid',
    category: 'Tablet',
    genericName: 'Calcium Carbonate',
    brand: 'HealthCo',
    batchNumber: 'BAT808',
    quantity: 60,
    reorderLevel: 40,
    costPrice: 0.25,
    sellingPrice: 0.60,
    expDate: '2026-08-10',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf K11',
    prescriptionRequired: 'No',
    description: 'Relieves heartburn and indigestion.',
    images: ['https://via.placeholder.com/400?text=Antacid+1']
  },
  {
    id: 12,
    name: 'Loratadine',
    category: 'Tablet',
    genericName: 'Loratadine',
    brand: 'PharmaInc',
    batchNumber: 'BAT909',
    quantity: 25,
    reorderLevel: 30,
    costPrice: 0.40,
    sellingPrice: 0.90,
    expDate: '2026-01-15',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf L12',
    prescriptionRequired: 'No',
    description: 'Non-drowsy antihistamine for allergy relief.',
    images: ['https://via.placeholder.com/400?text=Loratadine+1', 'https://via.placeholder.com/400?text=Loratadine+2']
  },
  {
    id: 13,
    name: 'Ceftriaxone',
    category: 'Injection',
    genericName: 'Ceftriaxone',
    brand: 'MediCorp',
    batchNumber: 'BAT1010',
    quantity: 10,
    reorderLevel: 15,
    costPrice: 6.00,
    sellingPrice: 12.00,
    expDate: '2026-02-28',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf M13',
    prescriptionRequired: 'Yes',
    description: 'Antibiotic for severe infections.',
    images: ['https://via.placeholder.com/400?text=Ceftriaxone+1', 'https://via.placeholder.com/400?text=Ceftriaxone+2', 'https://via.placeholder.com/400?text=Ceftriaxone+3']
  },
  {
    id: 14,
    name: 'Eye Drops',
    category: 'Solution',
    genericName: 'Tetrahydrozoline',
    brand: 'HealthCo',
    batchNumber: 'BAT1111',
    quantity: 18,
    reorderLevel: 20,
    costPrice: 1.50,
    sellingPrice: 3.00,
    expDate: '2025-11-30',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf N14',
    prescriptionRequired: 'No',
    description: 'Relieves eye redness and irritation.',
    images: []
  },
  {
    id: 15,
    name: 'Omeprazole',
    category: 'Capsule',
    genericName: 'Omeprazole',
    brand: 'PharmaInc',
    batchNumber: 'BAT1212',
    quantity: 40,
    reorderLevel: 30,
    costPrice: 0.70,
    sellingPrice: 1.40,
    expDate: '2026-07-15',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf O15',
    prescriptionRequired: 'Yes',
    description: 'Proton pump inhibitor for acid reflux.',
    images: ['https://via.placeholder.com/400?text=Omeprazole+1']
  },
  {
    id: 16,
    name: 'Codeine Syrup',
    category: 'Syrup',
    genericName: 'Codeine',
    brand: 'MediCorp',
    batchNumber: 'BAT1313',
    quantity: 8,
    reorderLevel: 15,
    costPrice: 2.00,
    sellingPrice: 4.00,
    expDate: '2025-10-01',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf P16',
    prescriptionRequired: 'Yes',
    description: 'Cough suppressant and pain reliever.',
    images: ['https://via.placeholder.com/400?text=Codeine+1', 'https://via.placeholder.com/400?text=Codeine+2']
  },
  {
    id: 17,
    name: 'Lidocaine Gel',
    category: 'Ointment',
    genericName: 'Lidocaine',
    brand: 'HealthCo',
    batchNumber: 'BAT1414',
    quantity: 25,
    reorderLevel: 20,
    costPrice: 1.80,
    sellingPrice: 3.50,
    expDate: '2026-03-31',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf Q17',
    prescriptionRequired: 'Yes',
    description: 'Topical anesthetic for pain relief.',
    images: ['https://via.placeholder.com/400?text=Lidocaine+1', 'https://via.placeholder.com/400?text=Lidocaine+2', 'https://via.placeholder.com/400?text=Lidocaine+3', 'https://via.placeholder.com/400?text=Lidocaine+4']
  },
  {
    id: 18,
    name: 'Atorvastatin',
    category: 'Tablet',
    genericName: 'Atorvastatin',
    brand: 'PharmaInc',
    batchNumber: 'BAT1515',
    quantity: 45,
    reorderLevel: 50,
    costPrice: 0.60,
    sellingPrice: 1.20,
    expDate: '2026-09-10',
    supplierName: 'PharmaInc',
    storageLocation: 'Shelf R18',
    prescriptionRequired: 'Yes',
    description: 'Statin for lowering cholesterol.',
    images: ['https://via.placeholder.com/400?text=Atorvastatin+1']
  },
  {
    id: 19,
    name: 'Salbutamol Inhaler',
    category: 'Inhaler',
    genericName: 'Salbutamol',
    brand: 'MediCorp',
    batchNumber: 'BAT1616',
    quantity: 15,
    reorderLevel: 20,
    costPrice: 3.00,
    sellingPrice: 6.00,
    expDate: '2026-01-20',
    supplierName: 'MediCorp',
    storageLocation: 'Shelf S19',
    prescriptionRequired: 'Yes',
    description: 'Bronchodilator for asthma relief.',
    images: ['https://via.placeholder.com/400?text=Salbutamol+1', 'https://via.placeholder.com/400?text=Salbutamol+2']
  },
  {
    id: 20,
    name: 'Vitamin D',
    category: 'Tablet',
    genericName: 'Cholecalciferol',
    brand: 'HealthCo',
    batchNumber: 'BAT1717',
    quantity: 80,
    reorderLevel: 50,
    costPrice: 0.20,
    sellingPrice: 0.50,
    expDate: '2026-11-15',
    supplierName: 'HealthCo',
    storageLocation: 'Shelf T20',
    prescriptionRequired: 'No',
    description: 'Supports bone health and immune function.',
    images: ['https://via.placeholder.com/400?text=Vitamin+D+1', 'https://via.placeholder.com/400?text=Vitamin+D+2', 'https://via.placeholder.com/400?text=Vitamin+D+3']
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
    { date: '2025-09-07', action: 'Stock Sold', quantityChange: '-15', note: 'Sale to customer' }
  ],
  7: [
    { date: '2025-08-10', action: 'Stock Added', quantityChange: '+20', note: 'Initial stock' },
    { date: '2025-08-25', action: 'Stock Sold', quantityChange: '-12', note: 'Hospital order' }
  ],
  8: [
    { date: '2025-07-15', action: 'Stock Added', quantityChange: '+50', note: 'Initial stock' },
    { date: '2025-08-20', action: 'Stock Sold', quantityChange: '-30', note: 'Sale to customer' }
  ],
  9: [
    { date: '2025-06-20', action: 'Stock Added', quantityChange: '+70', note: 'Initial stock' },
    { date: '2025-07-25', action: 'Stock Sold', quantityChange: '-40', note: 'Pharmacy chain order' }
  ],
  10: [
    { date: '2025-09-01', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-09-10', action: 'Stock Sold', quantityChange: '-18', note: 'Sale to customer' }
  ],
  11: [
    { date: '2025-08-05', action: 'Stock Added', quantityChange: '+100', note: 'Initial stock' },
    { date: '2025-09-01', action: 'Stock Sold', quantityChange: '-40', note: 'Sale to customer' }
  ],
  12: [
    { date: '2025-07-10', action: 'Stock Added', quantityChange: '+50', note: 'Initial stock' },
    { date: '2025-08-15', action: 'Stock Sold', quantityChange: '-25', note: 'Sale to customer' }
  ],
  13: [
    { date: '2025-06-15', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-07-20', action: 'Stock Sold', quantityChange: '-20', note: 'Hospital order' }
  ],
  14: [
    { date: '2025-08-01', action: 'Stock Added', quantityChange: '+40', note: 'Initial stock' },
    { date: '2025-08-25', action: 'Stock Sold', quantityChange: '-22', note: 'Sale to customer' }
  ],
  15: [
    { date: '2025-07-05', action: 'Stock Added', quantityChange: '+80', note: 'Initial stock' },
    { date: '2025-08-10', action: 'Stock Sold', quantityChange: '-40', note: 'Pharmacy chain order' }
  ],
  16: [
    { date: '2025-09-02', action: 'Stock Added', quantityChange: '+20', note: 'Initial stock' },
    { date: '2025-09-08', action: 'Stock Sold', quantityChange: '-12', note: 'Sale to customer' }
  ],
  17: [
    { date: '2025-06-20', action: 'Stock Added', quantityChange: '+50', note: 'Initial stock' },
    { date: '2025-07-25', action: 'Stock Sold', quantityChange: '-25', note: 'Sale to customer' }
  ],
  18: [
    { date: '2025-07-10', action: 'Stock Added', quantityChange: '+80', note: 'Initial stock' },
    { date: '2025-08-15', action: 'Stock Sold', quantityChange: '-35', note: 'Pharmacy chain order' }
  ],
  19: [
    { date: '2025-08-05', action: 'Stock Added', quantityChange: '+30', note: 'Initial stock' },
    { date: '2025-09-01', action: 'Stock Sold', quantityChange: '-15', note: 'Sale to customer' }
  ],
  20: [
    { date: '2025-06-15', action: 'Stock Added', quantityChange: '+100', note: 'Initial stock' },
    { date: '2025-07-20', action: 'Stock Sold', quantityChange: '-20', note: 'Sale to customer' }
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
      const today = new Date('2025-09-19');
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

  // Sidebar Toggle Functionality
  let isSidebarHidden = true; // Track mobile hide/show state
  let isSidebarCollapsed = false; // Track desktop collapse/expand state

  // Mobile toggle (hide/show)
  $('#toggle-sidebar-mobile, #close-sidebar').on('click', function() {
    const sidebar = $('#sidebar');
    isSidebarHidden = !isSidebarHidden;
    sidebar.toggleClass('-translate-x-full');
    if (!isSidebarHidden) {
      sidebar.removeClass('w-20').addClass('w-64'); // Ensure full width when shown
      $('#sidebar-title, .nav-text').removeClass('hidden');
      $('#sidebar-arrow').removeClass('fa-chevron-left').addClass('fa-chevron-right');
    }
  });

  // Desktop toggle (collapse/expand)
  $('#toggle-sidebar-logo').on('click', function() {
    const sidebar = $('#sidebar');
    const isMobileView = window.matchMedia('(max-width: 768px)').matches;

    if (isMobileView) {
      // On mobile, prioritize hide/show over collapse
      isSidebarHidden = !isSidebarHidden;
      sidebar.toggleClass('-translate-x-full');
    } else {
      // On desktop, handle collapse/expand
      isSidebarCollapsed = !isSidebarCollapsed;
      sidebar.toggleClass('w-64 w-20');
      $('#sidebar-title, .nav-text').toggleClass('hidden');
      $('#sidebar-arrow').toggleClass('fa-chevron-right fa-chevron-left');
      $('#sidebar-logo').toggleClass('mr-2 mx-auto');
      $('.nav-icon').toggleClass('mr-3 mx-auto');
    }
  });

  // Add Medicine Modal
  $('#add-medicine').click(function() {
    $('#modalTitle').text('Add Medicine');
    $('#medicineForm')[0].reset();
    $('#imagePreview1, #imagePreview2, #imagePreview3, #imagePreview4').attr('src', '').addClass('hidden');
    $('#medicineModal').show();
  });

  // Close Modals
  $('.close').click(function() {
    closeModal($(this).closest('.modal').attr('id'));
  });

  // Image Previews for Add/Edit Modal
  ['image1', 'image2', 'image3', 'image4'].forEach((id, index) => {
    $(`#${id}`).change(function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          $(`#imagePreview${index + 1}`).attr('src', e.target.result).removeClass('hidden');
        };
        reader.readAsDataURL(file);
      } else {
        $(`#imagePreview${index + 1}`).attr('src', '').addClass('hidden');
      }
    });
  });

  // Form Submission
  $('#medicineForm').submit(function(e) {
    e.preventDefault();
    const images = [
      $('#imagePreview1').attr('src') || 'https://via.placeholder.com/400',
      $('#imagePreview2').attr('src') || '',
      $('#imagePreview3').attr('src') || '',
      $('#imagePreview4').attr('src') || ''
    ].filter(img => img);

    const item = {
      id: $('#medicineForm').data('editId') || Math.max(...inventory.map(i => i.id), 0) + 1,
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
      images: images
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
          const [name, category, genericName, brand, batchNumber, quantity, reorderLevel, costPrice, sellingPrice, expDate, supplierName, storageLocation, prescriptionRequired, description] = row.split(',');
          inventory.push({
            id: Math.max(...inventory.map(i => i.id), 0) + 1,
            name,
            category,
            genericName,
            brand,
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
            images: ['https://via.placeholder.com/400']
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
      ['Sr. No.', 'Product Name', 'Category', 'Generic Name', 'Brand', 'Batch No.', 'Quantity', 'Reorder Level', 'Cost Price', 'Selling Price', 'Expiry Date', 'Supplier Name', 'Storage Location', 'Prescription', 'Description', 'Images'],
      ...inventory.map((item, index) => [
        index + 1,
        `"${item.name}"`,
        item.category,
        `"${item.genericName}"`,
        `"${item.brand}"`,
        item.batchNumber,
        item.quantity,
        item.reorderLevel,
        item.costPrice,
        item.sellingPrice,
        item.expDate,
        `"${item.supplierName}"`,
        item.storageLocation,
        item.prescriptionRequired,
        `"${item.description}"`,
        `"${item.images.join(';')}"`
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
  const today = new Date('2025-09-19');
  $('#total-items').text(inventory.length);
  $('#medium-stock').text(inventory.filter(item => item.quantity <= item.reorderLevel && item.quantity > item.reorderLevel * 0.5).length);
  $('#low-stock').text(inventory.filter(item => item.quantity <= item.reorderLevel * 0.5).length);
  $('#expired').text(inventory.filter(item => {
    const expDate = new Date(item.expDate);
    const daysToExpiry = (expDate - today) / (1000 * 60 * 60 * 24);
    return daysToExpiry <= 30;
  }).length);
}

let currentImageIndex = 0;

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
      <div class="md:col-span-2"><strong>Description:</strong> ${item.description}</div>
    </div>
  `;
  $('#detailsContent').html(detailsHtml);

  // Populate main image and gallery
  const mainImage = $('#detailsMainImage');
  const gallery = $('#detailsImageGallery');
  const navLeft = $('#galleryNavLeft');
  const navRight = $('#galleryNavRight');
  gallery.empty();
  currentImageIndex = 0;

  if (item.images && item.images.length > 0) {
    mainImage.attr('src', item.images[0]).removeClass('hidden');
    item.images.forEach((imgSrc, index) => {
      if (imgSrc) {
        gallery.append(`<img src="${imgSrc}" alt="Product Image ${index + 1}" class="image-gallery-img ${index === 0 ? 'active' : ''}" onclick="updateMainImage('${imgSrc}', ${index})"/>`);
      }
    });
    navLeft.toggleClass('hidden', item.images.length <= 1);
    navRight.toggleClass('hidden', item.images.length <= 1);
  } else {
    mainImage.attr('src', 'https://via.placeholder.com/400?text=No+Image').removeClass('hidden');
    gallery.append('<p class="text-gray-500 text-center">No images available</p>');
    navLeft.addClass('hidden');
    navRight.addClass('hidden');
  }

  // Navigation button handlers
  navLeft.off('click').on('click', () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateMainImage(item.images[currentImageIndex], currentImageIndex);
    }
  });

  navRight.off('click').on('click', () => {
    if (currentImageIndex < item.images.length - 1) {
      currentImageIndex++;
      updateMainImage(item.images[currentImageIndex], currentImageIndex);
    }
  });

  $('#detailsModal').show();
}

function updateMainImage(src, index) {
  $('#detailsMainImage').attr('src', src);
  $('.image-gallery-img').removeClass('active').eq(index).addClass('active');
  currentImageIndex = index;
}

function showEditModal(id) {
  const item = inventory.find(i => i.id === id);
  $('#modalTitle').text('Edit Medicine');
  $('#name').val(item.name);
  $('#category').val(item.category);
  $('#genericName').val(item.genericName);
  $('#brand').val(item.brand);
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

  ['imagePreview1', 'imagePreview2', 'imagePreview3', 'imagePreview4'].forEach((previewId, index) => {
    const imgSrc = item.images && item.images[index] ? item.images[index] : '';
    $(`#${previewId}`).attr('src', imgSrc).toggleClass('hidden', !imgSrc);
  });

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
  const item = inventory.find(i => i.id === id);
  const history = historyData[id] || [];
  const tbody = $('#historyTable');
  tbody.empty();
  if (history.length === 0) {
    tbody.append('<tr><td colspan="5" class="text-center p-4">No history available for this product</td></tr>');
  } else {
    history.forEach(entry => {
      tbody.append(`
        <tr>
          <td class="p-3">${entry.date}</td>
          <td class="p-3">${item.brand}</td>
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
  if (modalId === 'medicineModal') {
    $('#medicineForm').removeData('editId');
    $('#medicineForm')[0].reset();
    $('#imagePreview1, #imagePreview2, #imagePreview3, #imagePreview4').attr('src', '').addClass('hidden');
  }
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      closeModal(modals[i].id);
    }
  }
}


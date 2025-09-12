
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

    // Sidebar toggle functionality
    const toggleSidebarLogo = document.getElementById('toggle-sidebar-logo');
    const sidebarArrow = document.getElementById('sidebar-arrow');
    const sidebar = document.getElementById('sidebar');
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarLogo = document.getElementById('sidebar-logo');
    const toggleSidebarMobile = document.getElementById('toggle-sidebar-mobile');
    const closeSidebar = document.getElementById('close-sidebar');

    toggleSidebarLogo.addEventListener('click', () => {
      sidebar.classList.toggle('w-64');
      sidebar.classList.toggle('w-16');
      sidebar.classList.toggle('sidebar-collapsed');
      sidebarArrow.classList.toggle('fa-chevron-right');
      sidebarArrow.classList.toggle('fa-chevron-left');
      sidebarTitle.classList.toggle('hidden');
      sidebarLogo.classList.toggle('mr-2');
      sidebarLogo.classList.toggle('mx-auto');
    });

    toggleSidebarMobile.addEventListener('click', () => {
      sidebar.classList.add('translate-x-0');
    });

    closeSidebar.addEventListener('click', () => {
      sidebar.classList.remove('translate-x-0');
    });

    // Date range picker
    flatpickr('#date-range', {
      mode: 'range',
      dateFormat: 'Y-m-d',
      onChange: (selectedDates) => {
        console.log('Filter data by:', selectedDates);
      }
    });

    // Sample data
    const prescriptionsData = [
      { patient: 'John Doe', medication: 'Aspirin', date: '2025-09-01', status: 'Filled' },
      { patient: 'Jane Smith', medication: 'Ibuprofen', date: '2025-09-02', status: 'Pending' },
      { patient: 'Alice Johnson', medication: 'Paracetamol', date: '2025-09-03', status: 'Filled' },
      { patient: 'Bob Brown', medication: 'Amoxicillin', date: '2025-09-04', status: 'Cancelled' },
    ];

    const lowStockData = [
      { medication: 'Aspirin', stock: 15, alert: 20, action: 'Reorder' },
      { medication: 'Ibuprofen', stock: 8, alert: 10, action: 'Urgent' },
      { medication: 'Paracetamol', stock: 5, alert: 10, action: 'Urgent' },
      { medication: 'Amoxicillin', stock: 12, alert: 15, action: 'Reorder' },
    ];

    const topSellingData = [
  { medication: 'Aspirin', units: 150, revenue: 2250 },
  { medication: 'Ibuprofen', units: 120, revenue: 1800 },
  { medication: 'Paracetamol', units: 100, revenue: 1500 },
  { medication: 'Amoxicillin', units: 80, revenue: 2000 },
  { medication: 'Cough Syrup', units: 90, revenue: 1350 },
  { medication: 'Vitamin C', units: 130, revenue: 1950 },
  { medication: 'Metformin', units: 60, revenue: 3000 },
  { medication: 'Omeprazole', units: 70, revenue: 2450 },
  { medication: 'Antihistamine', units: 110, revenue: 1650 },
  { medication: 'Insulin', units: 50, revenue: 5000 }
];


    // Sample data for Medicine Expiry Tracker
    const expiryData = [
      { medication: 'Aspirin', expiryDate: '2025-09-20' }, // Within 30 days
      { medication: 'Ibuprofen', expiryDate: '2025-10-01' }, // Within 30 days
      { medication: 'Paracetamol', expiryDate: '2025-10-15' }, // Within 60 days
      { medication: 'Amoxicillin', expiryDate: '2025-10-20' }, // Within 60 days
      { medication: 'Metformin', expiryDate: '2025-10-25' }, // Within 60 days
      { medication: 'Lisinopril', expiryDate: '2025-11-01' }, // Within 60 days
      { medication: 'Atorvastatin', expiryDate: '2025-11-15' }, // Within 90 days
      { medication: 'Omeprazole', expiryDate: '2025-11-20' }, // Within 90 days
      { medication: 'Levothyroxine', expiryDate: '2025-12-01' }, // Within 90 days
      { medication: 'Azithromycin', expiryDate: '2025-12-05' }, // Within 90 days
    ];

    // Dynamic calculation of expiry counts
    const currentDate = new Date('2025-09-08');
    const thirtyDays = new Date(currentDate);
    thirtyDays.setDate(currentDate.getDate() + 30); // Oct 8, 2025
    const sixtyDays = new Date(currentDate);
    sixtyDays.setDate(currentDate.getDate() + 60); // Nov 7, 2025
    const ninetyDays = new Date(currentDate);
    ninetyDays.setDate(currentDate.getDate() + 90); // Dec 7, 2025

    const expiryCounts = {
      'Within 30 Days': expiryData.filter(item => new Date(item.expiryDate) <= thirtyDays).length,
      'Within 60 Days': expiryData.filter(item => new Date(item.expiryDate) > thirtyDays && new Date(item.expiryDate) <= sixtyDays).length,
      'Within 90 Days': expiryData.filter(item => new Date(item.expiryDate) > sixtyDays && new Date(item.expiryDate) <= ninetyDays).length,
    };

    // Populate tables
    function populateTable(tableId, data, columns) {
      const tbody = document.getElementById(tableId);
      tbody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(col => {
          const td = document.createElement('td');
          td.classList.add('py-2', 'border-b', 'border-gray-200');
          td.textContent = item[col];
          if (col === 'status') td.innerHTML = `<span class="px-2 py-1 rounded ${item[col] === 'Filled' ? 'bg-green-200 text-green-800' : item[col] === 'Pending' ? 'bg-blue-200 text-blue-800' : 'bg-red-200 text-red-800'}">${item[col]}</span>`;
          if (col === 'action') td.innerHTML = `<button class="bg-red-500 text-white py-1 px-2 rounded">${item[col]}</button>`;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    }

    populateTable('prescriptionsTable', prescriptionsData, ['patient', 'medication', 'date', 'status']);
    populateTable('lowStockTable', lowStockData, ['medication', 'stock', 'alert', 'action']);
    populateTable('topSellingTable', topSellingData, ['medication', 'units', 'revenue']);

    // Table sorting
    function sortTable(table, col, isNumeric = false) {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.rows);
      const dir = table.querySelector(`th[data-sort="${col}"]`).dataset.dir = table.querySelector(`th[data-sort="${col}"]`).dataset.dir === 'asc' ? 'desc' : 'asc';
      rows.sort((a, b) => {
        let valA = a.querySelector(`td:nth-child(${[...table.querySelector('tr').children].findIndex(th => th.dataset.sort === col) + 1})`).textContent;
        let valB = b.querySelector(`td:nth-child(${[...table.querySelector('tr').children].findIndex(th => th.dataset.sort === col) + 1})`).textContent;
        if (isNumeric) {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        }
        return dir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
      });
      rows.forEach(row => tbody.appendChild(row));
    }

    document.querySelectorAll('#prescriptions-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => sortTable(document.getElementById('prescriptions-table'), th.dataset.sort));
    });

    document.querySelectorAll('#lowstock-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => sortTable(document.getElementById('lowstock-table'), th.dataset.sort, th.dataset.sort === 'stock'));
    });

    document.querySelectorAll('#topselling-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => sortTable(document.getElementById('topselling-table'), th.dataset.sort, th.dataset.sort === 'units' || th.dataset.sort === 'revenue'));
    });

    // Table filtering
    function filterTable(tableId, query) {
      const rows = document.getElementById(tableId).querySelectorAll('tr');
      rows.forEach(row => {
        row.style.display = [...row.children].some(td => td.textContent.toLowerCase().includes(query.toLowerCase())) ? '' : 'none';
      });
    }

    document.getElementById('prescriptions-search').addEventListener('input', (e) => filterTable('prescriptionsTable', e.target.value));
    document.getElementById('lowstock-search').addEventListener('input', (e) => filterTable('lowStockTable', e.target.value));
    document.getElementById('topselling-search').addEventListener('input', (e) => filterTable('topSellingTable', e.target.value));

    // Export to CSV
    function exportToCSV(data, filename) {
      const csv = data.map(row => Object.values(row).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }

    document.getElementById('export-prescriptions').addEventListener('click', () => exportToCSV(prescriptionsData, 'prescriptions.csv'));
    document.getElementById('export-lowstock').addEventListener('click', () => exportToCSV(lowStockData, 'lowstock.csv'));
    document.getElementById('export-topselling').addEventListener('click', () => exportToCSV(topSellingData, 'topselling.csv'));

    // Charts
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Revenue',
          data: [5000, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 12845],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { datalabels: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#e5e7eb', drawBorder: false }, ticks: { color: '#1f2937' } },
          x: { grid: { display: false }, ticks: { color: '#1f2937' } }
        }
      }
    });

    const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
    new Chart(categoriesCtx, {
      type: 'pie',
      data: {
        labels: ['Painkillers', 'Antibiotics', 'Vitamins', 'Others'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: ['#06b6d4', '#34d399', '#fb923c', '#a855f7'],
          borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { color: '#1f2937' } },
          datalabels: { color: '#fff', font: { weight: 'bold' } }
        }
      },
      plugins: [ChartDataLabels]
    });

    const expiryCtx = document.getElementById('expiryChart').getContext('2d');
    new Chart(expiryCtx, {
      type: 'doughnut',
      data: {
        labels: ['Within 30 Days', 'Within 60 Days', 'Within 90 Days'],
        datasets: [{
          data: [expiryCounts['Within 30 Days'], expiryCounts['Within 60 Days'], expiryCounts['Within 90 Days']],
          backgroundColor: ['#06b6d4', '#34d399', '#fb923c'],
          borderColor: ['#ffffff', '#ffffff', '#ffffff'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top', labels: { color: '#1f2937' } },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold' },
            formatter: (value) => value || ''
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} medications (${percentage}%)`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
 
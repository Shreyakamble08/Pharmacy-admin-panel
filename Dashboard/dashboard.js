
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
      document.querySelectorAll('.nav-text').forEach(el => el.classList.toggle('hidden'));
      document.querySelectorAll('.nav-icon').forEach(el => {
        el.classList.toggle('mr-3');
        el.classList.toggle('mx-auto');
      });
    });

    toggleSidebarMobile.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });

    closeSidebar.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
    });

    const prescriptionsData = [
      { patient: 'John Doe', medication: 'Aspirin', date: '2025-09-01', status: 'Approved' },
      { patient: 'Jane Smith', medication: 'Ibuprofen', date: '2025-09-02', status: 'Pending' },
      { patient: 'Alice Johnson', medication: 'Paracetamol', date: '2025-09-03', status: 'Approved' },
      { patient: 'Bob Brown', medication: 'Amoxicillin', date: '2025-09-04', status: 'Rejected' },
      { patient: 'Charlie Wilson', medication: 'Vitamin C', date: '2025-09-05', status: 'Pending' },
      { patient: 'Diana Prince', medication: 'Metformin', date: '2025-09-06', status: 'Approved' },
    ];

    const lowStockData = [
      { medication: 'Aspirin', stock: 15, alert: 20, action: 'Low' },
      { medication: 'Ibuprofen', stock: 0, alert: 10, action: 'Finished' },
      { medication: 'Paracetamol', stock: 5, alert: 10, action: 'Low' },
      { medication: 'Amoxicillin', stock: 0, alert: 15, action: 'Finished' },
      { medication: 'Vitamin C', stock: 25, alert: 30, action: 'Low' },
      { medication: 'Metformin', stock: 12, alert: 20, action: 'Low' },
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

    const expiryData = [
      { medication: 'Aspirin', expiryDate: '2025-09-20' },
      { medication: 'Ibuprofen', expiryDate: '2025-10-01' },
      { medication: 'Paracetamol', expiryDate: '2025-10-15' },
      { medication: 'Amoxicillin', expiryDate: '2025-10-20' },
      { medication: 'Metformin', expiryDate: '2025-10-25' },
      { medication: 'Lisinopril', expiryDate: '2025-11-01' },
      { medication: 'Atorvastatin', expiryDate: '2025-11-15' },
      { medication: 'Omeprazole', expiryDate: '2025-11-20' },
      { medication: 'Levothyroxine', expiryDate: '2025-12-01' },
      { medication: 'Azithromycin', expiryDate: '2025-12-05' },
    ];

    const currentDate = new Date('2025-09-08');
    const thirtyDays = new Date(currentDate);
    thirtyDays.setDate(currentDate.getDate() + 30);
    const sixtyDays = new Date(currentDate);
    sixtyDays.setDate(currentDate.getDate() + 60);
    const ninetyDays = new Date(currentDate);
    ninetyDays.setDate(currentDate.getDate() + 90);

    const expiryCounts = {
      'Within 30 Days': expiryData.filter(item => new Date(item.expiryDate) <= thirtyDays).length,
      'Within 60 Days': expiryData.filter(item => new Date(item.expiryDate) > thirtyDays && new Date(item.expiryDate) <= sixtyDays).length,
      'Within 90 Days': expiryData.filter(item => new Date(item.expiryDate) > sixtyDays && new Date(item.expiryDate) <= ninetyDays).length,
    };

    const expiryDetails = expiryData.map(item => {
      const expiryDate = new Date(item.expiryDate);
      let period = '';
      if (expiryDate <= thirtyDays) {
        period = 'Within 30 Days';
      } else if (expiryDate <= sixtyDays) {
        period = 'Within 60 Days';
      } else if (expiryDate <= ninetyDays) {
        period = 'Within 90 Days';
      }
      return { ...item, period };
    }).filter(item => item.period !== '');

    function populateTable(tableId, data, columns) {
      const tbody = document.getElementById(tableId);
      tbody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(col => {
          const td = document.createElement('td');
          td.classList.add('py-2', 'border-b', 'border-gray-200');
          
          if (col === 'status') {
            td.innerHTML = `<span class="px-2 py-1 rounded ${item[col] === 'Approved' ? 'bg-green-200 text-green-800' : item[col] === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}">${item[col]}</span>`;
          } else if (col === 'action') {
            if (item[col] === 'Finished') {
              td.innerHTML = `<button class="bg-red-500 text-white py-1 px-2 rounded">${item[col]}</button>`;
            } else {
              td.innerHTML = `<button class="bg-yellow-400 text-white py-1 px-2 rounded">${item[col]}</button>`;
            }
          } else if (col === 'revenue') {
            td.textContent = `₹${item[col]}`;
          } else if (col === 'period') {
            td.innerHTML = `<span class="px-2 py-1 rounded ${
              item[col] === 'Within 30 Days' ? 'bg-red-200 text-red-800' :
              item[col] === 'Within 60 Days' ? 'bg-orange-200 text-orange-800' :
              'bg-cyan-200 text-cyan-800'
            }">${item[col]}</span>`;
          } else {
            td.textContent = item[col];
          }
          
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    }

    populateTable('prescriptionsTable', prescriptionsData, ['patient', 'medication', 'date', 'status']);
    populateTable('lowStockTable', lowStockData, ['medication', 'stock', 'alert', 'action']);
    populateTable('topSellingTable', topSellingData, ['medication', 'units', 'revenue']);
    populateTable('expiryTable', expiryDetails, ['medication', 'expiryDate', 'period']);

    function sortTable(table, col, isNumeric = false, isDate = false) {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.rows);
      const dir = table.querySelector(`th[data-sort="${col}"]`).dataset.dir = table.querySelector(`th[data-sort="${col}"]`).dataset.dir === 'asc' ? 'desc' : 'asc';
      rows.sort((a, b) => {
        let valA = a.querySelector(`td:nth-child(${[...table.querySelector('tr').children].findIndex(th => th.dataset.sort === col) + 1})`).textContent;
        let valB = b.querySelector(`td:nth-child(${[...table.querySelector('tr').children].findIndex(th => th.dataset.sort === col) + 1})`).textContent;
        if (isNumeric) {
          valA = parseFloat(valA.replace('₹', ''));
          valB = parseFloat(valB.replace('₹', ''));
        } else if (isDate) {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
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

    document.querySelectorAll('#expiry-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => sortTable(document.getElementById('expiry-table'), th.dataset.sort, false, th.dataset.sort === 'expiryDate'));
    });

    function filterTable(tableId, query, filter = '') {
      const rows = document.getElementById(tableId).querySelectorAll('tr');
      rows.forEach(row => {
        const matchesSearch = query ? [...row.children].some(td => td.textContent.toLowerCase().includes(query.toLowerCase())) : true;
        const matchesFilter = filter ? row.children[row.children.length - 1].textContent === filter : true;
        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
      });
    }

    document.getElementById('lowstock-search').addEventListener('input', (e) => {
      const filter = document.getElementById('lowstock-filter').value;
      filterTable('lowStockTable', e.target.value, filter === 'low' ? 'Low' : filter === 'finished' ? 'Finished' : '');
    });

    document.getElementById('lowstock-filter').addEventListener('change', (e) => {
      const query = document.getElementById('lowstock-search').value;
      filterTable('lowStockTable', query, e.target.value === 'low' ? 'Low' : e.target.value === 'finished' ? 'Finished' : '');
    });

    document.getElementById('prescriptions-status-filter').addEventListener('change', (e) => {
      const timeFilter = document.getElementById('prescriptions-time-filter').value;
      filterTableByStatusAndTime(e.target.value, timeFilter);
    });

    document.getElementById('prescriptions-time-filter').addEventListener('change', (e) => {
      const statusFilter = document.getElementById('prescriptions-status-filter').value;
      filterTableByStatusAndTime(statusFilter, e.target.value);
    });

    function filterTableByStatusAndTime(status, time) {
      const rows = document.getElementById('prescriptionsTable').querySelectorAll('tr');
      const now = new Date('2025-09-08');
      rows.forEach(row => {
        const date = new Date(row.children[2].textContent);
        const statusText = row.children[3].textContent;
        let timeMatch = true;
        
        if (time === 'day') {
          timeMatch = date.toDateString() === now.toDateString();
        } else if (time === 'week') {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          timeMatch = date >= weekAgo;
        } else if (time === 'month') {
          const monthAgo = new Date(now);
          monthAgo.setDate(now.getDate() - 30);
          timeMatch = date >= monthAgo;
        }
        
        const statusMatch = status ? statusText === status : true;
        row.style.display = statusMatch && timeMatch ? '' : 'none';
      });
    }

    document.getElementById('topselling-search').addEventListener('input', (e) => filterTable('topSellingTable', e.target.value));

    function exportToExcel(data, filename) {
      const csv = data.map(row => Object.values(row).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.xls`;
      link.click();
    }

    document.getElementById('export-topselling').addEventListener('click', () => exportToExcel(topSellingData, 'topselling'));

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
        maintainAspectRatio: false,
        plugins: { datalabels: { display: false } },
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: '#e5e7eb', drawBorder: false }, 
            ticks: { 
              color: '#1f2937',
              callback: function(value) {
                return '₹' + value;
              }
            } 
          },
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
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: '#1f2937' } },
          datalabels: { 
            color: '#fff', 
            font: { weight: 'bold' },
            formatter: (value) => value + '%'
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const expiryCtx = document.getElementById('expiryChart').getContext('2d');
    new Chart(expiryCtx, {
      type: 'bar',
      data: {
        labels: ['Within 30 Days', 'Within 60 Days', 'Within 90 Days'],
        datasets: [{
          label: 'Medications Expiring',
          data: [expiryCounts['Within 30 Days'], expiryCounts['Within 60 Days'], expiryCounts['Within 90 Days']],
          backgroundColor: ['#ef4444', '#f97316', '#06b6d4'],
          borderColor: ['#ffffff', '#ffffff', '#ffffff'],
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: true,
            position: 'top', 
            labels: { 
              color: '#1f2937',
              boxWidth: 12,
              padding: 15,
              font: { size: 14 }
            } 
          },
          datalabels: {
            color: '#fff',
            font: { weight: 'bold', size: 14 },
            formatter: (value) => value || '',
            anchor: 'center',
            align: 'center'
          },
          tooltip: {
            backgroundColor: '#1f2937',
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} medications`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: Math.max(...Object.values(expiryCounts)) + 2,
            grid: {
              color: '#e5e7eb',
              drawBorder: false
            },
            ticks: {
              color: '#1f2937',
              stepSize: 1,
              font: { size: 12 }
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#1f2937',
              font: { size: 12 }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    const logoutBtn = document.getElementById('logout-btn');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');
    const closeModal = document.querySelector('#logoutModal .close');

    logoutBtn.addEventListener('click', () => {
      logoutModal.style.display = 'block';
    });

    confirmLogout.addEventListener('click', () => {
      window.location.href = '../Login/login.html?logout=success';
    });

    cancelLogout.addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });

    closeModal.addEventListener('click', () => {
      logoutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === logoutModal) {
        logoutModal.style.display = 'none';
      }
    });
 
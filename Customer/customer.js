
        // User profile
        const user = {
            name: "Shreya Kamble",
            role: "Admin",
        };

        function displayUserProfile() {
            const userInitials = document.getElementById("user-initials");
            const userName = document.getElementById("user-name");
            const userRole = document.getElementById("user-role");

            const nameParts = user.name.trim().split(" ");
            const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` : nameParts[0][0];
            userInitials.textContent = initials.toUpperCase();

            userName.textContent = user.name;
            userRole.textContent = user.role;
        }

        displayUserProfile();

        // Updated dummy data with Indian context
        const customers = [
            {
                id: "CUST-001", firstName: "Amit", lastName: "Sharma", email: "amit.sharma@example.com", phone: "+91 9876543210", city: "Mumbai", state: "MH", addressType: "Home", dob: "1990-05-15", street: "123 Marine Drive", zip: "400001", status: "Active", regDate: "2023-01-15", lastLogin: "2023-10-20 14:32", orders: 24, spent: "₹1,84,500", active: true
            },
            {
                id: "CUST-002", firstName: "Priya", lastName: "Patel", email: "priya.patel@example.com", phone: "+91 8765432109", city: "Delhi", state: "DL", addressType: "Work", dob: "1985-08-22", street: "456 Connaught Place", zip: "110001", status: "Active", regDate: "2022-11-08", lastLogin: "2023-10-21 09:15", orders: 42, spent: "₹3,21,050", active: true
            },
            {
                id: "CUST-003", firstName: "Rahul", lastName: "Verma", email: "rahul.v@example.com", phone: "+91 7654321098", city: "Bengaluru", state: "KA", addressType: "Home", dob: "1978-12-03", street: "789 MG Road", zip: "560001", status: "Active", regDate: "2023-03-27", lastLogin: "2023-10-19 16:45", orders: 15, spent: "₹97,525", active: true
            },
            {
                id: "CUST-004", firstName: "Sneha", lastName: "Gupta", email: "sneha.g@example.com", phone: "+91 6543210987", city: "Kolkata", state: "WB", addressType: "Other", dob: "1992-07-14", street: "321 Park Street", zip: "700016", status: "Deactivated", regDate: "2023-05-10", lastLogin: "2023-10-18 11:20", orders: 31, spent: "₹2,15,075", active: false
            },
            {
                id: "CUST-005", firstName: "Vikram", lastName: "Singh", email: "vikram.s@example.com", phone: "+91 5432109876", city: "Chennai", state: "TN", addressType: "Work", dob: "1982-03-30", street: "654 Anna Salai", zip: "600002", status: "Active", regDate: "2022-09-12", lastLogin: "2023-10-21 13:40", orders: 56, spent: "₹4,32,000", active: true
            },
            {
                id: "CUST-006", firstName: "Anjali", lastName: "Mehta", email: "anjali.m@example.com", phone: "+91 4321098765", city: "Hyderabad", state: "TS", addressType: "Home", dob: "1988-11-25", street: "987 Banjara Hills", zip: "500034", status: "Active", regDate: "2023-02-14", lastLogin: "2023-10-22 10:30", orders: 19, spent: "₹1,20,000", active: true
            },
            {
                id: "CUST-007", firstName: "Rohit", lastName: "Kumar", email: "rohit.k@example.com", phone: "+91 3210987654", city: "Pune", state: "MH", addressType: "Work", dob: "1975-06-10", street: "147 Koregaon Park", zip: "411001", status: "Active", regDate: "2023-04-01", lastLogin: "2023-10-20 15:50", orders: 27, spent: "₹1,89,050", active: true
            },
            {
                id: "CUST-008", firstName: "Pooja", lastName: "Nair", email: "pooja.n@example.com", phone: "+91 2109876543", city: "Mumbai", state: "MH", addressType: "Home", dob: "1993-09-08", street: "258 Juhu Tara Road", zip: "400049", status: "Deactivated", regDate: "2023-06-20", lastLogin: "2023-10-17 08:45", orders: 12, spent: "₹75,025", active: false
            },
            {
                id: "CUST-009", firstName: "Arjun", lastName: "Reddy", email: "arjun.r@example.com", phone: "+91 1098765432", city: "Hyderabad", state: "TS", addressType: "Other", dob: "1980-01-22", street: "369 Gachibowli", zip: "500032", status: "Active", regDate: "2023-07-15", lastLogin: "2023-10-21 12:10", orders: 45, spent: "₹3,50,075", active: true
            },
            {
                id: "CUST-010", firstName: "Neha", lastName: "Joshi", email: "neha.j@example.com", phone: "+91 9988776655", city: "Delhi", state: "DL", addressType: "Home", dob: "1995-04-17", street: "741 Karol Bagh", zip: "110005", status: "Active", regDate: "2023-08-05", lastLogin: "2023-10-22 14:20", orders: 33, spent: "₹2,45,000", active: true
            },
            {
                id: "CUST-011", firstName: "Suresh", lastName: "Rao", email: "suresh.r@example.com", phone: "+91 8877665544", city: "Bengaluru", state: "KA", addressType: "Work", dob: "1987-02-09", street: "852 Indiranagar", zip: "560038", status: "Active", regDate: "2023-09-10", lastLogin: "2023-10-23 09:30", orders: 18, spent: "₹1,10,000", active: true
            },
            {
                id: "CUST-012", firstName: "Kavita", lastName: "Desai", email: "kavita.d@example.com", phone: "+91 7766554433", city: "Pune", state: "MH", addressType: "Home", dob: "1991-12-05", street: "963 Aundh", zip: "411007", status: "Deactivated", regDate: "2023-10-15", lastLogin: "2023-10-24 11:45", orders: 22, spent: "₹1,50,050", active: false
            },
            {
                id: "CUST-013", firstName: "Vivek", lastName: "Iyer", email: "vivek.i@example.com", phone: "+91 6655443322", city: "Chennai", state: "TN", addressType: "Other", dob: "1983-07-18", street: "159 T Nagar", zip: "600017", status: "Active", regDate: "2023-11-20", lastLogin: "2023-10-25 13:20", orders: 40, spent: "₹3,00,075", active: true
            },
            {
                id: "CUST-014", firstName: "Meena", lastName: "Kapoor", email: "meena.k@example.com", phone: "+91 5544332211", city: "Kolkata", state: "WB", addressType: "Work", dob: "1979-10-30", street: "753 Salt Lake", zip: "700091", status: "Active", regDate: "2023-12-01", lastLogin: "2023-10-26 15:10", orders: 28, spent: "₹2,00,000", active: true
            },
            {
                id: "CUST-015", firstName: "Rajesh", lastName: "Malhotra", email: "rajesh.m@example.com", phone: "+91 4433221100", city: "Mumbai", state: "MH", addressType: "Home", dob: "1994-03-12", street: "246 Bandra West", zip: "400050", status: "Active", regDate: "2024-01-05", lastLogin: "2023-10-27 16:50", orders: 35, spent: "₹2,60,025", active: true
            },
            {
                id: "CUST-016", firstName: "Sunita", lastName: "Chopra", email: "sunita.c@example.com", phone: "+91 3322110099", city: "Hyderabad", state: "TS", addressType: "Other", dob: "1986-06-25", street: "864 Madhapur", zip: "500081", status: "Deactivated", regDate: "2024-02-10", lastLogin: "2023-10-28 18:30", orders: 14, spent: "₹90,050", active: false
            },
            {
                id: "CUST-017", firstName: "Aditya", lastName: "Bose", email: "aditya.b@example.com", phone: "+91 2211009988", city: "Delhi", state: "DL", addressType: "Work", dob: "1990-09-07", street: "975 Saket", zip: "110017", status: "Active", regDate: "2024-03-15", lastLogin: "2023-10-29 20:15", orders: 50, spent: "₹3,80,000", active: true
            },
            {
                id: "CUST-018", firstName: "Lakshmi", lastName: "Menon", email: "lakshmi.m@example.com", phone: "+91 1100998877", city: "Chennai", state: "TN", addressType: "Home", dob: "1984-04-19", street: "135 Adyar", zip: "600020", status: "Active", regDate: "2024-04-20", lastLogin: "2023-10-30 22:00", orders: 26, spent: "₹1,90,075", active: true
            },
            {
                id: "CUST-019", firstName: "Nikhil", lastName: "Jain", email: "nikhil.j@example.com", phone: "+91 9988776655", city: "Pune", state: "MH", addressType: "Other", dob: "1992-11-02", street: "246 Viman Nagar", zip: "411014", status: "Active", regDate: "2024-05-25", lastLogin: "2023-10-31 23:45", orders: 37, spent: "₹2,70,025", active: true
            },
            {
                id: "CUST-020", firstName: "Ritu", lastName: "Saxena", email: "ritu.s@example.com", phone: "+91 8877665544", city: "Bengaluru", state: "KA", addressType: "Work", dob: "1977-08-14", street: "357 Whitefield", zip: "560066", status: "Deactivated", regDate: "2024-06-30", lastLogin: "2023-11-01 01:30", orders: 16, spent: "₹1,00,000", active: false
            }
        ];

        // Initialize DataTable
        $(document).ready(function() {
            const table = $('#customerTable').DataTable({
                responsive: true,
                pageLength: 10,
                lengthMenu: [5, 10, 25, 50],
                order: [[0, "asc"]],
                dom: '<"top-controls mb-4"lf>rt<"bottom-controls mt-4"ip>',
                scrollX: true,
                paging: true,
                searching: false,
                info: true,
                drawCallback: function () {
                    this.api().columns.adjust();
                },
                createdRow: function (row, data, dataIndex) {
                    $('td:eq(0)', row).html(dataIndex + 1);
                },
                columns: [
                    { data: null, render: () => '', className: 'text-center' },
                    { data: 'id', className: 'text-left' },
                    { data: null, render: data => `${data.firstName} ${data.lastName}`, className: 'text-left' },
                    { data: 'email', className: 'text-left' },
                    { data: 'phone', className: 'text-left' },
                    { data: 'city', className: 'text-left' },
                    { data: 'state', className: 'text-left' },
                    { data: 'addressType', className: 'text-left' },
                    {
                        data: null,
                        render: data => `
                            <div class="action-column">
                                <button class="action-btn bg-blue-600 text-white action-btn-view" data-id="${data.id}" data-action="view"><i class="fas fa-eye"></i> View</button>
                                <button class="action-btn bg-yellow-500 text-white action-btn-edit" data-id="${data.id}" data-action="edit"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-btn ${data.active ? 'bg-red-500' : 'bg-green-500'} text-white action-btn-block" data-id="${data.id}" data-action="block"><i class="fas ${data.active ? 'fa-ban' : 'fa-check'}"></i> ${data.active ? 'Block' : 'Unblock'}</button>
                            </div>
                        `,
                        className: 'text-center'
                    }
                ]
            });
            populateTable(table);
            updateStats();

            // Add event listeners to action buttons
            $(document).on('click', '.action-btn-view', function() {
                const customerId = $(this).data('id');
                viewCustomer(customerId);
            });

            $(document).on('click', '.action-btn-edit', function() {
                const customerId = $(this).data('id');
                editCustomer(customerId);
            });

            $(document).on('click', '.action-btn-block', function() {
                const customerId = $(this).data('id');
                const customer = customers.find(c => c.id === customerId);
                if (customer.active) {
                    blockCustomer(customerId);
                } else {
                    unblockCustomer(customerId);
                }
            });
        });

        // Update stats cards
        function updateStats() {
            const total = customers.length;
            const active = customers.filter(c => c.active).length;
            const deactivated = customers.filter(c => !c.active).length;
            const newCustomers = customers.filter(c => new Date(c.regDate) > new Date('2024-01-01')).length;
            document.getElementById('totalCustomers').textContent = total;
            document.getElementById('activeCustomers').textContent = active;
            document.getElementById('newCustomers').textContent = newCustomers;
            document.getElementById('deactivatedCustomers').textContent = deactivated;
        }

        // Populate table
        function populateTable(table) {
            table.clear().rows.add(customers).draw();
        }

        // Filter table
        function filterTable() {
            const city = document.getElementById('cityFilter').value.toLowerCase();
            const state = document.getElementById('stateFilter').value.toLowerCase();
            const addressType = document.getElementById('addressTypeFilter').value.toLowerCase();

            const table = $('#customerTable').DataTable();
            const filteredCustomers = customers.filter(customer => {
                const matchesFilters = (!city || customer.city.toLowerCase() === city) &&
                                      (!state || customer.state.toLowerCase() === state) &&
                                      (!addressType || customer.addressType.toLowerCase() === addressType);
                return matchesFilters;
            });
            table.clear().rows.add(filteredCustomers).draw();
        }

        // Event listeners for filters
        document.getElementById('cityFilter').addEventListener('change', filterTable);
        document.getElementById('stateFilter').addEventListener('change', filterTable);
        document.getElementById('addressTypeFilter').addEventListener('change', filterTable);

        // View Customer
        function viewCustomer(customerId) {
            const customer = customers.find(c => c.id === customerId);
            if (customer) {
                document.getElementById('profile-id').textContent = customer.id;
                document.getElementById('profile-firstname').textContent = customer.firstName;
                document.getElementById('profile-lastname').textContent = customer.lastName;
                document.getElementById('profile-email').textContent = customer.email;
                document.getElementById('profile-phone').textContent = customer.phone;
                document.getElementById('profile-dob').textContent = customer.dob;
                document.getElementById('profile-addrtype').textContent = customer.addressType;
                document.getElementById('profile-street').textContent = customer.street;
                document.getElementById('profile-city').textContent = customer.city;
                document.getElementById('profile-state').textContent = customer.state;
                document.getElementById('profile-zip').textContent = customer.zip;
                document.getElementById('profile-status').textContent = customer.status;
                document.getElementById('profile-regdate').textContent = customer.regDate;
                document.getElementById('profile-lastlogin').textContent = customer.lastLogin;
                document.getElementById('profile-orders').textContent = customer.orders;
                document.getElementById('profile-spent').textContent = customer.spent;
                document.getElementById('customerProfile').style.display = 'flex';
            }
        }

        // Close Profile
        document.getElementById('closeProfile').addEventListener('click', () => {
            document.getElementById('customerProfile').style.display = 'none';
        });

        // Edit Customer
        function editCustomer(customerId) {
            const customer = customers.find(c => c.id === customerId);
            if (customer) {
                document.getElementById('edit-id').value = customer.id;
                document.getElementById('edit-firstname').value = customer.firstName;
                document.getElementById('edit-lastname').value = customer.lastName;
                document.getElementById('edit-email').value = customer.email;
                document.getElementById('edit-phone').value = customer.phone;
                document.getElementById('edit-dob').value = customer.dob;
                document.getElementById('edit-addrtype').value = customer.addressType;
                document.getElementById('edit-street').value = customer.street;
                document.getElementById('edit-city').value = customer.city;
                document.getElementById('edit-state').value = customer.state;
                document.getElementById('edit-zip').value = customer.zip;
                document.getElementById('editCustomerModal').style.display = 'flex';
            }
        }

        document.getElementById('editProfileBtn').addEventListener('click', () => {
            const id = document.getElementById('profile-id').textContent;
            editCustomer(id);
        });

        // Save Edited Customer
        document.getElementById('editCustomerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('edit-id').value;
            const customer = customers.find(c => c.id === id);
            if (customer) {
                customer.firstName = document.getElementById('edit-firstname').value;
                customer.lastName = document.getElementById('edit-lastname').value;
                customer.email = document.getElementById('edit-email').value;
                customer.phone = document.getElementById('edit-phone').value;
                customer.dob = document.getElementById('edit-dob').value;
                customer.addressType = document.getElementById('edit-addrtype').value;
                customer.street = document.getElementById('edit-street').value;
                customer.city = document.getElementById('edit-city').value;
                customer.state = document.getElementById('edit-state').value;
                customer.zip = document.getElementById('edit-zip').value;
                document.getElementById('editCustomerModal').style.display = 'none';
                const table = $('#customerTable').DataTable();
                populateTable(table);
                updateStats();
                showSuccessPopup('Customer updated successfully');
            }
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            document.getElementById('editCustomerModal').style.display = 'none';
        });

        document.getElementById('closeEditModal').addEventListener('click', () => {
            document.getElementById('editCustomerModal').style.display = 'none';
        });

        // Block Customer
        function blockCustomer(customerId) {
            const customer = customers.find(c => c.id === customerId);
            if (customer && confirm('Are you sure you want to block this customer?')) {
                customer.active = false;
                customer.status = 'Deactivated';
                const table = $('#customerTable').DataTable();
                populateTable(table);
                updateStats();
                showSuccessPopup('Customer blocked successfully');
            }
        }

        // Unblock Customer
        function unblockCustomer(customerId) {
            const customer = customers.find(c => c.id === customerId);
            if (customer && confirm('Are you sure you want to unblock this customer?')) {
                customer.active = true;
                customer.status = 'Active';
                const table = $('#customerTable').DataTable();
                populateTable(table);
                updateStats();
                showSuccessPopup('Customer unblocked successfully');
            }
        }

        document.getElementById('deactivateProfileBtn').addEventListener('click', () => {
            const id = document.getElementById('profile-id').textContent;
            const customer = customers.find(c => c.id === id);
            if (customer.active) {
                blockCustomer(id);
                document.getElementById('customerProfile').style.display = 'none';
            } else {
                unblockCustomer(id);
                document.getElementById('customerProfile').style.display = 'none';
            }
        });

        // Show Success Popup
        function showSuccessPopup(message) {
            document.getElementById('successMessage').textContent = message;
            document.getElementById('successPopup').style.display = 'flex';
        }

        // Close Success Popup
        document.getElementById('closeSuccessPopup').addEventListener('click', () => {
            document.getElementById('successPopup').style.display = 'none';
        });

        // Export Excel
        document.getElementById('exportBtn').addEventListener('click', () => {
            let csv = 'Sr. No.,Customer ID,First Name,Last Name,Email,Phone,City,State,Address Type,DOB,Street,ZIP,Status,Registration Date,Last Login,Total Orders,Total Spent\n';
            customers.forEach((customer, index) => {
                csv += `${index + 1},${customer.id},${customer.firstName},${customer.lastName},${customer.email},${customer.phone},${customer.city},${customer.state},${customer.addressType},${customer.dob},${customer.street},${customer.zip},${customer.status},${customer.regDate},${customer.lastLogin},${customer.orders},${customer.spent}\n`;
            });
            const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'customers.xlsx';
            a.click();
        });

        // Sidebar toggle
        document.getElementById('toggle-sidebar-mobile').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('-translate-x-full');
        });

        document.getElementById('close-sidebar').addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('-translate-x-full');
        });

        document.getElementById('toggle-sidebar-logo').addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('w-64');
            sidebar.classList.toggle('w-20');
            document.getElementById('sidebar-title').classList.toggle('hidden');
            document.querySelectorAll('.nav-text').forEach(el => el.classList.toggle('hidden'));
            document.getElementById('sidebar-arrow').classList.toggle('fa-chevron-right');
            document.getElementById('sidebar-arrow').classList.toggle('fa-chevron-left');
            document.getElementById('sidebar-logo').classList.toggle('mr-2');
            document.getElementById('sidebar-logo').classList.toggle('mx-auto');
            document.querySelectorAll('.nav-icon').forEach(el => {
                el.classList.toggle('mr-3');
                el.classList.toggle('mx-auto');
            });
        });
  
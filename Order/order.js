   
        let table;
        let currentOrderId = null;
        let orders = [];

        $(document).ready(function() {
            // Dummy data for testing with only COD and Online payment modes
            orders = [
                { id: 'ORD001', customerName: 'John Doe', products: 'Paracetamol (2), Ibuprofen (1)', orderDate: '2025-09-17 10:00', deliveryDate: '2025-09-20', paymentMode: 'COD', status: 'Pending', totalAmount: '₹500' },
                { id: 'ORD002', customerName: 'Jane Smith', products: 'Amoxicillin (1)', orderDate: '2025-09-16 14:30', deliveryDate: '2025-09-19', paymentMode: 'Online', status: 'Delivered', totalAmount: '₹300' },
                { id: 'ORD003', customerName: 'Alice Johnson', products: 'Aspirin (3)', orderDate: '2025-09-15 09:15', deliveryDate: '2025-09-18', paymentMode: 'COD', status: 'Shipped', totalAmount: '₹450' },
                { id: 'ORD004', customerName: 'Bob Brown', products: 'Cetirizine (2)', orderDate: '2025-09-14 11:45', deliveryDate: '2025-09-17', paymentMode: 'Online', status: 'Processing', totalAmount: '₹200' },
                { id: 'ORD005', customerName: 'Carol White', products: 'Metformin (1)', orderDate: '2025-09-13 16:20', deliveryDate: '2025-09-16', paymentMode: 'COD', status: 'Confirmed', totalAmount: '₹350' },
                { id: 'ORD006', customerName: 'David Lee', products: 'Ibuprofen (2), Vitamin C (1)', orderDate: '2025-09-12 13:10', deliveryDate: '2025-09-15', paymentMode: 'Online', status: 'Delivered', totalAmount: '₹600' },
                { id: 'ORD007', customerName: 'Emma Davis', products: 'Paracetamol (1)', orderDate: '2025-09-11 08:50', deliveryDate: '2025-09-14', paymentMode: 'COD', status: 'Cancelled', totalAmount: '₹150' },
                { id: 'ORD008', customerName: 'Frank Wilson', products: 'Amoxicillin (2)', orderDate: '2025-09-10 17:30', deliveryDate: '2025-09-13', paymentMode: 'COD', status: 'Pending', totalAmount: '₹400' },
                { id: 'ORD009', customerName: 'Grace Taylor', products: 'Aspirin (1), Cetirizine (1)', orderDate: '202don’t 5-09-09 12:25', deliveryDate: '2025-09-12', paymentMode: 'Online', status: 'Shipped', totalAmount: '₹320' },
                { id: 'ORD010', customerName: 'Henry Moore', products: 'Metformin (2)', orderDate: '2025-09-08 15:40', deliveryDate: '2025-09-11', paymentMode: 'COD', status: 'Processing', totalAmount: '₹500' },
                { id: 'ORD011', customerName: 'Isabella Clark', products: 'Vitamin D (3)', orderDate: '2025-09-07 10:10', deliveryDate: '2025-09-10', paymentMode: 'Online', status: 'Delivered', totalAmount: '₹450' },
                { id: 'ORD012', customerName: 'James Harris', products: 'Paracetamol (2)', orderDate: '2025-09-06 14:55', deliveryDate: '2025-09-09', paymentMode: 'COD', status: 'Confirmed', totalAmount: '₹300' },
                { id: 'ORD013', customerName: 'Kelly Martin', products: 'Ibuprofen (1)', orderDate: '2025-09-05 09:30', deliveryDate: '2025-09-08', paymentMode: 'Online', status: 'Pending', totalAmount: '₹250' },
                { id: 'ORD014', customerName: 'Liam Walker', products: 'Amoxicillin (3)', orderDate: '2025-09-04 16:45', deliveryDate: '2025-09-07', paymentMode: 'COD', status: 'Shipped', totalAmount: '₹600' },
                { id: 'ORD015', customerName: 'Mia Anderson', products: 'Cetirizine (2)', orderDate: '2025-09-03 11:20', deliveryDate: '2025-09-06', paymentMode: 'Online', status: 'Delivered', totalAmount: '₹400' },
                { id: 'ORD016', customerName: 'Noah Thomas', products: 'Aspirin (1)', orderDate: '2025-09-02 13:15', deliveryDate: '2025-09-05', paymentMode: 'COD', status: 'Processing', totalAmount: '₹200' },
                { id: 'ORD017', customerName: 'Olivia Jackson', products: 'Metformin (1), Vitamin C (2)', orderDate: '2025-09-01 08:40', deliveryDate: '2025-09-04', paymentMode: 'Online', status: 'Confirmed', totalAmount: '₹550' },
                { id: 'ORD018', customerName: 'Peter White', products: 'Paracetamol (3)', orderDate: '2025-08-31 17:25', deliveryDate: '2025-09-03', paymentMode: 'COD', status: 'Delivered', totalAmount: '₹450' },
                { id: 'ORD019', customerName: 'Quinn Green', products: 'Ibuprofen (2)', orderDate: '2025-08-30 12:50', deliveryDate: '2025-09-02', paymentMode: 'Online', status: 'Cancelled', totalAmount: '₹350' },
                { id: 'ORD020', customerName: 'Rachel Adams', products: 'Amoxicillin (1), Vitamin D (1)', orderDate: '2025-08-29 15:10', deliveryDate: '2025-09-01', paymentMode: 'COD', status: 'Returned', totalAmount: '₹500' }
            ];

            // Update stats cards
            function updateStats(filteredOrders = orders) {
                $('#totalOrders').text(filteredOrders.length);
                $('#pendingOrders').text(filteredOrders.filter(o => o.status === 'Pending').length);
                $('#deliveredOrders').text(filteredOrders.filter(o => o.status === 'Delivered').length);
                const today = new Date().toISOString().split('T')[0];
                $('#revenueToday').text('₹' + filteredOrders.filter(o => o.orderDate.startsWith(today)).reduce((sum, o) => sum + parseInt(o.totalAmount.replace('₹', '')), 0));
            }

            updateStats();

            // Populate table
            function populateTable(filteredOrders = orders) {
                $('#orderTableBody').empty();
                filteredOrders.forEach((order, index) => {
                    const statusClass = `status-${order.status.toLowerCase()}`;
                    $('#orderTableBody').append(`
                        <tr>
                            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${index + 1}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${order.id}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${order.customerName}</td>
                            <td class="px-4 py-4 text-sm text-gray-900">${order.products}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${order.orderDate}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${order.deliveryDate}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${order.paymentMode}</td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <span class="status-badge ${statusClass}">${order.status}</span>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.totalAmount}</td>
                            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-weight-500">
                                <button class="view-btn action-btn" data-id="${order.id}">View</button>
                            </td>
                        </tr>
                    `);
                });
                if (table) table.destroy();
                table = $('#orderTable').DataTable({
                    paging: true,
                    searching: false,
                    ordering: true,
                    info: true,
                    responsive: true,
                    lengthMenu: [[5, 10, 50, 100], [5, 10, 50, 100]],
                    pageLength: 10,
                    columnDefs: [
                        { orderable: false, targets: -1 }
                    ],
                    language: {
                        search: "Search orders:"
                    }
                });
            }

            populateTable();

            // Search functionality
            $('#searchInput').on('keyup', function() {
                const value = this.value.toLowerCase();
                const filtered = orders.filter(order => 
                    order.id.toLowerCase().includes(value) ||
                    order.customerName.toLowerCase().includes(value)
                );
                populateTable(filtered);
                updateStats(filtered);
            });

            // Filter functionality
            function applyFilters() {
                let filtered = orders;
                const status = $('#statusFilter').val();
                const payment = $('#paymentFilter').val();
                const date = $('#dateFilter').val();

                if (status) {
                    filtered = filtered.filter(o => o.status === status);
                }
                if (payment) {
                    filtered = filtered.filter(o => o.paymentMode === payment);
                }
                if (date) {
                    filtered = filtered.filter(o => o.orderDate.split(' ')[0] === date);
                }

                populateTable(filtered);
                updateStats(filtered);
            }

            $('#statusFilter').on('change', applyFilters);
            $('#paymentFilter').on('change', applyFilters);
            $('#dateFilter').on('change', applyFilters);

            // Sidebar toggle
            // $('#toggle-sidebar-logo, #toggle-sidebar-mobile').click(function() {
            //     $('#sidebar').toggleClass('-translate-x-full');
            //     $('#sidebar-arrow').toggleClass('rotate-180');
            // });

            // $('#close-sidebar').click(function() {
            //     $('#sidebar').addClass('-translate-x-full');
            //     $('#sidebar-arrow').removeClass('rotate-180');
            // });

            // Modal handling
            $('#closeOrderDetails, #closeSuccessPopup, #closeInvoice').click(function() {
                $(this).closest('.modal').hide();
            });

            $(window).click(function(event) {
                if (event.target.classList.contains('modal')) {
                    $(event.target).hide();
                }
            });

            // View order details
            $(document).on('click', '.view-btn', function() {
                currentOrderId = $(this).data('id');
                const order = orders.find(o => o.id === currentOrderId);
                if (order) {
                    $('#modal-order-id').text(order.id);
                    $('#order-customer-name').text(order.customerName);
                    $('#order-customer-phone').text('+91 ' + (9876543210 - parseInt(order.id.replace('ORD', ''))).toString());
                    $('#order-customer-address').text(`123, Main Street, ${order.customerName.split(' ')[1] || 'City'}, MH 400001`);
                    const hasPrescription = Math.random() > 0.5;
                    $('#order-prescription').text(hasPrescription ? 'prescription_' + order.id + '.pdf' : 'N/A');
                    $('#approvePrescription').toggle(hasPrescription);

                    // Products
                    const productParts = order.products.split(', ');
                    let productsHtml = '';
                    let subtotal = 0;
                    productParts.forEach(part => {
                        const [name, qtyStr] = part.split(' (');
                        const qty = qtyStr ? qtyStr.replace(')', '') : '1';
                        const price = Math.floor(Math.random() * 200) + 50;
                        const totalItem = price * parseInt(qty);
                        subtotal += totalItem;
                        productsHtml += `
                            <tr>
                                <td>${name}</td>
                                <td class="text-center">${qty}</td>
                                <td class="text-right">₹${price}</td>
                                <td class="text-center">10%</td>
                                <td class="text-center">5%</td>
                                <td class="text-right">₹${totalItem}</td>
                            </tr>
                        `;
                    });
                    $('#order-products').html(productsHtml);

                    const tax = Math.round(subtotal * 0.05);
                    const shipping = 50;
                    const grandTotal = parseInt(order.totalAmount.replace('₹', ''));
                    $('#order-subtotal').text('₹' + subtotal);
                    $('#order-tax').text('₹' + tax);
                    $('#order-shipping').text('₹' + shipping);
                    $('#order-grand-total').text(order.totalAmount);

                    $('#order-payment-status').text(order.status === 'Delivered' ? 'Paid' : order.status === 'Pending' ? 'Pending' : 'Failed');
                    $('#order-transaction-id').text('TXN' + order.id.replace('ORD', ''));
                    $('#order-return-status').text(order.status === 'Returned' ? 'Processed' : 'N/A');
                    $('#order-return-reason').text(order.status === 'Returned' ? 'Defective Product' : 'N/A');
                    $('#order-refund-status').text(order.status === 'Returned' ? 'Initiated - ₹' + (grandTotal * 0.9) : 'N/A');

                    // Set current status in select
                    $('#updateStatus').val(order.status);

                    $('#orderDetailsModal').show();
                }
            });

            // Update status
            $('#saveStatus').click(function() {
                const newStatus = $('#updateStatus').val();
                const order = orders.find(o => o.id === currentOrderId);
                if (order) {
                    order.status = newStatus;
                    const row = $(`td:contains(${currentOrderId})`).closest('tr');
                    const statusCell = row.find('td').eq(7);
                    statusCell.html(`<span class="status-badge status-${newStatus.toLowerCase()}">${newStatus}</span>`);
                    table.draw();
                    updateStats();
                }
                $('#successMessage').text(`Order status updated to ${newStatus} successfully!`);
                $('#successPopup').show();
                setTimeout(() => $('#successPopup').hide(), 2000);
                $('#orderDetailsModal').hide();
            });

            // Approve prescription
            $('#approvePrescription').click(function() {
                $('#successMessage').text('Prescription approved successfully');
                $('#successPopup').show();
                setTimeout(() => $('#successPopup').hide(), 2000);
                $(this).hide();
            });

            // Print invoice
            $('#printInvoice').click(function() {
                const order = orders.find(o => o.id === currentOrderId);
                if (order) {
                    $('#inv-order-id').text(order.id);
                    $('#inv-order-date').text(order.orderDate);
                    $('#inv-customer-name').text(order.customerName);
                    $('#inv-customer-phone').text('+91 ' + (9876543210 - parseInt(order.id.replace('ORD', ''))).toString());
                    $('#inv-customer-address').text(`123, Main Street, ${order.customerName.split(' ')[1] || 'City'}, MH 400001`);
                    $('#inv-payment-status').text(order.status === 'Delivered' ? 'Paid' : 'Pending');
                    $('#inv-transaction-id').text('TXN' + order.id.replace('ORD', ''));
                    $('#inv-payment-mode').text(order.paymentMode);

                    const productParts = order.products.split(', ');
                    let invProductsHtml = '';
                    productParts.forEach(part => {
                        const [name, qtyStr] = part.split(' (');
                        const qty = qtyStr ? qtyStr.replace(')', '') : '1';
                        const price = Math.floor(Math.random() * 200) + 50;
                        invProductsHtml += `
                            <tr>
                                <td style="border: 1px solid #d1d5db; padding: 8px;">${name}</td>
                                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: center;">${qty}</td>
                                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">₹${price}</td>
                                <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">₹${price * parseInt(qty)}</td>
                            </tr>
                        `;
                    });
                    $('#inv-products').html(invProductsHtml);

                    const subtotal = parseInt(order.totalAmount.replace('₹', '')) * 0.85;
                    const tax = parseInt(order.totalAmount.replace('₹', '')) * 0.05;
                    const shipping = 50;
                    $('#inv-subtotal').text('₹' + subtotal);
                    $('#inv-tax').text('₹' + tax);
                    $('#inv-shipping').text('₹' + shipping);
                    $('#inv-grand-total').text(order.totalAmount);

                    $('#invoiceModal').show();
                }
            });

            // Cancel/Return order
            $('#cancelOrder').click(function() {
                const order = orders.find(o => o.id === currentOrderId);
                if (order) {
                    order.status = 'Cancelled';
                    const row = $(`td:contains(${currentOrderId})`).closest('tr');
                    const statusCell = row.find('td').eq(7);
                    statusCell.html('<span class="status-badge status-cancelled">Cancelled</span>');
                    table.draw();
                    updateStats();
                }
                $('#successMessage').text('Order cancelled/return initiated successfully');
                $('#successPopup').show();
                setTimeout(() => $('#successPopup').hide(), 2000);
                $('#orderDetailsModal').hide();
            });

            // Export CSV
            $('#exportBtn').click(function() {
                let csv = 'Sr No,Order ID,Customer Name,Products,Order Date,Delivery Date,Payment Mode,Status,Total Amount\n';
                orders.forEach((order, index) => {
                    csv += `"${index + 1}","${order.id}","${order.customerName}","${order.products}","${order.orderDate}","${order.deliveryDate}","${order.paymentMode}","${order.status}","${order.totalAmount}"\n`;
                });
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'orders_' + new Date().toISOString().split('T')[0] + '.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            });
        });
   
        // Sidebar functionality
  $("#toggle-sidebar-mobile, #close-sidebar").on("click", function () {
    $("#sidebar").toggleClass("-translate-x-full");
  });

  $("#toggle-sidebar-logo").on("click", function () {
    $("#sidebar").toggleClass("w-64 w-20");
    $("#sidebar-title, .nav-text").toggleClass("hidden");
    $("#sidebar-arrow").toggleClass("fa-chevron-right fa-chevron-left");
    $("#sidebar-logo").toggleClass("mr-2 mx-auto");
    $(".nav-icon").toggleClass("mr-3 mx-auto");
  });

 
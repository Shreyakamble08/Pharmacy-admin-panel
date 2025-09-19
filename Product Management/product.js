
        // Sample product data aligned with categories
        let sampleProducts = [
            {
                id: 1,
                sku: "PARA650",
                name: "Paracetamol 650mg",
                category: "Medicines & Healthcare",
                type: "Pain Relief & Fever",
                brand: "Cipla",
                prescription: "No",
                quantity: 150,
                unit: "Tablet Strip",
                mrp: 35.00,
                price: 30.00,
                batch: "BATCH001",
                expiry: "2026-12-15",
                description: "Effective fever and pain relief medicine",
                storage: "Store in a cool and dry place",
                added: "2024-01-15",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Para1",
                    "https://via.placeholder.com/150?text=Para2",
                    "https://via.placeholder.com/150?text=Para3",
                    "https://via.placeholder.com/150?text=Para4"
                ]
            },
            {
                id: 2,
                sku: "AMOX500",
                name: "Amoxicillin 500mg",
                category: "Medicines & Healthcare",
                type: "Prescription Medicines (Upload Prescription)",
                brand: "Sun Pharma",
                prescription: "Yes",
                quantity: 8,
                unit: "Tablet Strip",
                mrp: 120.00,
                price: 105.00,
                batch: "BATCH002",
                expiry: "2026-06-30",
                description: "Antibiotic for bacterial infections",
                storage: "Store below 30°C",
                added: "2024-03-10",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Amox1",
                    "https://via.placeholder.com/150?text=Amox2",
                    "https://via.placeholder.com/150?text=Amox3",
                    "https://via.placeholder.com/150?text=Amox4"
                ]
            },
            {
                id: 3,
                sku: "VITB12",
                name: "Vitamin B12 Syrup",
                category: "Wellness & Personal Care",
                type: "Vitamins & Supplements",
                brand: "Dabur",
                prescription: "No",
                quantity: 45,
                unit: "Bottle",
                mrp: 180.00,
                price: 160.00,
                batch: "BATCH003",
                expiry: "2027-03-15",
                description: "Complete Vitamin B complex syrup",
                storage: "Store in a cool place",
                added: "2024-05-22",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=VitB1",
                    "https://via.placeholder.com/150?text=VitB2",
                    "https://via.placeholder.com/150?text=VitB3",
                    "https://via.placeholder.com/150?text=VitB4"
                ]
            },
            {
                id: 4,
                sku: "INSULN",
                name: "Insulin Syringe",
                category: "Medical Devices & Equipment",
                type: "Monitoring Devices (BP Monitors, Glucometers, Pulse Oximeters)",
                brand: "BD",
                prescription: "Yes",
                quantity: 0,
                unit: "Piece",
                mrp: 25.00,
                price: 22.00,
                batch: "BATCH004",
                expiry: "2028-01-10",
                description: "Disposable insulin syringe",
                storage: "Room temperature",
                added: "2024-02-18",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Ins1",
                    "https://via.placeholder.com/150?text=Ins2",
                    "https://via.placeholder.com/150?text=Ins3",
                    "https://via.placeholder.com/150?text=Ins4"
                ]
            },
            {
                id: 5,
                sku: "DERMCRE",
                name: "Antifungal Cream",
                category: "Medicines & Healthcare",
                type: "First Aid & Emergency (Bandages, Antiseptics, Ointments, Thermometers)",
                brand: "Himalaya",
                prescription: "No",
                quantity: 28,
                unit: "Tube",
                mrp: 85.00,
                price: 75.00,
                batch: "BATCH005",
                expiry: "2026-09-05",
                description: "Effective antifungal cream",
                storage: "Store below 25°C",
                added: "2024-07-12",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Cream1",
                    "https://via.placeholder.com/150?text=Cream2",
                    "https://via.placeholder.com/150?text=Cream3",
                    "https://via.placeholder.com/150?text=Cream4"
                ]
            },
            {
                id: 6,
                sku: "PREGVIT",
                name: "Prenatal Vitamins",
                category: "Mother Care & Maternity",
                type: "Pregnancy Nutrition (Prenatal Vitamins, Supplements)",
                brand: "Nestlé",
                prescription: "No",
                quantity: 60,
                unit: "Bottle",
                mrp: 250.00,
                price: 220.00,
                batch: "BATCH006",
                expiry: "2027-05-20",
                description: "Supports maternal and fetal health",
                storage: "Store in a dry place",
                added: "2024-08-01",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Vit1",
                    "https://via.placeholder.com/150?text=Vit2",
                    "https://via.placeholder.com/150?text=Vit3",
                    "https://via.placeholder.com/150?text=Vit4"
                ]
            },
            {
                id: 7,
                sku: "DIAPER",
                name: "Baby Diapers",
                category: "Baby Care",
                type: "Diapers & Wipes",
                brand: "Pampers",
                prescription: "No",
                quantity: 100,
                unit: "Pack",
                mrp: 600.00,
                price: 550.00,
                batch: "BATCH007",
                expiry: "2028-02-15",
                description: "Comfortable and absorbent diapers",
                storage: "Store in a dry place",
                added: "2024-09-01",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Diaper1",
                    "https://via.placeholder.com/150?text=Diaper2",
                    "https://via.placeholder.com/150?text=Diaper3",
                    "https://via.placeholder.com/150?text=Diaper4"
                ]
            },
            {
                id: 8,
                sku: "BPMON",
                name: "Blood Pressure Monitor",
                category: "Medical Devices & Equipment",
                type: "Monitoring Devices (BP Monitors, Glucometers, Pulse Oximeters)",
                brand: "Omron",
                prescription: "No",
                quantity: 5,
                unit: "Piece",
                mrp: 2000.00,
                price: 1800.00,
                batch: "BATCH008",
                expiry: "2030-01-01",
                description: "Accurate BP measurement device",
                storage: "Room temperature",
                added: "2024-06-15",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=BP1",
                    "https://via.placeholder.com/150?text=BP2",
                    "https://via.placeholder.com/150?text=BP3",
                    "https://via.placeholder.com/150?text=BP4"
                ]
            },
            {
                id: 9,
                sku: "ASHWAG",
                name: "Ashwagandha Capsules",
                category: "Speciality Care",
                type: "Ayurveda & Herbal Products",
                brand: "Patanjali",
                prescription: "No",
                quantity: 80,
                unit: "Bottle",
                mrp: 150.00,
                price: 130.00,
                batch: "BATCH009",
                expiry: "2027-04-10",
                description: "Herbal supplement for stress relief",
                storage: "Store in a cool place",
                added: "2024-04-20",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Ash1",
                    "https://via.placeholder.com/150?text=Ash2",
                    "https://via.placeholder.com/150?text=Ash3",
                    "https://via.placeholder.com/150?text=Ash4"
                ]
            },
            {
                id: 10,
                sku: "CREAMST",
                name: "Stretch Mark Cream",
                category: "Mother Care & Maternity",
                type: "Skincare for Moms (Stretch Mark Cream, Sunscreen, Moisturizers)",
                brand: "Mamaearth",
                prescription: "No",
                quantity: 20,
                unit: "Tube",
                mrp: 400.00,
                price: 350.00,
                batch: "BATCH010",
                expiry: "2026-11-20",
                description: "Reduces stretch marks during pregnancy",
                storage: "Store below 25°C",
                added: "2024-07-25",
                updated: "2025-09-10",
                images: [
                    "https://via.placeholder.com/150?text=Stretch1",
                    "https://via.placeholder.com/150?text=Stretch2",
                    "https://via.placeholder.com/150?text=Stretch3",
                    "https://via.placeholder.com/150?text=Stretch4"
                ]
            }
        ];

        // Categories with subcategories
        let categories = [
            { name: "Medicines & Healthcare", subcategories: ["Prescription Medicines (Upload Prescription)", "Over-the-Counter (OTC) Medicines", "Chronic Care (Diabetes, Hypertension, Cardiac, Asthma, Thyroid)", "First Aid & Emergency (Bandages, Antiseptics, Ointments, Thermometers)", "Pain Relief & Fever", "Allergy & Cold Care", "Digestive Health (Antacids, Probiotics, Laxatives)"] },
            { name: "Mother Care & Maternity", subcategories: ["Maternity Wear (Dresses, Nursing Wear, Innerwear)", "Pregnancy Nutrition (Prenatal Vitamins, Supplements)", "Skincare for Moms (Stretch Mark Cream, Sunscreen, Moisturizers)", "Trimester Kits (1st, 2nd, 3rd Trimester Essentials)", "Postpartum Recovery (Belly Belts, Nursing Pads, Sitz Baths)", "Breastfeeding Essentials (Pumps, Bottles, Nipple Creams)"] },
            { name: "Baby Care", subcategories: ["Diapers & Wipes", "Baby Skin & Hair Care", "Feeding & Nursing", "Baby Health & Safety", "Toys & Learning", "Baby Clothing & Accessories"] },
            { name: "Wellness & Personal Care", subcategories: ["Vitamins & Supplements", "Skin & Hair Care", "Oral Care", "Menstrual & Intimate Care", "Fitness & Weight Management"] },
            { name: "Medical Devices & Equipment", subcategories: ["Monitoring Devices (BP Monitors, Glucometers, Pulse Oximeters)", "Mobility Aids (Walkers, Wheelchairs, Sticks)", "Respiratory Care (Nebulizers, Oxygen Supplies)"] },
            { name: "Speciality Care", subcategories: ["Women’s Health", "Men’s Health", "Senior Care", "Immunity Boosters", "Ayurveda & Herbal Products"] }
        ];

        // User profile
        const user = {
            name: "Shreya Kamble",
            role: "Admin",
        };

        // DOM elements
        const productTableBody = document.getElementById('productTableBody');
        const totalProducts = document.getElementById('totalProducts');
        const lowStockItems = document.getElementById('lowStockItems');
        const inStockProducts = document.getElementById('inStockProducts');
        const expiringSoon = document.getElementById('expiringSoon');
        const productDetailModal = document.getElementById('productDetailModal');
        const editProductModal = document.getElementById('editProductModal');
        const addCategoryModal = document.getElementById('addCategoryModal');
        const successPopup = document.getElementById('successPopup');
        const successMessage = document.getElementById('successMessage');
        const editModalTitle = document.getElementById('editModalTitle');
        const editProductForm = document.getElementById('editProductForm');
        let currentProductId = null;
        let dataTableInstance = null;
        const today = new Date('2025-09-15');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            displayUserProfile();
            populateCategorySelects();
            populateSubcategoryFilter();
            loadProducts();
            setupEventListeners();
            updateStats();
            initializeDataTable();
        });

        // Display user profile
        function displayUserProfile() {
            const userInitials = document.getElementById('user-initials');
            const userName = document.getElementById('user-name');
            const userRole = document.getElementById('user-role');

            const nameParts = user.name.trim().split(' ');
            const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` : nameParts[0][0];
            userInitials.textContent = initials.toUpperCase();
            userName.textContent = user.name;
            userRole.textContent = user.role;
        }

        // Determine stock status based on quantity
        function getStockStatus(quantity) {
            if (quantity === 0) return 'Out of Stock';
            if (quantity < 10) return 'Low Stock';
            return 'In Stock';
        }

        // Populate category selects
        function populateCategorySelects() {
            const categoryFilter = document.getElementById('categoryFilter');
            const editCategory = document.getElementById('edit-category');

            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            editCategory.innerHTML = '<option value="">Select Category</option>';

            categories.forEach(cat => {
                const filterOption = document.createElement('option');
                filterOption.value = cat.name;
                filterOption.textContent = cat.name;
                categoryFilter.appendChild(filterOption);

                const editOption = document.createElement('option');
                editOption.value = cat.name;
                editOption.textContent = cat.name;
                editCategory.appendChild(editOption);
            });
        }

        // Populate subcategory filter based on selected category
        function populateSubcategoryFilter() {
            const subcategoryFilter = document.getElementById('subcategoryFilter');
            const selectedCategory = document.getElementById('categoryFilter').value;
            subcategoryFilter.innerHTML = '<option value="">All Subcategories</option>';

            if (selectedCategory) {
                const cat = categories.find(c => c.name === selectedCategory);
                if (cat) {
                    cat.subcategories.forEach(sub => {
                        const option = document.createElement('option');
                        option.value = sub;
                        option.textContent = sub;
                        subcategoryFilter.appendChild(option);
                    });
                }
            } else {
                // Show all subcategories when no category is selected
                const allSubcategories = [...new Set(categories.flatMap(cat => cat.subcategories))];
                allSubcategories.sort().forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub;
                    option.textContent = sub;
                    subcategoryFilter.appendChild(option);
                });
            }
        }

        // Update type options based on selected category
        function updateTypeOptions() {
            const selectedCat = document.getElementById('edit-category').value;
            const typeSelect = document.getElementById('edit-type');
            typeSelect.innerHTML = '<option value="">Select Subcategory</option>';

            if (selectedCat) {
                const cat = categories.find(c => c.name === selectedCat);
                if (cat) {
                    cat.subcategories.forEach(sub => {
                        const option = document.createElement('option');
                        option.value = sub;
                        option.textContent = sub;
                        typeSelect.appendChild(option);
                    });
                }
            }
        }

        // Load products into the table
        function loadProducts(filteredProducts = sampleProducts) {
            productTableBody.innerHTML = '';

            filteredProducts.forEach(product => {
                const row = document.createElement('tr');
                const stockStatus = getStockStatus(product.quantity);
                const expiryDate = new Date(product.expiry);
                const diffTime = expiryDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const isExpiringSoon = diffTime > 0 && diffDays <= 30;

                row.innerHTML = `
                    <td class="text-center">${product.id}</td>
                    <td>${product.sku}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.brand}</td>
                    <td class="${stockStatus === 'Low Stock' ? 'low-stock' : stockStatus === 'Out of Stock' ? 'status-out-of-stock' : ''}">${product.quantity} ${product.unit}</td>
                    <td>₹${product.price.toFixed(2)}</td>
                    <td class="${isExpiringSoon ? 'expiring-soon' : ''}">${formatDate(product.expiry)}</td>
                    <td>${product.prescription}</td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="view-btn text-blue-500 hover:text-blue-700" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                            <button class="edit-btn text-yellow-500 hover:text-yellow-700" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                        </div>
                    </td>
                `;
                productTableBody.appendChild(row);
            });

            // Reinitialize DataTable after updating the table
            if (dataTableInstance) {
                dataTableInstance.destroy();
            }
            initializeDataTable();
        }

        // Format date to DD-MM-YYYY
        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'N/A';
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }

        // Update dashboard stats
        function updateStats() {
            const total = sampleProducts.length;
            const lowStock = sampleProducts.filter(p => getStockStatus(p.quantity) === 'Low Stock').length;
            const inStock = sampleProducts.filter(p => getStockStatus(p.quantity) === 'In Stock').length;
            const expiring = sampleProducts.filter(p => {
                const expiryDate = new Date(p.expiry);
                const diffTime = expiryDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffTime > 0 && diffDays <= 30;
            }).length;

            totalProducts.textContent = total;
            lowStockItems.textContent = lowStock;
            inStockProducts.textContent = inStock;
            expiringSoon.textContent = expiring;
        }

        // Initialize DataTable
        function initializeDataTable() {
            dataTableInstance = $('#productTable').DataTable({
                pageLength: 5,
                lengthMenu: [5, 10, 25, 50],
                searching: false, // Disable DataTable's built-in search
                ordering: true,
                columnDefs: [
                    { targets: 0, orderDataType: 'dom-text-numeric' },
                    { targets: 5, orderDataType: 'dom-text-numeric' },
                    { targets: 6, orderDataType: 'dom-text-numeric' },
                    { targets: 7, orderDataType: 'dom-date-dd-mm-yyyy' },
                    { orderable: false, targets: 9 } // Disable sorting for Actions column
                ],
                order: [[0, 'asc']], // Default sort by ID
                language: {
                    emptyTable: "No products available"
                }
            });

            // Custom sorting for date format (DD-MM-YYYY)
            $.fn.dataTable.ext.type.order['dom-date-dd-mm-yyyy-pre'] = function(data) {
                if (!data || data === 'N/A') return 0;
                const parts = data.split('-');
                return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
            };

            // Custom sorting for numeric fields in text
            $.fn.dataTable.ext.type.order['dom-text-numeric-pre'] = function(data) {
                const num = parseFloat(data) || 0;
                return num;
            };
        }

        // Setup event listeners
        function setupEventListeners() {
            // Sidebar toggle
            const toggleSidebar = () => {
                const sidebar = document.getElementById('sidebar');
                const sidebarArrow = document.getElementById('sidebar-arrow');
                sidebar.classList.toggle('-translate-x-full');
                sidebarArrow.classList.toggle('rotate-180');
            };

            document.getElementById('toggle-sidebar-mobile').addEventListener('click', toggleSidebar);
            document.getElementById('toggle-sidebar-logo').addEventListener('click', toggleSidebar);
            document.getElementById('close-sidebar').addEventListener('click', toggleSidebar);

            // Modal close buttons
            document.getElementById('closeDetailModal').addEventListener('click', () => {
                productDetailModal.style.display = 'none';
            });
            document.getElementById('closeEditModal').addEventListener('click', () => {
                editProductModal.style.display = 'none';
                editProductForm.reset();
            });
            document.getElementById('cancelEdit').addEventListener('click', () => {
                editProductModal.style.display = 'none';
                editProductForm.reset();
            });
            document.getElementById('closeAddCategoryModal').addEventListener('click', () => {
                addCategoryModal.style.display = 'none';
                resetAddCategoryForm();
            });
            document.getElementById('cancelAddCategory').addEventListener('click', () => {
                addCategoryModal.style.display = 'none';
                resetAddCategoryForm();
            });
            document.getElementById('closeSuccessPopup').addEventListener('click', () => {
                successPopup.style.display = 'none';
            });

            // Add product button
            document.getElementById('addProductBtn').addEventListener('click', () => {
                editModalTitle.textContent = 'Add New Product';
                editProductForm.reset();
                updateTypeOptions();
                setImageFieldsRequired(true);
                currentProductId = null;
                editProductModal.style.display = 'flex';
            });

            // Add category button
            document.getElementById('addCategoryBtn').addEventListener('click', () => {
                resetAddCategoryForm();
                addCategoryModal.style.display = 'flex';
            });

            // Add subcategory button
            document.getElementById('addSubcategoryBtn').addEventListener('click', () => addSubcategoryInput());

            // Category change for type update
            document.getElementById('edit-category').addEventListener('change', updateTypeOptions);

            // Export CSV button
            document.getElementById('exportBtn').addEventListener('click', exportToCSV);

            // Form submissions
            editProductForm.addEventListener('submit', handleFormSubmit);
            document.getElementById('addCategoryForm').addEventListener('submit', handleAddCategorySubmit);

            // Product table button clicks
            productTableBody.addEventListener('click', (e) => {
                const target = e.target.closest('button');
                if (!target) return;
                const id = target.dataset.id;
                const product = sampleProducts.find(p => p.id == id);

                if (target.classList.contains('view-btn')) {
                    showProductDetails(product);
                } else if (target.classList.contains('edit-btn')) {
                    openEditModal(product);
                }
            });

            // Filters with debounce
            const debounce = (func, delay) => {
                let timeout;
                return (...args) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func(...args), delay);
                };
            };

            const applyFiltersDebounced = debounce(applyFilters, 300);
            document.getElementById('categoryFilter').addEventListener('change', () => {
                populateSubcategoryFilter();
                applyFiltersDebounced();
            });
            document.getElementById('subcategoryFilter').addEventListener('change', applyFiltersDebounced);
            document.getElementById('prescriptionFilter').addEventListener('change', applyFiltersDebounced);
            document.getElementById('stockFilter').addEventListener('change', applyFiltersDebounced);
            document.getElementById('searchInput').addEventListener('input', applyFiltersDebounced);
        }

        // Set image fields required attribute
        function setImageFieldsRequired(required) {
            document.getElementById('edit-image1').required = required;
            document.getElementById('edit-image2').required = required;
            document.getElementById('edit-image3').required = required;
            document.getElementById('edit-image4').required = required;
        }

        // Reset add category form
        function resetAddCategoryForm() {
            document.getElementById('new-category-name').value = '';
            const container = document.getElementById('subcategories-container');
            container.innerHTML = '';
            addSubcategoryInput();
        }

        // Add subcategory input field
        function addSubcategoryInput(value = '') {
            const div = document.createElement('div');
            div.classList.add('subcategory-input', 'flex', 'mb-2');

            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('flex-1', 'mr-2');
            input.placeholder = 'Subcategory name';
            input.value = value;
            input.required = true;

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.classList.add('remove-sub-btn', 'bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded');
            removeBtn.textContent = '-';
            removeBtn.addEventListener('click', () => {
                if (document.querySelectorAll('#subcategories-container .subcategory-input').length > 1) {
                    div.remove();
                } else {
                    showSuccessPopup('At least one subcategory is required.', 'error');
                }
            });

            div.appendChild(input);
            div.appendChild(removeBtn);
            document.getElementById('subcategories-container').appendChild(div);
        }

        // Handle add category submit
        function handleAddCategorySubmit(e) {
            e.preventDefault();
            const name = document.getElementById('new-category-name').value.trim();
            if (!name) {
                showSuccessPopup('Category name is required.', 'error');
                return;
            }

            if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
                showSuccessPopup('Category already exists.', 'error');
                return;
            }

            const subs = Array.from(document.querySelectorAll('#subcategories-container input'))
                .map(input => input.value.trim())
                .filter(v => v);

            if (subs.length === 0) {
                showSuccessPopup('At least one subcategory is required.', 'error');
                return;
            }

            categories.push({ name, subcategories: subs });
            populateCategorySelects();
            populateSubcategoryFilter();
            addCategoryModal.style.display = 'none';
            resetAddCategoryForm();
            showSuccessPopup('Category added successfully!');
        }

        // Show product details in modal
        function showProductDetails(product) {
            if (!product) return;

            document.getElementById('detail-id').textContent = product.id;
            document.getElementById('detail-sku').textContent = product.sku;
            document.getElementById('detail-name').textContent = product.name;
            document.getElementById('detail-category').textContent = product.category;
            document.getElementById('detail-type').textContent = product.type;
            document.getElementById('detail-brand').textContent = product.brand;
            document.getElementById('detail-prescription').textContent = product.prescription;
            document.getElementById('detail-quantity').textContent = `${product.quantity} ${product.unit}`;
            document.getElementById('detail-unit').textContent = product.unit;
            document.getElementById('detail-mrp').textContent = `₹${product.mrp.toFixed(2)}`;
            document.getElementById('detail-price').textContent = `₹${product.price.toFixed(2)}`;
            document.getElementById('detail-batch').textContent = product.batch;
            document.getElementById('detail-expiry').textContent = formatDate(product.expiry);
            document.getElementById('detail-description').textContent = product.description || 'N/A';
            document.getElementById('detail-storage').textContent = product.storage || 'N/A';
            const stockStatus = getStockStatus(product.quantity);
            const stockStatusElement = document.getElementById('detail-stock-status');
            stockStatusElement.textContent = stockStatus;
            stockStatusElement.className = 'info-value status-badge ' + (stockStatus === 'In Stock' ? 'status-in-stock' : stockStatus === 'Low Stock' ? 'status-low-stock' : 'status-out-of-stock');

            // Display images
            const detailImages = document.getElementById('detail-images');
            detailImages.innerHTML = '';
            if (product.images && product.images.length > 0) {
                product.images.forEach((img, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = img;
                    imgElement.alt = `Product Image ${index + 1}`;
                    imgElement.classList.add('product-image');
                    detailImages.appendChild(imgElement);
                });
            } else {
                detailImages.textContent = 'No images available';
            }

            document.getElementById('editProductBtn').onclick = () => openEditModal(product);
            productDetailModal.style.display = 'flex';
        }

        // Open edit modal with product data
        function openEditModal(product) {
            editModalTitle.textContent = 'Edit Product';
            currentProductId = product.id;
            document.getElementById('edit-sku').value = product.sku;
            document.getElementById('edit-name').value = product.name;
            document.getElementById('edit-category').value = product.category;
            updateTypeOptions();
            document.getElementById('edit-type').value = product.type;
            document.getElementById('edit-brand').value = product.brand;
            document.getElementById('edit-prescription').value = product.prescription;
            document.getElementById('edit-quantity').value = product.quantity;
            document.getElementById('edit-unit').value = product.unit;
            document.getElementById('edit-mrp').value = product.mrp;
            document.getElementById('edit-price').value = product.price;
            document.getElementById('edit-batch').value = product.batch;
            document.getElementById('edit-expiry').value = product.expiry;
            document.getElementById('edit-description').value = product.description || '';
            document.getElementById('edit-storage').value = product.storage || '';
            setImageFieldsRequired(false); // Images optional for editing
            editProductModal.style.display = 'flex';
        }

        // Handle form submission
        function handleFormSubmit(e) {
            e.preventDefault();

            const sku = document.getElementById('edit-sku').value.trim();
            const name = document.getElementById('edit-name').value.trim();
            const category = document.getElementById('edit-category').value;
            const type = document.getElementById('edit-type').value;
            const brand = document.getElementById('edit-brand').value.trim();
            const prescription = document.getElementById('edit-prescription').value;
            const quantity = parseInt(document.getElementById('edit-quantity').value);
            const unit = document.getElementById('edit-unit').value;
            const mrp = parseFloat(document.getElementById('edit-mrp').value);
            const price = parseFloat(document.getElementById('edit-price').value);
            const batch = document.getElementById('edit-batch').value.trim();
            const expiry = document.getElementById('edit-expiry').value;
            const description = document.getElementById('edit-description').value.trim();
            const storage = document.getElementById('edit-storage').value.trim();

            // Validate inputs
            if (!sku || !name || !category || !type || !brand || !prescription || !unit || !batch || !expiry) {
                showSuccessPopup('All required fields must be filled.', 'error');
                return;
            }
            if (isNaN(quantity) || quantity < 0) {
                showSuccessPopup('Quantity must be a non-negative number.', 'error');
                return;
            }
            if (isNaN(mrp) || mrp < 0 || isNaN(price) || price < 0) {
                showSuccessPopup('MRP and Price must be non-negative numbers.', 'error');
                return;
            }
            if (new Date(expiry) <= today) {
                showSuccessPopup('Expiry date must be in the future.', 'error');
                return;
            }
            if (sampleProducts.some(p => p.sku === sku && p.id !== currentProductId)) {
                showSuccessPopup('SKU must be unique.', 'error');
                return;
            }

            // Validate images for new product
            if (!currentProductId) {
                const image1 = document.getElementById('edit-image1').files[0];
                const image2 = document.getElementById('edit-image2').files[0];
                const image3 = document.getElementById('edit-image3').files[0];
                const image4 = document.getElementById('edit-image4').files[0];
                if (!image1 || !image2 || !image3 || !image4) {
                    showSuccessPopup('Please upload exactly 4 images for new products.', 'error');
                    return;
                }
            }

            // Handle images
            const newImages = [];
            const imageInputs = [
                document.getElementById('edit-image1').files[0],
                document.getElementById('edit-image2').files[0],
                document.getElementById('edit-image3').files[0],
                document.getElementById('edit-image4').files[0]
            ].filter(file => file);
            if (imageInputs.length > 0) {
                imageInputs.forEach(file => {
                    newImages.push(URL.createObjectURL(file));
                });
            }

            const productData = {
                id: currentProductId || (sampleProducts.length ? Math.max(...sampleProducts.map(p => p.id)) + 1 : 1),
                sku,
                name,
                category,
                type,
                brand,
                prescription,
                quantity,
                unit,
                mrp,
                price,
                batch,
                expiry,
                description,
                storage,
                added: currentProductId ? sampleProducts.find(p => p.id == currentProductId).added : today.toISOString().split('T')[0],
                updated: today.toISOString().split('T')[0],
                images: newImages.length > 0 ? newImages : (currentProductId ? sampleProducts.find(p => p.id == currentProductId).images : [
                    "https://via.placeholder.com/150?text=Default1",
                    "https://via.placeholder.com/150?text=Default2",
                    "https://via.placeholder.com/150?text=Default3",
                    "https://via.placeholder.com/150?text=Default4"
                ])
            };

            if (currentProductId) {
                const index = sampleProducts.findIndex(p => p.id == currentProductId);
                sampleProducts[index] = productData;
                showSuccessPopup('Product updated successfully!');
            } else {
                sampleProducts.push(productData);
                showSuccessPopup('Product added successfully!');
            }

            editProductModal.style.display = 'none';
            editProductForm.reset();
            updateStats();
            loadProducts();
            applyFilters();
        }

        // Apply filters
        function applyFilters() {
            const category = document.getElementById('categoryFilter').value;
            const subcategory = document.getElementById('subcategoryFilter').value;
            const prescription = document.getElementById('prescriptionFilter').value;
            const stock = document.getElementById('stockFilter').value;
            const search = document.getElementById('searchInput').value.trim().toLowerCase();

            let filteredProducts = [...sampleProducts];

            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
            if (subcategory) {
                filteredProducts = filteredProducts.filter(p => p.type === subcategory);
            }
            if (prescription) {
                filteredProducts = filteredProducts.filter(p => p.prescription === prescription);
            }
            if (stock) {
                filteredProducts = filteredProducts.filter(p => {
                    const stockStatus = getStockStatus(p.quantity);
                    if (stock === 'in-stock') return stockStatus === 'In Stock';
                    if (stock === 'low-stock') return stockStatus === 'Low Stock';
                    if (stock === 'out-of-stock') return stockStatus === 'Out of Stock';
                });
            }
            if (search) {
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.sku.toLowerCase().includes(search) ||
                    p.brand.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search)
                );
            }

            loadProducts(filteredProducts);
        }

        // Show success/error popup
        function showSuccessPopup(message, type = 'success') {
            successMessage.textContent = message;
            const icon = document.getElementById('popupIcon');
            icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
            icon.style.color = type === 'success' ? '#10b981' : '#dc2626';
            successPopup.style.display = 'flex';
            setTimeout(() => {
                successPopup.style.display = 'none';
            }, 3000);
        }

        // Export to CSV with proper escaping
        function exportToCSV() {
            const headers = [
                'ID', 'SKU', 'Name', 'Category', 'Subcategory', 'Brand', 'Prescription',
                'Quantity', 'Unit', 'MRP', 'Selling Price', 'Batch Number',
                'Expiry Date', 'Description', 'Storage', 'Added Date', 'Last Updated'
            ];

            const escapeCSV = (str) => {
                if (!str) return '';
                return `"${str.replace(/"/g, '""')}"`;
            };

            const rows = sampleProducts.map(p => [
                p.id,
                escapeCSV(p.sku),
                escapeCSV(p.name),
                escapeCSV(p.category),
                escapeCSV(p.type),
                escapeCSV(p.brand),
                escapeCSV(p.prescription),
                p.quantity,
                escapeCSV(p.unit),
                p.mrp.toFixed(2),
                p.price.toFixed(2),
                escapeCSV(p.batch),
                escapeCSV(p.expiry),
                escapeCSV(p.description),
                escapeCSV(p.storage),
                escapeCSV(p.added),
                escapeCSV(p.updated)
            ]);

            let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' +
                rows.map(row => row.join(',')).join('\n');

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'products_export.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === productDetailModal) {
                productDetailModal.style.display = 'none';
            }
            if (e.target === editProductModal) {
                editProductModal.style.display = 'none';
                editProductForm.reset();
            }
            if (e.target === addCategoryModal) {
                addCategoryModal.style.display = 'none';
                resetAddCategoryForm();
            }
            if (e.target === successPopup) {
                successPopup.style.display = 'none';
            }
        });

        // Sidebar toggle functionality
const toggleSidebarLogo = document.getElementById('toggle-sidebar-logo');
const sidebarArrow = document.getElementById('sidebar-arrow');
const sidebar = document.getElementById('sidebar');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarLogo = document.getElementById('sidebar-logo');
const toggleSidebarMobile = document.getElementById('toggle-sidebar-mobile');
const closeSidebar = document.getElementById('close-sidebar');

toggleSidebarLogo.addEventListener('click', () => {
  sidebar.classList.toggle('w-58');
  sidebar.classList.toggle('w-14');
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

    

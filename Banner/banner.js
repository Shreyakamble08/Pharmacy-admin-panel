
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

    // Toastify notification function
    function showToast(message, type = 'success') {
      Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'success' ? '#34a853' : '#ea4335',
        stopOnFocus: true,
        style: {
          borderRadius: '8px',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          fontSize: '14px',
          padding: '10px 20px',
        }
      }).showToast();
    }

    displayUserProfile();

    // Sample banner data
    let banners = [
      {
        id: 1,
        title: "Summer Health Sale",
        description: "Get 20% off on all vitamins and supplements",
        images: [
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%231a73e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='white'%3ESummer Health Sale%3C/text%3E%3C/svg%3E"
        ],
        redirectLink: "#",
        pageName: "Homepage",
        status: "active",
        createdDate: "2023-06-15"
      },
      {
        id: 2,
        title: "New Arrivals",
        description: "Check out our latest pharmaceutical products",
        images: [
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%2334a853'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='white'%3ENew Arrivals%3C/text%3E%3C/svg%3E"
        ],
        redirectLink: "#",
        pageName: "Product",
        status: "active",
        createdDate: "2023-06-10"
      },
      {
        id: 3,
        title: "Winter Wellness",
        description: "Stay healthy this winter with our immunity boosters",
        images: [
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%23fbbc05'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='white'%3EWinter Wellness%3C/text%3E%3C/svg%3E"
        ],
        redirectLink: "#",
        pageName: "Mothercare",
        status: "inactive",
        createdDate: "2023-05-28"
      },
      {
        id: 4,
        title: "Prescription Refills",
        description: "Easy online prescription refills available 24/7",
        images: [
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%23ea4335'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='white'%3EPrescription Refills%3C/text%3E%3C/svg%3E"
        ],
        redirectLink: "#",
        pageName: "Checkout",
        status: "active",
        createdDate: "2023-06-05"
      }
    ];

    // DOM Elements
    const tableView = document.getElementById('tableView');
    const gridView = document.getElementById('gridView');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const addBannerBtn = document.getElementById('addBannerBtn');
    const bannerModal = document.getElementById('bannerModal');
    const viewBannerModal = document.getElementById('viewBannerModal');
    const deleteModal = document.getElementById('deleteModal');
    const logoutModal = document.getElementById('logoutModal');
    const bannerForm = document.getElementById('bannerForm');
    const saveBannerBtn = document.getElementById('saveBannerBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    const bannersTableBody = document.getElementById('bannersTableBody');
    const bannerImage1 = document.getElementById('bannerImage1');
    const bannerImage2 = document.getElementById('bannerImage2');
    const bannerImage3 = document.getElementById('bannerImage3');
    const bannerImage4 = document.getElementById('bannerImage4');
    const imagePreview = document.getElementById('imagePreview');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const bannerStatus = document.getElementById('bannerStatus');
    const statusLabel = document.getElementById('statusLabel');
    const bannerSearch = document.getElementById('banner-search');
    const statusFilter = document.getElementById('status-filter');
    const logoutBtn = document.getElementById('logout-btn');
    const pageName = document.getElementById('pageName');

    // Current banner being edited or deleted
    let currentBannerId = null;
    let isEditMode = false;
    let currentMainImageIndex = 0;

    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
      loadBanners();
      
      // View toggle functionality
      tableViewBtn.addEventListener('click', function() {
        tableView.style.display = 'block';
        gridView.style.display = 'none';
        tableViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
      });
      
      gridViewBtn.addEventListener('click', function() {
        tableView.style.display = 'none';
        gridView.style.display = 'grid';
        tableViewBtn.classList.remove('active');
        gridViewBtn.classList.add('active');
      });
      
      // Add banner button
      addBannerBtn.addEventListener('click', function() {
        openBannerModal();
      });
      
      // Close modal buttons
      document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
          bannerModal.style.display = 'none';
        });
      });
      
      document.querySelectorAll('.close-view-modal').forEach(button => {
        button.addEventListener('click', function() {
          viewBannerModal.style.display = 'none';
        });
      });
      
      document.querySelectorAll('.close-delete-modal').forEach(button => {
        button.addEventListener('click', function() {
          deleteModal.style.display = 'none';
        });
      });
      
      document.querySelectorAll('.close-logout-modal').forEach(button => {
        button.addEventListener('click', function() {
          logoutModal.style.display = 'none';
        });
      });
      
      // Save banner button
      saveBannerBtn.addEventListener('click', function() {
        saveBanner();
      });
      
      // Confirm delete button
      confirmDeleteBtn.addEventListener('click', function() {
        deleteBanner();
      });
      
      // Confirm logout button
      confirmLogoutBtn.addEventListener('click', function() {
        // Redirect to login page
        window.location.href = '../Login/login.html';
      });
      
      // Logout button
      logoutBtn.addEventListener('click', function() {
        logoutModal.style.display = 'flex';
      });
      
      // Image upload preview for multiple images
      [bannerImage1, bannerImage2, bannerImage3, bannerImage4].forEach((input, index) => {
        input.addEventListener('change', function(e) {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              const imgSrc = e.target.result;
              if (index === 0) {
                imagePreview.src = imgSrc;
                imagePreview.style.display = 'block';
                document.getElementById('previewImage').src = imgSrc;
                currentMainImageIndex = 0;
              }
              updateThumbnails(index, imgSrc);
            };
            reader.readAsDataURL(file);
          }
        });
      });
      
      // Status toggle in modal
      bannerStatus.addEventListener('change', function() {
        statusLabel.textContent = this.checked ? 'Active' : 'Inactive';
      });
      
      // Real-time preview updates
      document.getElementById('bannerTitle').addEventListener('input', function() {
        document.getElementById('previewTitle').textContent = this.value || 'Banner Title';
      });
      
      document.getElementById('bannerDescription').addEventListener('input', function() {
        document.getElementById('previewDescription').textContent = this.value || 'Banner description will appear here';
      });
      
      // Search and filter functionality
      bannerSearch.addEventListener('input', function() {
        loadBanners();
      });
      
      statusFilter.addEventListener('change', function() {
        loadBanners();
      });
    });

    // Update thumbnails and handle main image selection
    function updateThumbnails(activeIndex, newSrc) {
      const images = [
        bannerImage1.files[0] ? imagePreview.src : null,
        bannerImage2.files[0] ? getInputSrc(bannerImage2) : null,
        bannerImage3.files[0] ? getInputSrc(bannerImage3) : null,
        bannerImage4.files[0] ? getInputSrc(bannerImage4) : null
      ].filter(src => src);

      if (newSrc) {
        images[activeIndex] = newSrc;
      }

      thumbnailContainer.innerHTML = '';
      images.forEach((src, index) => {
        if (src) {
          const img = document.createElement('img');
          img.src = src;
          img.className = `thumbnail ${index === currentMainImageIndex ? 'active' : ''}`;
          img.alt = `Thumbnail ${index + 1}`;
          img.addEventListener('click', () => {
            currentMainImageIndex = index;
            imagePreview.src = src;
            document.getElementById('previewImage').src = src;
            updateThumbnails();
          });
          thumbnailContainer.appendChild(img);
        }
      });
    }

    // Helper to get input src
    function getInputSrc(input) {
      const file = input.files[0];
      if (file) {
        return URL.createObjectURL(file);
      }
      return null;
    }

    // Load banners into table and grid views
    function loadBanners() {
      const searchTerm = bannerSearch.value.toLowerCase();
      const statusFilterValue = statusFilter.value;
      
      // Clear existing content
      bannersTableBody.innerHTML = '';
      gridView.innerHTML = '';
      
      // Show skeleton loading
      showSkeletonLoading();
      
      // Simulate API call delay
      setTimeout(() => {
        // Remove skeleton loading
        bannersTableBody.innerHTML = '';
        gridView.innerHTML = '';
        
        // Filter banners based on search and status
        const filteredBanners = banners.filter(banner => {
          const matchesSearch = banner.title.toLowerCase().includes(searchTerm) || 
                               banner.description.toLowerCase().includes(searchTerm);
          const matchesStatus = !statusFilterValue || banner.status === statusFilterValue;
          return matchesSearch && matchesStatus;
        });
        
        // Populate table view
        filteredBanners.forEach(banner => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <img src="${banner.images[0]}" alt="${banner.title}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;">
            </td>
            <td>${banner.title}</td>
            <td>${banner.pageName}</td>
            <td>
              <span class="badge ${banner.status === 'active' ? 'badge-active' : 'badge-inactive'}">
                ${banner.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
              </span>
            </td>
            <td>${formatDate(banner.createdDate)}</td>
            <td>
              <button class="action-btn view" onclick="viewBanner(${banner.id})">
                <i class="fas fa-eye"></i>
              </button>
              <button class="action-btn edit" onclick="editBanner(${banner.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete" onclick="confirmDelete(${banner.id})">
                <i class="fas fa-trash"></i>
              </button>
              <label class="switch ml-2">
                <input type="checkbox" ${banner.status === 'active' ? 'checked' : ''} onchange="toggleStatus(${banner.id})">
                <span class="slider"></span>
              </label>
            </td>
          `;
          bannersTableBody.appendChild(row);
        });
        
        // Populate grid view
        filteredBanners.forEach(banner => {
          const card = document.createElement('div');
          card.className = 'banner-card';
          card.innerHTML = `
            <img src="${banner.images[0]}" alt="${banner.title}">
            <div class="banner-card-body">
              <div class="banner-card-title">${banner.title}</div>
              <div class="banner-card-desc">${banner.description}</div>
              <div class="banner-card-desc">Page: ${banner.pageName}</div>
            </div>
            <div class="banner-card-footer">
              <span class="badge ${banner.status === 'active' ? 'badge-active' : 'badge-inactive'}">
                ${banner.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
              </span>
              <div>
                <button class="action-btn view" onclick="viewBanner(${banner.id})">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editBanner(${banner.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="confirmDelete(${banner.id})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `;
          gridView.appendChild(card);
        });
      }, 1000);
    }

    // Show skeleton loading
    function showSkeletonLoading() {
      // Table view skeleton
      for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><div class="skeleton skeleton-image" style="width: 80px; height: 50px;"></div></td>
          <td><div class="skeleton skeleton-text"></div></td>
          <td><div class="skeleton skeleton-text short"></div></td>
          <td><div class="skeleton skeleton-text short"></div></td>
          <td><div class="skeleton skeleton-text short"></div></td>
          <td><div class="skeleton skeleton-text" style="width: 120px;"></div></td>
        `;
        bannersTableBody.appendChild(row);
      }
      
      // Grid view skeleton
      for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.className = 'banner-card';
        card.innerHTML = `
          <div class="skeleton skeleton-image"></div>
          <div class="banner-card-body">
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
          </div>
          <div class="banner-card-footer">
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-text" style="width: 80px;"></div>
          </div>
        `;
        gridView.appendChild(card);
      }
    }

    // Open banner modal for adding or editing
    function openBannerModal(banner = null) {
      isEditMode = banner !== null;
      currentBannerId = banner ? banner.id : null;
      currentMainImageIndex = 0;
      
      document.getElementById('modalTitle').textContent = isEditMode ? 'Edit Banner' : 'Add New Banner';
      
      if (isEditMode) {
        // Populate form with banner data
        document.getElementById('bannerId').value = banner.id;
        document.getElementById('bannerTitle').value = banner.title;
        document.getElementById('bannerDescription').value = banner.description;
        document.getElementById('redirectLink').value = banner.redirectLink;
        document.getElementById('pageName').value = banner.pageName;
        bannerStatus.checked = banner.status === 'active';
        statusLabel.textContent = banner.status === 'active' ? 'Active' : 'Inactive';
        
        // Set image preview and thumbnails
        imagePreview.src = banner.images[0] || '';
        imagePreview.style.display = banner.images[0] ? 'block' : 'none';
        document.getElementById('previewImage').src = banner.images[0] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3EBanner Preview%3C/text%3E%3C/svg%3E";
        document.getElementById('previewTitle').textContent = banner.title;
        document.getElementById('previewDescription').textContent = banner.description;
        
        thumbnailContainer.innerHTML = '';
        banner.images.forEach((src, index) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = `thumbnail ${index === 0 ? 'active' : ''}`;
          img.alt = `Thumbnail ${index + 1}`;
          img.addEventListener('click', () => {
            currentMainImageIndex = index;
            imagePreview.src = src;
            document.getElementById('previewImage').src = src;
            updateThumbnails();
          });
          thumbnailContainer.appendChild(img);
        });
      } else {
        // Reset form for new banner
        bannerForm.reset();
        imagePreview.style.display = 'none';
        thumbnailContainer.innerHTML = '';
        document.getElementById('previewImage').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='150' viewBox='0 0 400 150'%3E%3Crect width='400' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3EBanner Preview%3C/text%3E%3C/svg%3E";
        document.getElementById('previewTitle').textContent = 'Banner Title';
        document.getElementById('previewDescription').textContent = 'Banner description will appear here';
        bannerStatus.checked = true;
        statusLabel.textContent = 'Active';
        pageName.value = '';
      }
      
      bannerModal.style.display = 'flex';
    }

    // Save banner (add or update)
    function saveBanner() {
      const title = document.getElementById('bannerTitle').value;
      const description = document.getElementById('bannerDescription').value;
      const redirectLink = document.getElementById('redirectLink').value;
      const pageNameValue = pageName.value;
      const status = bannerStatus.checked ? 'active' : 'inactive';
      
      const images = [
        bannerImage1.files[0] ? imagePreview.src : (isEditMode ? banners.find(b => b.id === currentBannerId)?.images[0] : null),
        bannerImage2.files[0] ? getInputSrc(bannerImage2) : (isEditMode ? banners.find(b => b.id === currentBannerId)?.images[1] : null),
        bannerImage3.files[0] ? getInputSrc(bannerImage3) : (isEditMode ? banners.find(b => b.id === currentBannerId)?.images[2] : null),
        bannerImage4.files[0] ? getInputSrc(bannerImage4) : (isEditMode ? banners.find(b => b.id === currentBannerId)?.images[3] : null)
      ].filter(src => src);

      if (!title) {
        showToast('Please enter a banner title', 'error');
        return;
      }

      if (!pageNameValue) {
        showToast('Please select a page name', 'error');
        return;
      }

      if (!images[0]) {
        showToast('Please upload at least one banner image', 'error');
        return;
      }
      
      if (isEditMode) {
        // Update existing banner
        const index = banners.findIndex(b => b.id === currentBannerId);
        if (index !== -1) {
          banners[index] = {
            ...banners[index],
            title,
            description,
            redirectLink,
            pageName: pageNameValue,
            status,
            images
          };
        }
      } else {
        // Add new banner
        const newBanner = {
          id: banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1,
          title,
          description,
          images,
          redirectLink,
          pageName: pageNameValue,
          status,
          createdDate: new Date().toISOString().split('T')[0]
        };
        banners.push(newBanner);
      }
      
      // Reload banners and close modal
      loadBanners();
      bannerModal.style.display = 'none';
      
      // Show success message
      showToast(`Banner ${isEditMode ? 'updated' : 'added'} successfully!`, 'success');
    }

    // Edit banner
    function editBanner(id) {
      const banner = banners.find(b => b.id === id);
      if (banner) {
        openBannerModal(banner);
      }
    }

    // View banner details in modal
    function viewBanner(id) {
      const banner = banners.find(b => b.id === id);
      if (banner) {
        document.getElementById('viewBannerImage').src = banner.images[0];
        document.getElementById('viewBannerTitle').textContent = banner.title;
        document.getElementById('viewBannerDescription').textContent = banner.description;
        document.getElementById('viewBannerPage').textContent = banner.pageName;
        document.getElementById('viewBannerLink').textContent = banner.redirectLink || 'Not provided';
        document.getElementById('viewBannerStatus').innerHTML = `
          <span class="badge ${banner.status === 'active' ? 'badge-active' : 'badge-inactive'}">
            ${banner.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
          </span>
        `;
        document.getElementById('viewBannerDate').textContent = formatDate(banner.createdDate);
        
        // Populate thumbnails in view modal
        const viewThumbnailContainer = document.getElementById('viewThumbnailContainer');
        viewThumbnailContainer.innerHTML = '';
        banner.images.forEach((src, index) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = `thumbnail ${index === 0 ? 'active' : ''}`;
          img.alt = `Thumbnail ${index + 1}`;
          img.addEventListener('click', () => {
            document.getElementById('viewBannerImage').src = src;
            viewThumbnailContainer.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            img.classList.add('active');
          });
          viewThumbnailContainer.appendChild(img);
        });
        
        viewBannerModal.style.display = 'flex';
      }
    }

    // Confirm delete banner
    function confirmDelete(id) {
      currentBannerId = id;
      deleteModal.style.display = 'flex';
    }

    // Delete banner
    function deleteBanner() {
      banners = banners.filter(b => b.id !== currentBannerId);
      loadBanners();
      deleteModal.style.display = 'none';
      
      // Show success message
      showToast('Banner deleted successfully!', 'success');
    }

    // Toggle banner status
    function toggleStatus(id) {
      const banner = banners.find(b => b.id === id);
      if (banner) {
        banner.status = banner.status === 'active' ? 'inactive' : 'active';
        loadBanners();
        
        // Show success message
        showToast(`Banner status changed to ${banner.status}`, 'success');
      }
    }

    // Format date for display
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Sidebar toggle logic
    const sidebar = document.getElementById("sidebar");
    const toggleSidebarLogo = document.getElementById("toggle-sidebar-logo");
    const sidebarArrow = document.getElementById("sidebar-arrow");
    const sidebarTitle = document.getElementById("sidebar-title");
    const sidebarLogo = document.getElementById("sidebar-logo");
    const navTexts = document.querySelectorAll(".nav-text");
    const closeSidebar = document.getElementById("close-sidebar");

    // Toggle sidebar open/close
    toggleSidebarLogo.addEventListener("click", () => {
      sidebar.classList.toggle("w-64");
      sidebar.classList.toggle("w-20");

      // Rotate arrow
      sidebarArrow.classList.toggle("rotate-180");

      // Toggle visibility of text labels
      navTexts.forEach((text) => {
        text.classList.toggle("hidden");
      });

      // Hide/Show title
      sidebarTitle.classList.toggle("hidden");

      // Adjust logo spacing
      if (sidebar.classList.contains("w-20")) {
        sidebarLogo.classList.add("mx-auto");
      } else {
        sidebarLogo.classList.remove("mx-auto");
      }
    });

    // Mobile close button
    if (closeSidebar) {
      closeSidebar.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
      });
    }

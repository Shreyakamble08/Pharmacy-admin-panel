// User profile functionality
const user = {
  name: "Shreya Kamble",
  role: "Admin",
};

function displayUserProfile() {
  const userInitials = document.getElementById("user-initials");
  const userName = document.getElementById("user-name");
  const userRole = document.getElementById("user-role");

  const nameParts = user.name.trim().split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0][0];
  userInitials.textContent = initials.toUpperCase();

  userName.textContent = user.name;
  userRole.textContent = user.role;
}

displayUserProfile();

// Updated: Expanded prescriptionsData with 35 entries
const prescriptionsData = [
  {
    id: "RX-1025",
    patient: "Sarah Johnson",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-15",
    status: "Approved",
    medicines: [
      { name: "Lisinopril", dosage: "10mg", quantity: 30, duration: "30 days" },
      { name: "Metformin", dosage: "500mg", quantity: 60, duration: "30 days" },
    ],
    notes: "Take with food. Follow up in 30 days.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+1", "https://via.placeholder.com/300x200?text=Prescription+2"],
  },
  {
    id: "RX-1024",
    patient: "Michael Chen",
    doctor: "Dr. James Wilson",
    date: "2023-11-15",
    status: "Dispensed",
    medicines: [
      { name: "Amoxicillin", dosage: "500mg", quantity: 21, duration: "7 days" },
    ],
    notes: "Take three times daily until finished.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+3"],
  },
  {
    id: "RX-1023",
    patient: "Emma Williams",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-14",
    status: "Pending",
    medicines: [
      { name: "Atorvastatin", dosage: "20mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take at bedtime.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+4", "https://via.placeholder.com/300x200?text=Prescription+5"],
  },
  {
    id: "RX-1022",
    patient: "Robert Brown",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-14",
    status: "Approved",
    medicines: [
      { name: "Levothyroxine", dosage: "50mcg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take on empty stomach in the morning.",
    images: [],
  },
  {
    id: "RX-1021",
    patient: "Lisa Anderson",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-13",
    status: "Dispensed",
    medicines: [
      { name: "Albuterol", dosage: "90mcg", quantity: 1, duration: "As needed" },
    ],
    notes: "Use inhaler as needed for shortness of breath.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+6"],
  },
  {
    id: "RX-1020",
    patient: "David Wilson",
    doctor: "Dr. James Wilson",
    date: "2023-11-12",
    status: "Approved",
    medicines: [
      { name: "Omeprazole", dosage: "20mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take before breakfast.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+7"],
  },
  {
    id: "RX-1019",
    patient: "Jennifer Lee",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-11",
    status: "Expired",
    medicines: [
      { name: "Cephalexin", dosage: "500mg", quantity: 28, duration: "7 days" },
    ],
    notes: "Finished course on 2023-11-18.",
    images: [],
  },
  {
    id: "RX-1018",
    patient: "Thomas Moore",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-10",
    status: "Pending",
    medicines: [
      { name: "Metoprolol", dosage: "25mg", quantity: 60, duration: "30 days" },
    ],
    notes: "Take twice daily. Monitor blood pressure.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+8"],
  },
  {
    id: "RX-1017",
    patient: "Anna Davis",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-09",
    status: "Approved",
    medicines: [
      { name: "Ibuprofen", dosage: "400mg", quantity: 30, duration: "10 days" },
    ],
    notes: "Take as needed for pain.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+9"],
  },
  {
    id: "RX-1016",
    patient: "James Smith",
    doctor: "Dr. James Wilson",
    date: "2023-11-08",
    status: "Dispensed",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take once daily.",
    images: [],
  },
  {
    id: "RX-1015",
    patient: "Sophia Garcia",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-07",
    status: "Pending",
    medicines: [
      { name: "Prednisone", dosage: "10mg", quantity: 20, duration: "10 days" },
    ],
    notes: "Taper dose as directed.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+10", "https://via.placeholder.com/300x200?text=Prescription+11"],
  },
  {
    id: "RX-1014",
    patient: "William Martinez",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-06",
    status: "Expired",
    medicines: [
      { name: "Azithromycin", dosage: "250mg", quantity: 6, duration: "5 days" },
    ],
    notes: "Completed course on 2023-11-11.",
    images: [],
  },
  {
    id: "RX-1013",
    patient: "Olivia Taylor",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-05",
    status: "Approved",
    medicines: [
      { name: "Sertraline", dosage: "50mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the morning.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+12"],
  },
  {
    id: "RX-1012",
    patient: "Liam Brown",
    doctor: "Dr. James Wilson",
    date: "2023-11-04",
    status: "Dispensed",
    medicines: [
      { name: "Hydrochlorothiazide", dosage: "25mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take with food.",
    images: [],
  },
  {
    id: "RX-1011",
    patient: "Ava Wilson",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-03",
    status: "Pending",
    medicines: [
      { name: "Loratadine", dosage: "10mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take as needed for allergies.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+13"],
  },
  {
    id: "RX-1010",
    patient: "Noah Davis",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-02",
    status: "Approved",
    medicines: [
      { name: "Gabapentin", dosage: "300mg", quantity: 90, duration: "30 days" },
    ],
    notes: "Take three times daily.",
    images: [],
  },
  {
    id: "RX-1009",
    patient: "Isabella Martinez",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-01",
    status: "Dispensed",
    medicines: [
      { name: "Citalopram", dosage: "20mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the evening.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+14"],
  },
  {
    id: "RX-1008",
    patient: "Mason Lee",
    doctor: "Dr. James Wilson",
    date: "2023-10-31",
    status: "Pending",
    medicines: [
      { name: "Losartan", dosage: "50mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Monitor blood pressure daily.",
    images: [],
  },
  {
    id: "RX-1007",
    patient: "Mia Thompson",
    doctor: "Dr. Emily Martinez",
    date: "2023-10-30",
    status: "Approved",
    medicines: [
      { name: "Simvastatin", dosage: "40mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take at night.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+15"],
  },
  {
    id: "RX-1006",
    patient: "Ethan Clark",
    doctor: "Dr. Robert Taylor",
    date: "2023-10-29",
    status: "Expired",
    medicines: [
      { name: "Clarithromycin", dosage: "500mg", quantity: 14, duration: "7 days" },
    ],
    notes: "Completed course on 2023-11-05.",
    images: [],
  },
  {
    id: "RX-1005",
    patient: "Charlotte Adams",
    doctor: "Dr. Lisa Anderson",
    date: "2023-10-28",
    status: "Dispensed",
    medicines: [
      { name: "Montelukast", dosage: "10mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the evening for asthma.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+16"],
  },
  {
    id: "RX-1004",
    patient: "Lucas Walker",
    doctor: "Dr. James Wilson",
    date: "2023-10-27",
    status: "Pending",
    medicines: [
      { name: "Furosemide", dosage: "40mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the morning.",
    images: [],
  },
  {
    id: "RX-1003",
    patient: "Amelia Hall",
    doctor: "Dr. Emily Martinez",
    date: "2023-10-26",
    status: "Approved",
    medicines: [
      { name: "Escitalopram", dosage: "10mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the morning.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+17"],
  },
  {
    id: "RX-1002",
    patient: "Henry Young",
    doctor: "Dr. Robert Taylor",
    date: "2023-10-25",
    status: "Dispensed",
    medicines: [
      { name: "Warfarin", dosage: "5mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Monitor INR regularly.",
    images: [],
  },
  {
    id: "RX-1001",
    patient: "Evelyn King",
    doctor: "Dr. Lisa Anderson",
    date: "2023-10-24",
    status: "Pending",
    medicines: [
      { name: "Pantoprazole", dosage: "40mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take before meals.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+18"],
  },
  // Additional entries for testing
  {
    id: "RX-1000",
    patient: "Sophie Turner",
    doctor: "Dr. James Wilson",
    date: "2023-11-15",
    status: "Rejected",
    medicines: [
      { name: "Tramadol", dosage: "50mg", quantity: 20, duration: "10 days" },
    ],
    notes: "Take as needed for pain.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+19", "https://via.placeholder.com/300x200?text=Prescription+20"],
  },
  {
    id: "RX-0999",
    patient: "Daniel Lee",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-14",
    status: "Approved",
    medicines: [
      { name: "Rosuvastatin", dosage: "10mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take at night.",
    images: [],
  },
  {
    id: "RX-0998",
    patient: "Grace Kim",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-13",
    status: "Pending",
    medicines: [
      { name: "Cetirizine", dosage: "10mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take as needed for allergies.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+21"],
  },
  {
    id: "RX-0997",
    patient: "Jacob White",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-12",
    status: "Dispensed",
    medicines: [
      { name: "Metformin", dosage: "1000mg", quantity: 60, duration: "30 days" },
    ],
    notes: "Take with meals.",
    images: [],
  },
  {
    id: "RX-0996",
    patient: "Lily Harris",
    doctor: "Dr. James Wilson",
    date: "2023-11-11",
    status: "Rejected",
    medicines: [
      { name: "Codeine", dosage: "30mg", quantity: 20, duration: "10 days" },
    ],
    notes: "Take as needed for cough.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+22"],
  },
  {
    id: "RX-0995",
    patient: "Ethan Parker",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-10",
    status: "Approved",
    medicines: [
      { name: "Lisinopril", dosage: "20mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Monitor blood pressure.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+23", "https://via.placeholder.com/300x200?text=Prescription+24"],
  },
  {
    id: "RX-0994",
    patient: "Chloe Adams",
    doctor: "Dr. Robert Taylor",
    date: "2023-11-09",
    status: "Pending",
    medicines: [
      { name: "Fluoxetine", dosage: "20mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take in the morning.",
    images: [],
  },
  {
    id: "RX-0993",
    patient: "Mason Scott",
    doctor: "Dr. Lisa Anderson",
    date: "2023-11-08",
    status: "Dispensed",
    medicines: [
      { name: "Atenolol", dosage: "50mg", quantity: 30, duration: "30 days" },
    ],
    notes: "Take once daily.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+25"],
  },
  {
    id: "RX-0992",
    patient: "Avery Green",
    doctor: "Dr. James Wilson",
    date: "2023-11-07",
    status: "Rejected",
    medicines: [
      { name: "Oxycodone", dosage: "5mg", quantity: 20, duration: "10 days" },
    ],
    notes: "Take as needed for pain.",
    images: [],
  },
  {
    id: "RX-0991",
    patient: "Harper Lewis",
    doctor: "Dr. Emily Martinez",
    date: "2023-11-15",
    status: "Pending",
    medicines: [
      { name: "Levofloxacin", dosage: "500mg", quantity: 7, duration: "7 days" },
    ],
    notes: "Take once daily with food.",
    images: ["https://via.placeholder.com/300x200?text=Prescription+26"],
  },
];

// Updated: Notifications data
const notificationsData = [
  {
    title: "Expiring Soon",
    message: "Prescription RX-1018 for David Wilson expires in 2 days.",
    time: "2 hours ago",
  },
  {
    title: "Clarification Needed",
    message: "Dr. Martinez needs clarification on prescription RX-1023.",
    time: "5 hours ago",
  },
  {
    title: "Ready for Pickup",
    message: "3 prescriptions are ready for patient pickup.",
    time: "Yesterday",
  },
];

// DOM Ready
$(document).ready(function () {
  // Initialize Flatpickr for date filters
  flatpickr("#date-from", { dateFormat: "Y-m-d" });
  flatpickr("#date-to", { dateFormat: "Y-m-d" });
  flatpickr("#history-date-from", { dateFormat: "Y-m-d" });
  flatpickr("#history-date-to", { dateFormat: "Y-m-d" });

  // Initialize DataTables
  const table = $("#prescriptionsTable").DataTable({
    responsive: false,
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[0, "desc"]],
    dom: '<"top-controls mb-4"lf>rt<"bottom-controls mt-4"ip>',
    scrollX: true,
    scrollY: '400px',
    scrollCollapse: true,
    paging: true,
    drawCallback: function () {
      this.api().columns.adjust();
    },
  });

  const historyTable = $("#historyTable").DataTable({
    responsive: false,
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[4, "desc"]],
    dom: '<"top-controls mb-4"lf>rt<"bottom-controls mt-4"ip>',
    scrollX: true,
    scrollY: '400px',
    scrollCollapse: true,
    paging: true,
    drawCallback: function () {
      this.api().columns.adjust();
    },
  });

  const notificationsTable = $("#notificationsTable").DataTable({
    responsive: false,
    searching: false,
    paging: false,
    info: false,
    order: [[2, "desc"]],
    scrollY: '200px',
    scrollCollapse: true,
    drawCallback: function () {
      this.api().columns.adjust();
    },
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

  // Modal functionality
  function openModal(modalId) {
    $("#" + modalId).css("display", "flex").removeClass("hidden");
  }

  window.closeModal = function (modalId) {
    $("#" + modalId).css("display", "none").addClass("hidden");
  };

  $("#toggle-notifications").on("click", function () {
    openModal("notificationModal");
  });

  $("#closeNotifications").on("click", function () {
    closeModal("notificationModal");
  });

  // Updated: Image overlay close
  $("#closeImageOverlay").on("click", function () {
    closeModal("imageOverlay");
  });

  // Add medicine entry
  $("#addMedicine").on("click", function () {
    $("#medicineList").append(`
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 medicine-entry">
        <input type="text" placeholder="Drug Name" class="w-full" required />
        <input type="text" placeholder="Dosage" class="w-full" required />
        <input type="number" placeholder="Quantity" min="1" class="w-full" required />
        <input type="text" placeholder="Duration" class="w-full" required />
        <button type="button" class="text-red-500 delete-medicine md:col-span-4 text-right"><i class="fas fa-trash"></i> Remove</button>
      </div>
    `);
  });

  // Remove medicine entry
  $(document).on("click", ".delete-medicine", function () {
    $(this).closest(".medicine-entry").remove();
  });

  // Form submission
  $("#prescriptionForm").on("submit", function (e) {
    e.preventDefault();
    alert("Prescription saved successfully!");
    closeModal("prescriptionModal");
  });

  $("#add-prescription").on("click", function () {
    $("#modalTitle").text("Add Prescription");
    $("#prescriptionForm")[0].reset();
    $("#medicineList").html(`
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 medicine-entry">
        <input type="text" placeholder="Drug Name" class="w-full" required />
        <input type="text" placeholder="Dosage" class="w-full" required />
        <input type="number" placeholder="Quantity" min="1" class="w-full" required />
        <input type="text" placeholder="Duration" class="w-full" required />
      </div>
    `);
    openModal("prescriptionModal");
  });

  $("#export-reports").on("click", function () {
    alert("Export functionality would be implemented here.");
  });

  // View prescription details
  $(document).on("click", ".view-btn", function () {
    const prescriptionId = $(this).data("id");
    const prescription = prescriptionsData.find((p) => p.id === prescriptionId);

    if (prescription) {
      $("#verificationDetails").html(`
        <p><strong>Prescription ID:</strong> ${prescription.id}</p>
        <p><strong>Patient:</strong> ${prescription.patient}</p>
        <p><strong>Doctor:</strong> ${prescription.doctor}</p>
        <p><strong>Date:</strong> ${prescription.date}</p>
        <p><strong>Medicines:</strong> ${prescription.medicines
          .map(
            (m) => `${m.name} ${m.dosage}, ${m.quantity} for ${m.duration}`
          )
          .join("; ")}</p>
        <p><strong>Notes:</strong> ${prescription.notes}</p>
      `);
      // Updated: Store prescription ID for image overlay
      $("#view-prescription-images").data("id", prescriptionId);
      openModal("verificationModal");
    }
  });

  // Updated: View prescription images
  $(document).on("click", "#view-prescription-images", function () {
    const prescriptionId = $(this).data("id");
    const prescription = prescriptionsData.find((p) => p.id === prescriptionId);

    if (prescription) {
      $("#prescriptionImages").html(
        prescription.images.length > 0
          ? prescription.images
              .map(
                (img) =>
                  `<img src="${img}" alt="Prescription Scan" class="rounded-lg border border-gray-200 shadow-sm max-w-full h-auto">`
              )
              .join("")
          : `<p class="text-gray-500">No images available.</p>`
      );
      openModal("imageOverlay");
    }
  });

  // Updated: Status change handlers with console logs for testing
  $(document).on("click", ".pending-btn", function () {
    const prescriptionId = $(this).data("id");
    console.log(`[TEST] Clicking Pending button for ${prescriptionId}`);
    updatePrescriptionStatus(prescriptionId, "Pending", table, historyTable);
  });

  $(document).on("click", ".approve-btn", function () {
    const prescriptionId = $(this).data("id");
    console.log(`[TEST] Clicking Approve button for ${prescriptionId}`);
    updatePrescriptionStatus(prescriptionId, "Approved", table, historyTable);
  });

  $(document).on("click", ".reject-btn", function () {
    const prescriptionId = $(this).data("id");
    console.log(`[TEST] Clicking Reject button for ${prescriptionId}`);
    updatePrescriptionStatus(prescriptionId, "Rejected", table, historyTable);
  });

  // Date filter for prescriptions table
  $("#date-from, #date-to").on("change", function () {
    const fromDate = $("#date-from").val();
    const toDate = $("#date-to").val();
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const date = data[4];
      if (!fromDate && !toDate) return true;
      if (fromDate && !toDate && date >= fromDate) return true;
      if (!fromDate && toDate && date <= toDate) return true;
      if (fromDate && toDate && date >= fromDate && date <= toDate) return true;
      return false;
    });
    table.draw();
    $.fn.dataTable.ext.search.pop();
  });

  // History table quick filters
  $("#filter-this-week").on("click", function () {
    const today = new Date("2023-11-15");
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    applyHistoryDateFilter(
      weekStart.toISOString().split("T")[0],
      weekEnd.toISOString().split("T")[0],
      historyTable
    );
  });

  $("#filter-last-week").on("click", function () {
    const today = new Date("2023-11-15");
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() - 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    applyHistoryDateFilter(
      weekStart.toISOString().split("T")[0],
      weekEnd.toISOString().split("T")[0],
      historyTable
    );
  });

  $("#filter-this-month").on("click", function () {
    const today = new Date("2023-11-15");
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    applyHistoryDateFilter(
      monthStart.toISOString().split("T")[0],
      monthEnd.toISOString().split("T")[0],
      historyTable
    );
  });

  $("#history-date-from, #history-date-to").on("change", function () {
    const fromDate = $("#history-date-from").val();
    const toDate = $("#history-date-to").val();
    applyHistoryDateFilter(fromDate, toDate, historyTable);
  });

  function applyHistoryDateFilter(fromDate, toDate, table) {
    $("#history-date-from").val(fromDate);
    $("#history-date-to").val(toDate);
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const date = data[4];
      if (!fromDate && !toDate) return true;
      if (fromDate && !toDate && date >= fromDate) return true;
      if (!fromDate && toDate && date <= toDate) return true;
      if (fromDate && toDate && date >= fromDate && date <= toDate) return true;
      return false;
    });
    table.draw();
    $.fn.dataTable.ext.search.pop();
  }

  // Updated: Status update with mock API response
  function updatePrescriptionStatus(prescriptionId, status, mainTable, historyTable) {
    const prescription = prescriptionsData.find((p) => p.id === prescriptionId);
    if (prescription) {
      console.log(`[TEST] Updating ${prescriptionId} to ${status}`);
      // Mock API response for testing
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ success: true }),
      };
      Promise.resolve(mockResponse)
        .then((response) => {
          if (!response.ok) throw new Error(`Mock HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          console.log(`[TEST] Success: Prescription ${prescriptionId} updated to ${status}`);
          alert(`Prescription ${status.toLowerCase()} successfully!`);
          prescription.status = status;
          updateTableAndCounts(mainTable, historyTable);
        })
        .catch((error) => {
          console.error(`[TEST] Error updating ${prescriptionId} to ${status}:`, error);
          alert(`Failed to update prescription: ${error.message}`);
        });
    } else {
      console.error(`[TEST] Prescription ${prescriptionId} not found`);
    }
  }

  // Close modals
  $("#closeModal, #closeVerification, #closePatient, #closeDoctor").on("click", function () {
    $(this).closest(".modal").css("display", "none").addClass("hidden");
  });

  $(window).on("click", function (e) {
    if ($(e.target).hasClass("modal")) {
      $(e.target).css("display", "none").addClass("hidden");
    }
  });

  // Status filter
  $("#filter-status").on("change", function () {
    const status = $(this).val();
    table.column(5).search(status).draw();
  });

  // Search functionality
  $("#search").on("keyup", function () {
    table.search(this.value).draw();
  });

  // Update tables and counts
  function updateTableAndCounts(mainTable, historyTable) {
    mainTable.clear();
    prescriptionsData.forEach((prescription, index) => {
      mainTable.row.add([
        index + 1,
        prescription.id,
        prescription.patient,
        prescription.doctor,
        prescription.date,
        `<span class="status-badge status-${prescription.status.toLowerCase()}">${prescription.status}</span>`,
        `
          <button class="action-btn bg-blue-100 text-blue-700 view-btn" data-id="${prescription.id}"><i class="fas fa-eye"></i></button>
          <button class="action-btn bg-yellow-100 text-yellow-700 pending-btn" data-id="${prescription.id}"><i class="fas fa-clock"></i></button>
          <button class="action-btn bg-green-100 text-green-700 approve-btn" data-id="${prescription.id}"><i class="fas fa-check"></i></button>
          <button class="action-btn bg-red-100 text-red-700 reject-btn" data-id="${prescription.id}"><i class="fas fa-times"></i></button>
        `,
      ]);
    });
    mainTable.draw();

    historyTable.clear();
    prescriptionsData.forEach((prescription, index) => {
      historyTable.row.add([
        index + 1,
        prescription.id,
        prescription.patient,
        prescription.doctor,
        prescription.date,
        `<span class="status-badge status-${prescription.status.toLowerCase()}">${prescription.status}</span>`,
      ]);
    });
    historyTable.draw();

    const totalOrders = prescriptionsData.length;
    const todaysOrders = prescriptionsData.filter((p) => p.date === "2023-11-15").length;
    const approvedOrders = prescriptionsData.filter((p) => p.status === "Approved" || p.status === "Dispensed").length;
    const rejectedOrders = prescriptionsData.filter((p) => p.status === "Rejected").length;

    $("#total-orders").text(totalOrders);
    $("#todays-orders").text(todaysOrders);
    $("#approved-orders").text(approvedOrders);
    $("#rejected-orders").text(rejectedOrders);
  }

  // Populate tables and notifications
  updateTableAndCounts(table, historyTable);

  notificationsTable.clear();
  notificationsData.forEach((notification) => {
    notificationsTable.row.add([notification.title, notification.message, notification.time]);
  });
  notificationsTable.draw();
});
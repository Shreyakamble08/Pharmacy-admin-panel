const toggleBtn = document.getElementById("toggleBtn");
const formSection = document.getElementById("formSection");
const sidePanel = document.getElementById("sidePanel");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const panelTitle = document.getElementById("panelTitle");
const panelDesc = document.getElementById("panelDesc");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

let isLogin = false;

// Show pop-up with message
function showPopup(title, message, isSuccess) {
  popupTitle.textContent = title;
  popupMessage.innerHTML = message; // Use innerHTML to render <br> tags
  popupTitle.classList.toggle("text-green-600", isSuccess);
  popupTitle.classList.toggle("text-red-600", !isSuccess);
  popup.classList.remove("hidden");
  popup.classList.add("show");

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    closePopupFn();
  }, 3000);
}

// Close pop-up
function closePopupFn() {
  popup.classList.remove("show");
  popup.classList.add("hidden");
}

// Toggle to login form
function switchToLogin() {
  isLogin = true;
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  formSection.style.transform = "translateX(100%)";
  sidePanel.style.transform = "translateX(-100%)";
  sidePanel.classList.remove("rounded-l-[100px]");
  sidePanel.classList.add("rounded-r-[100px]");
  panelTitle.textContent = "New to PharmaCare?";
  panelDesc.textContent = "Create an account to access our services";
  toggleBtn.textContent = "Register";

  // Clear errors and reset forms
  [signupForm, loginForm].forEach(form => {
    clearErrors(form);
    form.reset();
    form.querySelectorAll("input").forEach(input => {
      input.disabled = false;
      input.readOnly = false;
      input.style.pointerEvents = "auto";
    });
  });

  // Re-attach event handlers
  setupValidation();
  setupFormSubmission();
  setupTogglePassword();
}

// Attach close event to popup close button
closePopup.addEventListener("click", closePopupFn);

// Validation functions
function validateName(name) {
  if (!name) return "This field is required.";
  const nameRegex = /^[A-Za-z]{2,50}$/;
  return nameRegex.test(name) ? "" : "Must be 2–50 letters only.";
}

function validatePhone(phone) {
  if (!phone) return "This field is required.";
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone) ? "" : "Must be 10–15 digits, optionally starting with +.";
}

function validateEmail(email) {
  if (!email) return "This field is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Invalid email format.";
}

function validateUsername(username) {
  if (!username) return "This field is required.";
  const usernameRegex = /^[A-Za-z0-9_-]{3,20}$/;
  return usernameRegex.test(username) ? "" : "Must be 3–20 characters, alphanumeric with underscores or hyphens.";
}

function validatePassword(password) {
  if (!password) return "This field is required.";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return passwordRegex.test(password) ? "" : "Must be 8–20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).";
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "This field is required.";
  return password === confirmPassword ? "" : "Passwords do not match.";
}

// Real-time password strength feedback
function updatePasswordStrength(input) {
  const strengthDiv = input.closest("div").querySelector(".password-strength");
  if (!strengthDiv) return;

  const value = input.value;
  if (!value) {
    strengthDiv.classList.add("hidden");
    return;
  }

  strengthDiv.classList.remove("hidden");

  const checks = [
    { class: "strength-length", regex: /.{8,20}/, text: "8–20 characters" },
    { class: "strength-uppercase", regex: /[A-Z]/, text: "Uppercase letter" },
    { class: "strength-lowercase", regex: /[a-z]/, text: "Lowercase letter" },
    { class: "strength-number", regex: /\d/, text: "Number" },
    { class: "strength-special", regex: /[!@#$%^&*]/, text: "Special character (!@#$%^&*)" },
  ];

  checks.forEach(check => {
    const element = strengthDiv.querySelector(`.${check.class}`);
    const icon = element.querySelector("i");
    if (check.regex.test(value)) {
      icon.classList.remove("fa-times", "text-red-500");
      icon.classList.add("fa-check", "text-green-500");
    } else {
      icon.classList.remove("fa-check", "text-green-500");
      icon.classList.add("fa-times", "text-red-500");
    }
  });
}

// Clear errors
function clearErrors(form) {
  form.querySelectorAll(".error").forEach(error => {
    error.textContent = "";
    error.classList.add("hidden");
  });
  const passwordStrength = form.querySelector(".password-strength");
  if (passwordStrength) {
    passwordStrength.classList.add("hidden");
  }
}

// Toggle show/hide password
function setupTogglePassword() {
  const toggleButtons = document.querySelectorAll("#signupForm .toggle-password, #loginForm .toggle-password");
  toggleButtons.forEach((btn) => {
    btn.removeEventListener("click", btn._toggleHandler);
    btn._toggleHandler = (e) => {
      e.preventDefault();
      const wrapper = btn.closest("div");
      const input = wrapper.querySelector("input");
      const icon = btn.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    };
    btn.addEventListener("click", btn._toggleHandler);
  });
}

// Real-time validation
function setupValidation() {
  [signupForm, loginForm].forEach(form => {
    const inputs = form.querySelectorAll("input:not([type='checkbox'])");
    inputs.forEach(input => {
      input.removeEventListener("input", input._validationHandler);
      input._validationHandler = () => {
        const errorSpan = input.closest("div").querySelector(".error");
        let error = "";

        if (input.name === "firstName" || input.name === "lastName") {
          error = validateName(input.value);
        } else if (input.name === "phone") {
          error = validatePhone(input.value);
        } else if (input.name === "email") {
          error = validateEmail(input.value);
        } else if (input.name === "username") {
          error = validateUsername(input.value);
        } else if (input.name === "password" && form.id === "signupForm") {
          error = validatePassword(input.value);
          updatePasswordStrength(input);
          // Trigger confirm password validation if password changes
          const confirmInput = form.querySelector("input[name='confirmPassword']");
          if (confirmInput && confirmInput.value) {
            const confirmErrorSpan = confirmInput.closest("div").querySelector(".error");
            const confirmError = validateConfirmPassword(input.value, confirmInput.value);
            if (confirmErrorSpan) {
              confirmErrorSpan.textContent = confirmError;
              confirmErrorSpan.classList.toggle("hidden", !confirmError);
            }
          }
        } else if (input.name === "password" && form.id === "loginForm") {
          error = validatePassword(input.value);
        } else if (input.name === "confirmPassword") {
          const password = form.querySelector("input[name='password']").value;
          error = validateConfirmPassword(password, input.value);
        }

        if (errorSpan) {
          errorSpan.textContent = error;
          errorSpan.classList.toggle("hidden", !error);
        }
      };
      input.addEventListener("input", input._validationHandler);
      input._validationHandler();
    });
  });
}

// Form submission with validation
function setupFormSubmission() {
  [signupForm, loginForm].forEach(form => {
    form.removeEventListener("submit", form._submitHandler);
    form._submitHandler = (e) => {
      e.preventDefault();
      let isValid = true;
      let errors = [];

      clearErrors(form);

      const inputs = form.querySelectorAll("input:not([type='checkbox'])");
      let passwordValue = "";
      inputs.forEach(input => {
        const errorSpan = input.closest("div").querySelector(".error");
        let error = "";

        if (input.name === "firstName" || input.name === "lastName") {
          error = validateName(input.value);
        } else if (input.name === "phone") {
          error = validatePhone(input.value);
        } else if (input.name === "email") {
          error = validateEmail(input.value);
        } else if (input.name === "username") {
          error = validateUsername(input.value);
        } else if (input.name === "password") {
          error = validatePassword(input.value);
          passwordValue = input.value;
          if (form.id === "signupForm") {
            updatePasswordStrength(input);
          }
        } else if (input.name === "confirmPassword") {
          error = validateConfirmPassword(passwordValue, input.value);
        }

        if (error) {
          isValid = false;
          errors.push(error);
          if (errorSpan) {
            errorSpan.textContent = error;
            errorSpan.classList.remove("hidden");
          }
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector("button");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
          if (form.id === "signupForm") {
            showPopup(
              "Registration Successful",
              "Your account has been created! Please log in.",
              true
            );
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
            clearErrors(form);
            setTimeout(switchToLogin, 3000); // Switch to login after popup auto-dismisses
          } else {
            showPopup(
              "Login Successful",
              "Redirecting to your dashboard...",
              true
            );
            setTimeout(() => {
              window.location.href = "../Dashboard/dashboard.html";
            }, 3000); // Redirect after popup auto-dismisses
          }
        }, 1500);
      } else {
        showPopup(
          form.id === "loginForm" ? "Login Failed" : "Registration Failed",
          errors.join(" "),
          false
        );
      }
    };
    form.addEventListener("submit", form._submitHandler);
  });
}

// Form toggle
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;

  if (isLogin) {
    switchToLogin();
  } else {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    formSection.style.transform = "translateX(0)";
    sidePanel.style.transform = "translateX(0)";
    sidePanel.classList.remove("rounded-r-[100px]");
    sidePanel.classList.add("rounded-l-[100px]");
    panelTitle.textContent = "Welcome to PharmaCare!";
    panelDesc.textContent = "Manage your pharmacy with our professional admin tools";
    toggleBtn.textContent = "Login";

    // Clear errors and reset forms
    [signupForm, loginForm].forEach(form => {
      clearErrors(form);
      form.reset();
      form.querySelectorAll("input").forEach(input => {
        input.disabled = false;
        input.readOnly = false;
        input.style.pointerEvents = "auto";
      });
    });

    // Re-attach event handlers
    setupValidation();
    setupFormSubmission();
    setupTogglePassword();
  }
});

// Initialize functionality
document.addEventListener("DOMContentLoaded", () => {
  [signupForm, loginForm].forEach(form => {
    form.querySelectorAll("input").forEach(input => {
      input.disabled = false;
      input.readOnly = false;
      input.style.pointerEvents = "auto";
    });
  });

  setupTogglePassword();
  setupValidation();
  setupFormSubmission();
});

console.log("login.js loaded and initialized");
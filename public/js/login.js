document.addEventListener("DOMContentLoaded", function () {
  const signupFields = document.querySelectorAll(".signup-field");

  function toggleForm() {
      const formTitle = document.getElementById("form-title");
      const formElement = document.getElementById("login-form"); // Get the form element

      if (formTitle.textContent === "Login") {
          formTitle.textContent = "Sign Up";
          document.querySelector('label[for="customSwitch1"]').textContent = "Switch to Login";
          signupFields.forEach((field) => (field.style.display = "block"));
          formElement.action = "api/users"; // Set action for sign up

          // Update hidden field value to sign-up
          document.getElementById("form-action").value = "signup";
      } else {
          formTitle.textContent = "Login";
          document.querySelector('label[for="customSwitch1"]').textContent = "Switch to Sign Up";
          signupFields.forEach((field) => (field.style.display = "none"));
          formElement.action = "api/users/login"; // Set action for login

          // Update hidden field value to login
          document.getElementById("form-action").value = "login";
      }
  }

  function setInitialState() {
    const formTitle = document.getElementById("form-title");
    const formElement = document.getElementById("login-form");

    formTitle.textContent = "Login";
    document.querySelector('label[for="customSwitch1"]').textContent = "Switch to Sign Up";
    signupFields.forEach((field) => (field.style.display = "none"));
    formElement.action = "api/users/login";

    // Set hidden field value to login
    document.getElementById("form-action").value = "login";
}

setInitialState();
  // Handle switch toggle
  document.getElementById('customSwitch1').addEventListener('change', toggleForm);

  // Handle form submission
  document.getElementById("login-form").addEventListener("submit", function (event) {
      const action = document.getElementById("form-action").value;

      if (action === "signup") {
          const password = document.getElementById("password").value;
          const confirmPassword = document.getElementById("confirm-password").value;

          if (password !== confirmPassword) {
              alert("Passwords do not match!");
              event.preventDefault(); // prevent form submission
          }
      }
  });

  console.log("Initial state of signup fields:", signupFields[0].style.display);
});



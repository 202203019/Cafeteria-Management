// Get the switch page link
const switchPageLink = document.querySelector(".switch-page a");

// Get the form container
const formContainer = document.querySelector(".form-container");

// Add a click event listener to the link
switchPageLink.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.classList.add("rotate"); // Add the rotation class
    // After a delay, navigate to the new page
    setTimeout(function () {
        window.location.href = switchPageLink.href;
    }, 500); // Adjust the delay time to match the transition time
});

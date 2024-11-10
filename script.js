document.getElementById("generateResume").addEventListener("click", generateResume);
document.getElementById("resumeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    generateResume();
});
function generateResume() {
    // Hide the form and show the resume container
    document.getElementById("formContainer").classList.add("hidden");
    document.getElementById("resumeContainer").classList.remove("hidden");
    // Get user inputs
    var name = document.getElementById("name").value;
    var title = document.getElementById("title").value;
    var summary = document.getElementById("summary").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var educationDetails = document.getElementById("education").value.split("\n");
    var experienceDetails = document.getElementById("experience").value.split("\n");
    var skills = document.getElementById("skills").value.split(',').map(function (skill) { return skill.trim(); });
    var languages = document.getElementById("languages").value.split(',').map(function (language) { return language.trim(); });
    // Profile Picture
    var profilePicUrl = "path/to/default-image.jpg"; // Default image
    var profilePicInput = document.getElementById("profilePic");
    if (profilePicInput.files && profilePicInput.files[0]) {
        profilePicUrl = URL.createObjectURL(profilePicInput.files[0]);
    }
    // Populate the resume container with the data
    document.getElementById("resumeContainer").innerHTML = "\n        <div class=\"sidebar\">\n            <img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\">\n            <h2>Contact</h2>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n            <h2>Education</h2>\n            <ul>").concat(educationDetails.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n            <h2>Expertise</h2>\n            <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n            <h2>Languages</h2>\n            <p>").concat(languages.join(", "), "</p>\n        </div>\n        <div class=\"main-content\">\n            <h1>").concat(name, "</h1>\n            <p class=\"title\">").concat(title, "</p>\n            <p class=\"summary\">").concat(summary, "</p>\n            <h2>Experience</h2>\n            <ul>").concat(experienceDetails.map(function (item) { return "<li>".concat(item, "</li>"); }).join(''), "</ul>\n        </div>\n    ");
}

import jsPDF from "jspdf";

document.getElementById("generateResume")?.addEventListener("click", generateResume);

function generateResume(): void {
    const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const title = (document.getElementById("title") as HTMLInputElement).value.trim();
    const summary = (document.getElementById("summary") as HTMLTextAreaElement).value.trim();
    const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const address = (document.getElementById("address") as HTMLInputElement).value.trim();
    const education = (document.getElementById("education") as HTMLTextAreaElement).value.trim();
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",").map(skill => skill.trim());
    const languages = (document.getElementById("languages") as HTMLInputElement).value.split(",").map(language => language.trim());

    if (!name || !title || !email || !phone || !address || !profilePicInput.files || profilePicInput.files.length === 0) {
        alert("Please fill in all required fields and upload a profile picture.");
        return;
    }

    const profilePicUrl = URL.createObjectURL(profilePicInput.files[0]);

    document.getElementById("formContainer")?.classList.add("hidden");
    const resumeContainer = document.getElementById("resumeContainer") as HTMLElement;
    resumeContainer.classList.remove("hidden");

    resumeContainer.innerHTML = `
        <div class="sidebar">
            <img src="${profilePicUrl}" alt="Profile Picture">
            <h2>Contact</h2>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Expertise</h2>
            <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            <h2>Languages</h2>
            <p>${languages.join(", ")}</p>
        </div>
        <div class="main-content">
            <h1>${name}</h1>
            <p class="title">${title}</p>
            <p class="summary">${summary}</p>
            <h2>Experience</h2>
            <div class="experience">${experience}</div>
        </div>
    `;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "resume-buttons";
    buttonsContainer.innerHTML = `
        <button id="editResume">Edit</button>
        <button id="downloadResume">Download as PDF</button>
        <button id="shareResume">Share</button>
    `;
    resumeContainer.appendChild(buttonsContainer);

    document.getElementById("editResume")?.addEventListener("click", editResume);
    document.getElementById("downloadResume")?.addEventListener("click", downloadAsPDF);
    document.getElementById("shareResume")?.addEventListener("click", shareResume);
}

function editResume(): void {
    document.getElementById("formContainer")?.classList.remove("hidden");
    document.getElementById("resumeContainer")?.classList.add("hidden");
}

function downloadAsPDF(): void {
    const doc = new jsPDF();
    doc.html(document.getElementById("resumeContainer") as HTMLElement, {
        callback: function (pdf) {
            pdf.save("resume.pdf");
        },
        x: 10,
        y: 10,
        autoPaging: "text",
    });
}

function shareResume(): void {
    const shareableLink = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
        alert("Resume link copied to clipboard!");
    });
}

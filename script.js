const projects = [
    { 
        name: "Dashboard", 
        description: "My UX research led to the $2 millions in additional funding from the Nationa Cancer Institute.", 
        image: "img/cansera.png"
    },
    { 
        name: "Cancer App", 
        description: "Predict your symptoms for specific calendar days to plan your life's special events. ", 
        image: "img/infusion.png"
    },
    { 
        name: "Ring", 
        description: "I led the marketing launch for Shiffon's best-selling product, the Duet Pinky Ring.", 
        image: "img/shiffon.jpeg"
    }
];

function displayProjects() {
    const buttonContainer = document.getElementById('project-buttons');
    projects.forEach((project, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => showProject(index);
        buttonContainer.appendChild(dot);
    });
    // Show the first project by default
    showProject(0);
}

function showProject(index) {
    const project = projects[index];
    const displayElement = document.getElementById('project-display');
    displayElement.innerHTML = `
        <h2>${project.name}</h2>
        <img src="${project.image}" alt="${project.name}">
        <p>${project.description}</p>
    `;

    // Update active dot
    const dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[index].className += " active";
}

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (validateForm(name, email, message)) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        clearForm();
    }
}

function validateForm(name, email, message) {
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Initialize the page
displayProjects();
const projects = [
    { 
        name: "Unpretentious", 
        description: "Stay casual but use clear diction. Mcdonald's is loved across cultures, so inclusion is a priority.", 
        image: "img/cansera.png"
    },
    { 
        name: "Lighthearted", 
        description: "Use playful language to affirm choices and create positive, memorable interactions with the customer.", 
        image: "img/infusion.png"
    },
    { 
        name: "Approachable", 
        description: "Always be ready to help and never judge. Offer suggestions to help guide the customer. ", 
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
        <h1>${project.name}</h1>
        <p>${project.description}</p>
        <img src="${project.image}" alt="${project.name}">
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
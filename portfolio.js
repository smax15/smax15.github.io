/*ANIMATIONS*/

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const observerM = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show-message');
        }
    });
});
const hiddenElementsleft = document.querySelectorAll('.hidden-left');
hiddenElementsleft.forEach((el) => observer.observe(el));
const hiddenElementsup = document.querySelectorAll('.hidden-up');
hiddenElementsup.forEach((el) => observer.observe(el));
const hiddenElementsright = document.querySelectorAll('.message-right');
hiddenElementsright.forEach((el) => observer.observe(el));
const hiddenElementsmessage = document.querySelectorAll('.hidden-message');
hiddenElementsmessage.forEach((el) => observerM.observe(el));

/*VIDEO*/

const video = document.querySelector("#voiceflow-video");
const playButton=document.getElementById("playbutton");

// Add 'play' class when video starts playing
video.addEventListener("play", () => {
  console.log("Video is playing");
  video.classList.add('play');
  playButton.classList.add('playbutton-hidden');
});

// Remove 'play' class when video is paused
video.addEventListener("pause", () => {
  console.log("Video is paused");
  video.classList.remove('play');
  playButton.classList.remove('playbutton-hidden');
});

// Optional: Function to play the video
function playVideo() {
  video.play();
}

// Optional: Function to pause the video
function pauseVideo() {
  video.pause();
}

/*MAKE CAROUSEL*/

const projects = [
    { 
        name: "Unpretentious", 
        description: "Stay casual but use clear diction. Mcdonald's is loved across cultures, so inclusion is a priority.", 
        div:"Nice! Our fries are iconic."
    },
    { 
        name: "Lighthearted", 
        description: "Use playful language to affirm choices and create positive, memorable interactions with the customer.", 
        div:"Nice! Our fries are iconic."
    },
    { 
        name: "Approachable", 
        description: "Always be ready to help and never judge. Offer suggestions to help guide the customer. ", 
        div:"Hello there! I'm the McDonald's assistant. How can I help you today? <i>Check out deals. See the menu.</i>"
    }
];

function displayProjects() {
    const buttonContainer = document.getElementById('project-buttons');
    projects.forEach((project, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => showProject(index);
        buttonContainer.appendChild(dot);
    })
    // Show the first project by default
    showProject(0);
}

function showProject(index) {
    const project = projects[index];
    const displayElement = document.getElementById('project-display');
    displayElement.innerHTML = `
        <h1>${project.name}</h1>
        <p>${project.description}</p>
        <div>${project.div}</div>
    `;

    // Update active dot
    const dots = document.getElementsByClassName('dot');
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[index].className += " active";
}
// Initialize the page
displayProjects();
pauseVideo();
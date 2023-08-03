// Toggle the visible project when the forward or back button is clicked

const displayToggle = (id) => {
    const element = document.getElementById(id);
    const elementClassList = element.classList;
    
    if (elementClassList.contains("project-visible")) {
        element.classList.replace("project-visible", "project-hidden")
    } else {
        element.classList.replace("project-hidden", "project-visible")
    };
};
  
// Remove start from class so animation not triggered 

const removeStart = (id) => {
    document.getElementById(id).classList.remove("start");
};

// Using currentProjectId variable if sessionStorage not available.

let currentProjectId = "bird";


const handleProjectBackClick = () => {
    switch (sessionStorage.getItem("currentProjectId")) {
        case "bird": 
            removeStart("bird");
            displayToggle("bird");
            displayToggle("gta");
            sessionStorage.setItem("currentProjectId", "gta");
            break;

        case "reddit":
            removeStart("reddit");
            displayToggle("reddit");
            displayToggle("bird");
            sessionStorage.setItem("currentProjectId", "bird");
            break;

        case "gta":
            removeStart("gta");
            displayToggle("gta");
            displayToggle("reddit");
            sessionStorage.setItem("currentProjectId", "reddit");
            break;
    };
};

const handleProjectForwardClick = () => {
    switch (sessionStorage.getItem("currentProjectId")) {
        case "bird":
            removeStart("bird");
            displayToggle("bird");
            displayToggle("reddit");
            sessionStorage.setItem("currentProjectId", "reddit");
            break;
            
        case "reddit":
            removeStart("reddit");
            displayToggle("reddit");
            displayToggle("gta");
            sessionStorage.setItem("currentProjectId", "gta");
            break;

        case "gta":
            removeStart("gta");
            displayToggle("gta");
            displayToggle("bird");
            sessionStorage.setItem("currentProjectId", "bird");
            break;
    }
};

// Loads next project when forward or back button clicked

document.getElementById("project-forward-button").addEventListener("click", () => handleProjectForwardClick());

document.getElementById("project-back-button").addEventListener("click", () => handleProjectBackClick());

// Current project always starts with It's A Bird which is stored. Load project page based on session storage project id.  Add start to current ID's class to trigger animation.

window.onload = () => {
    const currentProjectSet = sessionStorage.getItem("currentProjectId");

    if (currentProjectSet) {
        displayToggle(currentProjectSet);
        document.getElementById(currentProjectSet).classList.add("start");
    } else {
        sessionStorage.setItem("currentProjectId", "bird");
        displayToggle("bird");
        document.getElementById("bird").classList.add("start");
    }; 
};

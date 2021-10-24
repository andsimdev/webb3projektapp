"use strict";

// URL för de olika webbtjänsterna
const studurl = "http://localhost/webbutveckling3/projekt/api/studiesapi.php";
const empurl = "http://localhost/webbutveckling3/projekt/api/employmentsapi.php";
const weburl = "http://localhost/webbutveckling3/projekt/api/websitesapi.php";

// HTML-element
const websitescontainerEl = document.getElementById("websitescontainer");
const studiescontainerEl = document.getElementById("studiescontainer");
const employmentscontainerEl = document.getElementById("employmentscontainer");
const navEl = document.getElementById("nav");
const navulEl = document.getElementById("navul");

// Kör initieringsfunktionen då webbplatsen laddats
window.onload = init();

function init() {
    // Kör funktionen för att skriva ut portfolio-datan
    printPortfolio();

    // Kör funktionen för att skriva ut utbildnings-datan
    printStudies();

    // Kör funktionen för att skriva ut arbets-datan
    printEmployments();
}

// Funktion för att skriva ut all portfoliodata
function printPortfolio() {
    // Rensa portfoliodatan
    websitescontainerEl.innerHTML = "";

    // Hämta data från webbtjänsten
    fetch(weburl)
        .then((res) => res.json())
        .then((data) => {
            // Loopa igenom all data
            data.forEach(website => {
                websitescontainerEl.innerHTML +=
                    `
                <div class="websitediv">
                <img src="http://localhost/webbutveckling3/projekt/api/${website.siteimage}" alt="" class="websiteimg">
                <h2>${website.sitetitle}</h2>
                <a href="${website.siteurl}">Länk - läs mer</a>
                </div>
                `
            })
        })
        // Fånga och skriv ut eventuella fel till konsolen
        .catch(error => console.log(error));
}

// Funktion för att skriva ut alla utbildningar
function printStudies() {
    // Rensa studiedatan
    studiescontainerEl.innerHTML = "";

    // Hämta data från webbtjänsten
    fetch(studurl)
        .then((res) => res.json())
        .then((data) => {
            // Loopa igenom all data
            data.forEach(studies => {
                studiescontainerEl.innerHTML +=
                    `
                    <div>
                    <h3>${studies.studtitle}</h3>
                    <p>${studies.university}, från ${studies.studstartdate} till ${studies.studenddate}</p>
                </div>
                `
            })
        })
        // Fånga och skriv ut eventuella fel till konsolen
        .catch(error => console.log(error));
}

// Funktion för att skriva ut alla arbeten
function printEmployments() {
    // Rensa arbetslistan
    employmentscontainerEl.innerHTML = "";

    // Hämta data från webbtjänsten
    fetch(empurl)
        .then((res) => res.json())
        .then((data) => {
            // Loopa igenom all data
            data.forEach(employment => {
                employmentscontainerEl.innerHTML +=
                    `
                    <div>
                    <h3>${employment.emptitle}</h3>
                    <p>${employment.empplace}, från ${employment.empstartdate} till ${employment.empenddate}</p>
                </div>
                `
            })
        })
        // Fånga och skriv ut eventuella fel till konsolen
        .catch(error => console.log(error));    
}

// Funktion för att visa/dölja menyn
function toggleMenu() {
    console.log("Kör toggleMenu...");

    if(navulEl.style.display != "none") {
        navulEl.style.display = "none";
        navEl.style.padding = "0";
        navEl.style.boxShadow = "none";
    } else if (navulEl.style.display == "none") {
        navulEl.style.display = "flex";
        navEl.style.paddingLeft = "3%";
        navEl.style.paddingBottom = "3%";
        navEl.style.boxShadow = "0px 0px 15px 1px grey";
    }

}
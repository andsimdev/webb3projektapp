"use strict";

// URL för de olika webbtjänsterna
const rooturl = "https://studenter.miun.se/~sian2001/writeable/dt173g/projekt/api/";
const studurl = "https://studenter.miun.se/~sian2001/writeable/dt173g/projekt/api/studiesapi.php";
const empurl = "https://studenter.miun.se/~sian2001/writeable/dt173g/projekt/api/employmentsapi.php";
const weburl = "https://studenter.miun.se/~sian2001/writeable/dt173g/projekt/api/websitesapi.php";

// HTML-element
const websitescontainerEl = document.getElementById("websitescontainer");
const studiescontainerEl = document.getElementById("studiescontainer");
const employmentscontainerEl = document.getElementById("employmentscontainer");
const navEl = document.getElementById("nav");
const navulEl = document.getElementById("navul");
const menuiconEl = document.getElementById("menuicon");
const heroimgdivcontainerEl = document.getElementById("heroimgdivcontainer");

// Kör initieringsfunktionen då webbplatsen laddats
window.onload = init();

function init() {
    // Kör funktionen för att skriva ut hero-bilder
    printHero();

    // Kör funktionen för att skriva ut portfolio-datan
    printPortfolio();

    // Kör funktionen för att skriva ut utbildnings-datan
    printStudies();

    // Kör funktionen för att skriva ut arbets-datan
    printEmployments();
}

// Funktion för att skriva ut hero-bilder
function printHero() {
    // Rensa bilder
    heroimgdivcontainerEl.innerHTML = "";

    // Hämta data från webbtjänsten
    fetch(weburl)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log(data[0].siteimage);
            heroimgdivcontainerEl.innerHTML +=
                `
                    <div class="heroimgdivcolumn">
                        <img src="${rooturl}${data[0].siteimage}" alt="">
                        <img src="${rooturl}${data[1].siteimage}" alt="">
                        <img src="${rooturl}${data[2].siteimage}" alt="">
                    </div>
                    <div class="heroimgdivcolumn">
                        <img src="${rooturl}${data[3].siteimage}" alt="">
                        <img src="${rooturl}${data[4].siteimage}" alt="">
                    </div>
                    <div class="heroimgdivcolumn">
                        <img src="${rooturl}${data[5].siteimage}" alt="">
                    </div>
                `
        })
        // Fånga och skriv ut eventuella fel till konsolen
        .catch(error => console.log(error));

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
                <img src="${rooturl}${website.siteimage}" alt="" class="websiteimg">
                <h2>${website.sitetitle}</h2>
                <p>${website.sitedesc}</p>
                <a href="${website.siteurl}">Besök ${website.sitetitle}</a>
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

    if (navulEl.style.display != "none") {
        navulEl.style.display = "none";
        navEl.style.padding = "0";
        navEl.style.boxShadow = "none";
        menuiconEl.src = "images/menu.svg";
    } else if (navulEl.style.display == "none") {
        navulEl.style.display = "flex";
        navEl.style.paddingLeft = "3%";
        navEl.style.paddingBottom = "3%";
        navEl.style.boxShadow = "0px 0px 10px 1px grey";
        menuiconEl.src = "images/closemenu.svg";
    }

}
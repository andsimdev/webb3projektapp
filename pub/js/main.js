"use strict";var studurl="http://localhost/webbutveckling3/projekt/api/studiesapi.php",empurl="http://localhost/webbutveckling3/projekt/api/employmentsapi.php",weburl="http://localhost/webbutveckling3/projekt/api/websitesapi.php",websitescontainerEl=document.getElementById("websitescontainer"),studiescontainerEl=document.getElementById("studiescontainer"),employmentscontainerEl=document.getElementById("employmentscontainer"),navEl=document.getElementById("nav"),navulEl=document.getElementById("navul");function init(){printPortfolio(),printStudies(),printEmployments()}function printPortfolio(){websitescontainerEl.innerHTML="",fetch(weburl).then((function(n){return n.json()})).then((function(n){n.forEach((function(n){websitescontainerEl.innerHTML+='\n                <div class="websitediv">\n                <img src="http://localhost/webbutveckling3/projekt/api/'.concat(n.siteimage,'" alt="" class="websiteimg">\n                <h2>').concat(n.sitetitle,'</h2>\n                <a href="').concat(n.siteurl,'">Länk - läs mer</a>\n                </div>\n                ')}))})).catch((function(n){return console.log(n)}))}function printStudies(){studiescontainerEl.innerHTML="",fetch(studurl).then((function(n){return n.json()})).then((function(n){n.forEach((function(n){studiescontainerEl.innerHTML+="\n                    <div>\n                    <h3>".concat(n.studtitle,"</h3>\n                    <p>").concat(n.university,", från ").concat(n.studstartdate," till ").concat(n.studenddate,"</p>\n                </div>\n                ")}))})).catch((function(n){return console.log(n)}))}function printEmployments(){employmentscontainerEl.innerHTML="",fetch(empurl).then((function(n){return n.json()})).then((function(n){n.forEach((function(n){employmentscontainerEl.innerHTML+="\n                    <div>\n                    <h3>".concat(n.emptitle,"</h3>\n                    <p>").concat(n.empplace,", från ").concat(n.empstartdate," till ").concat(n.empenddate,"</p>\n                </div>\n                ")}))})).catch((function(n){return console.log(n)}))}function toggleMenu(){console.log("Kör toggleMenu..."),"none"!=navulEl.style.display?(navulEl.style.display="none",navEl.style.padding="0",navEl.style.boxShadow="none"):"none"==navulEl.style.display&&(navulEl.style.display="flex",navEl.style.paddingLeft="3%",navEl.style.paddingBottom="3%",navEl.style.boxShadow="0px 0px 15px 1px grey")}window.onload=init();
//# sourceMappingURL=../maps/main.js.map
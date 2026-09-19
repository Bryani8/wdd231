const url = 'data/members.json';
const display = document.querySelector("#directory-cards");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

async function getCompaniesData() {
        const response = await fetch(url);
        const data = await response.json();
        displayCompanies(data);
}

function displayCompanies(companyList) {
    display.innerHTML = '';
    
    companyList.forEach(company => {
        const section = document.createElement('section');

        section.innerHTML = `
            <h3>${company.companyName}</h3>
            <img src="images/${company.imageFileName}" alt="${company.companyName}" loading="lazy">
            <div>
            <p><strong>PHONE:</strong>${company.companyPhoneNumber}</p>
            <p><strong>URL:</strong>${company.companyWebsiteUrl}</p>
         
            </div>
        `;
        display.appendChild(section);
    });
}


function displayCompanies(companyList) {
    display.innerHTML = '';
    
    companyList.forEach(company => {
        const section = document.createElement('section');

        section.innerHTML = `
            <h3>${company.companyName}</h3>
            <img src="${company.imageFileName}" alt="${company.companyName}" loading="lazy">
            <div class="info-container">
                <p>${company.companyPhoneNumber}</p>
                <p>${company.companyWebsiteUrl}</p>
            </div>
        `;

        display.appendChild(section);
    });
}

if (display) {
    display.classList.add("grid");
    getCompaniesData();

    if (gridbutton && listbutton) {
        gridbutton.addEventListener("click", () => {
            display.classList.add("grid");
            display.classList.remove("list");
        });

        listbutton.addEventListener("click", () => {
            display.classList.add("list");
            display.classList.remove("grid");
        });
    }
}
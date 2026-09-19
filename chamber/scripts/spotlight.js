const url = 'data/members.json';
const members = [];

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const allMembers = await response.json();
            const spotlightMembers = allMembers.filter(member => member.membershipLevel === 1  || member.membershipLevel === 2);
            for (let i = 0; i <= 1; i++) {
                const randomMember = getRandomMember(spotlightMembers);
                members.push(randomMember);
            }

            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Failed loading spotlight members: ', error);
    }
}

function getRandomMember(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function displaySpotlights(members) {
    const spotlightContainer = document.querySelector('#spotlight-container');
    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight');

        card.innerHTML = `
            <img src="${member.imageFileName}" alt="${member.companyName}" loading="lazy">
            <h3>${member.companyName}</h3>
            <p class="membership-level">Level: ${member.membershipLevel}</p>
            <p><strong>Phone: </strong>${member.companyPhoneNumber}</p>
            <p><strong>Address </strong>${member.companyAddress}</p>
            <p><a href="${member.companyWebsiteUrl}" target="_blank" rel=noopener>Visit</a></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", getMembers);
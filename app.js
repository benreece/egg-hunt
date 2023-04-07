const eggData = getEggData();
const pageWrap = document.getElementById('page-wrap');
const eggContainer = document.getElementById('egg-container');
let foundEggs = [];
let currentIndex = null;

for (let i = 0; i < eggData.length; i++) {
    const egg = eggData[i];
    const img = document.createElement('img');
    img.setAttribute('id', `egg-${i}`);
    img.setAttribute('src', egg.image);
    img.addEventListener('click', () => {
        showModal(i);
    });

    const eggLabel = document.createElement('div');
    eggLabel.setAttribute('id', `egg-label-${i}`);
    eggLabel.classList.add('egg-label');
    eggLabel.classList.add('hidden');
    eggLabel.textContent = egg.letter;

    const eggOverlay = document.createElement('div');
    eggOverlay.classList.add('egg-overlay');
    eggOverlay.appendChild(img);
    eggOverlay.appendChild(eggLabel);

    eggContainer.appendChild(eggOverlay);
}

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClue = document.getElementById('clue');
const modalResponse = document.getElementById('response');
const foundItBtn = document.getElementById('found-it-btn');
const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', hideModal);
foundItBtn.addEventListener('click', checkLocation);

storedEggs = JSON.parse(window.localStorage.getItem("foundEggs"));
if (Array.isArray(storedEggs)) {
    storedEggs.forEach(index => addFoundEgg(index));
}

function showModal(index) {
    stopAudio();

    const egg = eggData[index];
    pageWrap.classList.add('blurry');
    currentIndex = index;

    modalImg.setAttribute('src', egg.image);

    if (egg.found) {
        showSuccess(index);
        modalClue.classList.add('hidden');
        modalResponse.classList.remove('hidden');
        foundItBtn.classList.add('hidden');
    } else {
        modalClue.innerHTML = '<b>Clue:</b> ' + eggData[index].clue;
        modalClue.classList.remove('hidden');
        modalResponse.classList.add('hidden');
        foundItBtn.classList.remove('hidden');
    }

    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
    pageWrap.classList.remove('blurry');
    currentIndex = null;
    stopAudio();
}

function hideClue() {
    modalClue.classList.add('hidden');
}

function showResponse(message) {
    foundItBtn.classList.add('hidden');
    modalResponse.classList.remove('hidden');
    modalResponse.innerHTML = message;
}

function showError(distance) {
    modalResponse.classList.add('error');
    modalResponse.classList.remove('success');
    showResponse(`Sorry, you're still about ${parseFloat(distance.toPrecision(2))} meters away. Keep looking!`);
    setTimeout(hideResponse, 5000, currentIndex);
}

function showSuccess() {
    modalResponse.classList.add('success');
    modalResponse.classList.remove('error');
    foundItBtn.classList.add('hidden');
    showResponse(`You found the egg!<p>Inside you find this secret character:</p><p style="font-size: 2em; font-weight: bold;">${eggData[currentIndex].letter}</p><hr><p>${eggData[currentIndex].response}</p>`);
}

function hideResponse(index) {
    if (index == currentIndex) {
        modalResponse.classList.add('hidden');
        foundItBtn.classList.remove('hidden');
    }
}

function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const egg = eggData[currentIndex];
            const distance = getDistanceInMeters(position.coords.latitude, position.coords.longitude, egg.location.lat, egg.location.lng);
            if (distance <= 10) {
                addFoundEgg(currentIndex);
                storeFoundEggs();
                hideClue();
                showSuccess();
            } else {
                showError(distance);
            }
        }, null, {'enableHighAccuracy': true});
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function addFoundEgg(index) {
    foundEggs.push(index);
    eggData[index].found = true;
    document.getElementById(`egg-label-${index}`).classList.remove('hidden');
    const eggImg = document.getElementById(`egg-${index}`);
    eggImg.classList.add('found');
}

function storeFoundEggs() {
    window.localStorage.setItem("foundEggs", JSON.stringify(foundEggs));
}

function clearFoundEggs() {
    window.localStorage.removeItem("foundEggs", foundEggs);
    window.location.reload();
}

function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}

function playAudio(source) {
    audio = document.getElementById('audio');
    audio.src = source;
    audio.play();
}

function stopAudio() {
    audio = document.getElementById('audio');
    audio.pause();
}

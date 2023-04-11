const LOCATION_RADIUS_METERS = 20;
const MIN_ACCURACY_THRESHOLD = 20;

const puzzleData = getPuzzleData();
const eggData = puzzleData['eggs'];
const pageWrap = document.getElementById('page-wrap');
const eggContainer = document.getElementById('egg-container');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClue = document.getElementById('clue');
const modalResponse = document.getElementById('response');
const foundItBtn = document.getElementById('found-it-btn');
const closeBtn = document.getElementById('close-btn');

let foundEggs = [];
let currentIndex = null;

now = new Date();
if (puzzleData['start_time']) {
    startTime = new Date(puzzleData['start_time']);
} else {
    startTime = new Date('2000-01-01');
}

if (startTime <= now) {
    initEggHunt();
} else {
    initTimer();
}

document.getElementById('title').innerHTML = puzzleData.title ?? '';

function initTimer() {
    help = document.getElementById('help').classList.add('hidden');
    timer = document.getElementById('egg-container');
    timer.classList.add('timer');

    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = startTime - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        window.location.reload();
      }
    }, 1000);
}

function initEggHunt() {

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

    closeBtn.addEventListener('click', hideModal);
    foundItBtn.addEventListener('click', checkLocation);

    storedEggs = JSON.parse(window.localStorage.getItem(getStorageKey()));
    if (Array.isArray(storedEggs)) {
        storedEggs.forEach(index => addFoundEgg(index));
    }

    if (allCluesFound()) {
        showMessage(puzzleData.end_clue);
    } else {
        showMessage(puzzleData.start_clue);
    }
}

function allCluesFound() {
    var allFound = true;
    eggData.forEach((egg) => { if (!egg.found) allFound = false; });
    return allFound;
}

function showMessage(text) {
    const messageModal = document.getElementById('message-modal');
    const message = document.getElementById('message');
    message.innerHTML = text;
    pageWrap.classList.add('blurry');
    messageModal.classList.remove('hidden');
}

function closeMessage() {
    const messageModal = document.getElementById('message-modal');
    messageModal.classList.add('hidden');
    pageWrap.classList.remove('blurry');
}

function showModal(index) {
    closeMessage();
    stopAudio();

    const egg = eggData[index];
    pageWrap.classList.add('blurry');
    currentIndex = index;

    modalImg.setAttribute('src', egg.image);
    document.getElementById('btn-spinner').classList.add('hidden');
    foundItBtn.classList.remove('disabled');

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

function showError(distance, accuracy) {
    modalResponse.classList.add('error');
    modalResponse.classList.remove('success');
    if (accuracy > MIN_ACCURACY_THRESHOLD) {
        hideClue();
        showResponse(`<p>ERROR: We can't tell if you're close to the egg!  We're only able to locate you to within about ${parseFloat(accuracy.toPrecision(2))} meters (we need accuracy to ${MIN_ACCURACY_THRESHOLD} meters).<p>Do you have high accuracy mode enabled on your device?`);
    } else {
        showResponse(`Sorry, you're still about ${parseFloat(distance.toPrecision(2))} meters away. Keep looking!`);
        setTimeout(hideResponse, 5000, currentIndex);
    }
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
    document.getElementById('btn-spinner').classList.add('hidden');
    foundItBtn.classList.remove('disabled');
}

function checkLocation() {
    // add loading indicator to button & disable it
    document.getElementById('btn-spinner').classList.remove('hidden');
    foundItBtn.classList.add('disabled');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const egg = eggData[currentIndex];
            const distance = getDistanceInMeters(position.coords.latitude, position.coords.longitude, egg.location.lat, egg.location.lng);
            if (distance <= LOCATION_RADIUS_METERS && position.coords.accuracy <= MIN_ACCURACY_THRESHOLD) {
                addFoundEgg(currentIndex);
                storeFoundEggs();
                hideClue();
                showSuccess();
            } else {
                showError(distance, position.coords.accuracy);
            }
        }, null, {enableHighAccuracy: true});  // TODO: add error handler
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
    window.localStorage.setItem(getStorageKey(), JSON.stringify(foundEggs));
}

function clearFoundEggs() {
    window.localStorage.removeItem(getStorageKey(), foundEggs);
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

function getKey() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    return params.key;
}

function getStorageKey() {
    return `foundEggs-${getKey()}`;
}

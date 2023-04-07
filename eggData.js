const allEggData = {
    'BYU': [
        {
            clue: "The box the temple came in",
            location: { lat: 40.251878, lng: -111.649433 },
            image: "egg1.png",
            letter: "7",
            found: false,
        },
        {
            clue: "MOA sculptures",
            location: { lat: 40.249753, lng: -111.649158 },
            image: "egg2.png",
            letter: "9",
            found: false,
        },
        {
            clue: "Bell tower",
            location: { lat: 40.250813, lng: -111.651701 },
            image: "egg3.png",
            letter: "2",
            found: false,
        },
        {
            clue: "Bean museum",
            location: { lat: 40.251858, lng: -111.651048 },
            image: "egg4.png",
            letter: "4",
            found: false,
        },
        {
            clue: "Wilkinson Center",
            location: { lat: 40.250465, lng: -111.651357 },
            image: "egg5.png",
            letter: "+",
            found: false,
        },
        {
            clue: "Quad",
            location: { lat: 40.2565, lng: -111.7018 },
            image: "egg6.png",
            letter: "2",
            found: false,
        },
        {
            clue: "Easter Egg",
            location: { lat: 40.2565, lng: -111.7018 },
            image: "egg7.png",
            letter: "J",
            found: false,
        },
    ],
    'Parkway': [
        {
            clue: "He's a stake president, but not ours.  He teaches piano.  That's right -- it's the Jensens!",
            location: { lat: 40.247843, lng: -111.710551 },
            image: "egg1.png",
            letter: "6",
            found: false,
        },
        {
            clue: "The Bishop lives here",
            location: { lat: 40.247853, lng: -111.709065 },
            image: "egg2.png",
            letter: "7",
            found: false,
        },
        {
            clue: "You might _Know_ where this past, aquatic bishop lives... 'cause he has a Finn... get it?!  Ha!",
            location: { lat: 40.249505, lng: -111.712383 },
            image: "egg3.png",
            letter: "X",
            found: false,
        },
        {
            clue: "Borther!",
            location: { lat: 40.247700, lng: -111.713356 },
            image: "egg4.png",
            letter: "P",
            found: false,
        },
        {
            clue: "Wooma!",
            location: { lat: 40.246934, lng: -111.710235 },
            image: "egg5.png",
            letter: "+",
            found: false,
        },
        {
            clue: "Deck destroyers",
            location: { lat: 40.246936, lng: -111.709961 },
            image: "egg6.png",
            letter: "F",
            found: false,
        },
        {
            clue: "Diminutive choir leaders live here",
            location: { lat: 40.247850, lng: -111.710849 },
            image: "egg7.png",
            letter: "M",
            found: false,
        },
        {
            clue: "Some really Good people live here",
            location: { lat: 40.249492, lng: -111.712181 },
            image: "egg8.png",
            letter: "J",
            found: false,
        },
    ],
}

function getEggData() {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        return allEggData[params.key];
}

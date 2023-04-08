const allEggData = {
    'BYU': [
        {
            clue: "During the final week of His ministry the Savior cleansed the temple.<p>BYU's business school is in a building sometimes called 'the box the temple came in' due to its similar shape to the Salt Lake temple.</p><p>Latter-day temples often have 'Holiness to the Lord, The House of the Lord' written on the side; on most temples this inscription faces the same direction.</p><p>Go to this side of the temple box.</p>",
            response: "Read Matthew 21:12-13 and Discuss how the cleansing of the temple is a metaphor in your own lives.",
            location: { lat: 40.250442540755394, lng: -111.65178807272079 },
            image: "assets/eggs/egg1.png",
            letter: "7",
            found: false,
        },
        {
            clue: "On the night of the passover dinner with His apostles the Savior instituted the sacrament (Luke 22:19-20).  This event is commemorated in an exhibit on campus.  Go to the main entrance of the building where the exhibit is on display.<p><img src='assets/byu/sacrament.jpeg' style='width: 100%;'>",
            response: "If the exhibit is open, take a few minutes to contemplate Of Souls and Sacraments.",
            location: { lat: 40.250879710983895, lng: -111.64771033378649 },
            image: "assets/eggs/egg2.png",
            letter: "9",
            found: false,
        },
        {
            clue: "<p><a style='font-size: 5em;' onclick='playAudio(`assets/byu/song.mp3`);'>▶️ </a>",
            response: "One of the most common invitations from the Savior was 'Come, follow Me' (Luke 18:22).<p>A similar invitation peals across campus daily.<p>Consider the invitation from the Savior as you read William Clayton's inspired lyrics.",
            location: { lat: 40.252771620891046, lng: -111.64762704046983 },
            image: "assets/eggs/egg3.png",
            letter: "2",
            found: false,
        },
        {
            clue: "The 4th location is aptly named:<p>Sides: 4<br>Sidewalks: 4<br>Triangles: 4<br>Pairs of benches: 4<br>Squares contained: 4<p>Find the center.",
            response: "Stand in the center of the quad and consider what we find with Christ at the center of our lives (see Isaiah 48:18).",
            location: { lat: 40.24973167558686, lng: -111.64927428437377 },
            image: "assets/eggs/egg4.png",
            letter: "4",
            found: false,
        },
        {
            clue: "<p><img src='assets/byu/wordcloud.png'>",
            response: "",
            location: { lat: 40.250509796607545, lng: -111.64929112513362 },
            image: "assets/eggs/egg5.png",
            letter: "+",
            found: false,
        },
        {
            clue: "<p style='font-size: 5em;'>🫘 🏛️   🫎  🗽</p>",
            response: "Christ created the Earth, the life upon it, and the light (John 1:3-4).  Reflect on Christ as the light of men.",
            location: { lat: 40.253641539013344, lng: -111.64715821239447 },
            image: "assets/eggs/egg6.png",
            letter: "2",
            found: false,
        },
        {
            clue: "Eggs have come to be associated with Easter; some say they symbolize new life and represent the Resurrection (Luke 24:1-6).<p>An Easter egg on BYU campus can be seen from space.  Can you find the 'top' of the egg where it's wet?",
            response: "Rest a few moments next to the fountain and reflect how the Resurrection affects your discipleship of Christ.",
            location: { lat: 40.24843502997608, lng: -111.65119808808106 },
            image: "assets/eggs/egg7.png",
            letter: "J",
            found: false,
        },
    ],
    'Parkway': [
        {
            clue: "He's a stake president, but not ours.  He teaches piano.  That's right -- it's the Jensens!",
            location: { lat: 40.247843, lng: -111.710551 },
            image: "assets/eggs/egg1.png",
            letter: "6",
            found: false,
        },
        {
            clue: "The Bishop lives here",
            location: { lat: 40.247853, lng: -111.709065 },
            image: "assets/eggs/egg2.png",
            letter: "7",
            found: false,
        },
        {
            clue: "You might _Know_ where this past, aquatic bishop lives... 'cause he has a Finn... get it?!  Ha!",
            location: { lat: 40.249505, lng: -111.712383 },
            image: "assets/eggs/egg3.png",
            letter: "X",
            found: false,
        },
        {
            clue: "Borther!",
            location: { lat: 40.247700, lng: -111.713356 },
            image: "assets/eggs/egg4.png",
            letter: "P",
            found: false,
        },
        {
            clue: "Wooma!",
            location: { lat: 40.246934, lng: -111.710235 },
            image: "assets/eggs/egg5.png",
            letter: "+",
            found: false,
        },
        {
            clue: "Deck destroyers",
            location: { lat: 40.246936, lng: -111.709961 },
            image: "assets/eggs/egg6.png",
            letter: "F",
            found: false,
        },
        {
            clue: "Diminutive choir leaders live here",
            location: { lat: 40.247850, lng: -111.710849 },
            image: "assets/eggs/egg7.png",
            letter: "M",
            found: false,
        },
        {
            clue: "Some really Good people live here",
            location: { lat: 40.249492, lng: -111.712181 },
            image: "assets/eggs/egg8.png",
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

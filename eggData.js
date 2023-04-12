const allEggData = {
    'BYU': {
        'title': '',
        'start_time': '2023-04-12 18:15 MDT',
        'start_clue': "<p><b>Welcome!</b><p>Find all the eggs to reveal the final clue!<p>Each egg you find will reveal a part of the final clue.  Feel free to use the internet, friends, strangers, and any other resources.<p>Start anywhere near or on BYU campus; visitor parking at the BYU Museum of Art is recommended.<p>The clue sequence has been randomized; the order that you choose to visit them will affect how quickly you complete the hunt.",
        'end_clue': "<p><b>Well done so far!</b><p>Once you solve the final clue, you may want to drive to the final destination.<p>When you arrive, say you're with the __ party.",
        'eggs': [
            {
                clue: "During the final week of His ministry the Savior cleansed the temple.<p>BYU's business school is in a building sometimes called 'the box the temple came in' due to its similar shape to the Salt Lake temple.</p><p>Latter-day temples often have 'Holiness to the Lord, The House of the Lord' written on the side; on most temples this inscription faces the same direction.</p><p>Go to this side of the temple box.</p>",
                response: "Read Matthew 21:12-13 and discuss how the cleansing of the temple is a metaphor in your own lives.",
                location: { lat: 40.250442540755394, lng: -111.65178807272079 },
                image: "assets/eggs/egg1.png",
                letter: "7",
                found: false,
            },
            {
                clue: "On the night of the passover dinner with His apostles the Savior instituted the sacrament (Luke 22:19-20).  This event is commemorated in an exhibit on campus.  Go to the main entrance of the building where the exhibit is on display.<p><img src='assets/byu/sacrament.jpeg' style='width: 100%;'>",
                response: "If the exhibit is open, take a few minutes to contemplate <i>Of Souls and Sacraments</i>.",
                location: { lat: 40.250879710983895, lng: -111.64771033378649 },
                image: "assets/eggs/egg2.png",
                letter: "9",
                found: false,
            },
            {
                clue: "<p><a style='font-size: 5em;' onclick='playAudio(`assets/byu/song.mp3`);'>▶️ </a>",
                response: "One of the most common invitations from the Savior was 'Come, follow Me' (Luke 18:22).<p>Consider the invitation from the Savior as you read William Clayton's inspired lyrics.",
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
                letter: "2",
                found: false,
            },
            {
                clue: "<p><img src='assets/byu/wordcloud.png'>",
                response: "Brigham Young was known as the Lion of the Lord because of his bold testimony of Christ and His Gospel.<p>How do you share <i>your</i> testimony boldly?",
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
                letter: "P",
                found: false,
            },
            {
                clue: "Eggs have come to be associated with Easter; some say they symbolize new life and represent the Resurrection (Luke 24:1-6).<p>An Easter egg on BYU campus can be seen from space.  Can you find the 'top' of the egg where it's wet?",
                response: "Rest a few moments next to the fountain and reflect how the Resurrection affects your discipleship of Christ.",
                location: { lat: 40.24843502997608, lng: -111.65119808808106 },
                image: "assets/eggs/egg7.png",
                letter: "7",
                found: false,
            },
        ],
    },
}

function getPuzzleData() {
        return allEggData[getKey()];
}

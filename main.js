// Declare a global variable to store the tossed word
let tossedWord;

// Function to recognize text from an image using Tesseract.js
function recognizeTextFromImage(imageData) {
    return Tesseract.recognize(
        imageData,
        'eng',
        {
            logger: info => console.log(info)
        }
    );
}

// Function to speak the given text
function listen(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to capture the screen and perform OCR
function captureScreenAndReadText() {
    const wordList = [
        "g r a v i t y", "c a r e e r", "e n g a g e d", "S o d o I", "e x a c t l y", "m u s i c a l", "o v e r a l l", "h o w e v e r", "a n s w e r", "refund", "switch on", "bus stop", "holidays", "tsunami", "cheer up", "Come on!", "o v e r c o m e", "s t a r l i g h t", "w i r e l e s s", "affection", "username", "feelings", "grown-up", "blue-eyed", "Hollywood", "light-year", "easy-going", "plagiarism", "connection", "a film-goer", "nominations", "Absolutely!", "magnificent", "accessories", "incongruity", "Oh my gosh!"
    ];

    const pronunciationWordList = [
        "gravity", "career", "engaged", "So do I", "exactly", "musical", "overall", "however", "answer", "refund", "switch on", "bus stop", "holidays", "tsunami", "cheer up", "Come on!", "overcome", "starlight", "wireless", "affection", "username", "feelings", "grown-up", "blue-eyed", "Hollywood", "light-year", "easy-going", "plagiarism", "connection", "a film-goer", "nominations", "Absolutely!", "magnificent", "accessories", "incongruity", "Oh my gosh!"
    ]

    const randomIndex = Math.floor(Math.random() * wordList.length && pronunciationWordList.length);
    tossedWord = pronunciationWordList[randomIndex];

    // Display the static text on the webpage
    document.getElementById('output').innerText = tossedWord;

    // Speak the static text
    listen(tossedWord);

    // Send the tossed word to the other script
    window.postMessage({ type: 'tossedWord', data: tossedWord }, '*');

    console.log("captureScreenAndReadText called"); // Add this line to check if the function is called

// Function to check if the spelling is correct (simple string comparison)
function isSpellingCorrect(speech, tossedWord) {
    // Ensure that speech is a string
    if (typeof speech !== 'string') {
        return false;
    }

    // Log the recognized speech and tossed word to the console
    console.log('Recognized Speech:', speech.toLowerCase());
    console.log('Tossed Word:', tossedWord.toLowerCase());

    // Simple string comparison
    return speech.toLowerCase() === tossedWord.toLowerCase();
}

click_to_convert.addEventListener('click', function () {
    let spellMode = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript);

        convert_text.innerHTML = transcript;

        // Check if the recognized speech closely matches the tossed word
        if (spellMode && isSpellingCorrect(transcript.join(' '), tossedWord)) {
            console.log('Correct!');
            Swal.fire({
                title: "Good job!",
                text: "You said the word correctly",
                icon: "success"
            });
        } else {
            // Swal.fire({
            //     title: "Ohh no!",
            //     text: "You didn't say the word correctly",
            //     icon: "error"
            // });
            console.log('Incorrect Spelling!');
        }
    });

    if (spellMode) {
        recognition.start();
    }
});
}
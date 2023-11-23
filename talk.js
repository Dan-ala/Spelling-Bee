// // Assuming you have an element with the id 'output' to display the tossed word
// const outputElement = document.getElementById('output');

// click_to_convert.addEventListener('click', function () {
//     let speech = true;
//     window.SpeechRecognition = window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true;

//     recognition.addEventListener('result', e => {
//         const transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript);

//         convert_text.innerHTML = transcript;

//         // Access the tossed word from the global variable
//         const tossedWord = window.tossedWord;

//         // Check if the recognized speech matches the tossed word
//         if (transcript.includes(tossedWord.toLowerCase())) {
//             console.log("Match! You said the correct word.");
//             // You can add additional actions for a correct match
//         } else {
//             console.log("Try again. Your speech did not match the tossed word.");
//             // You can add additional actions for an incorrect match
//         }
//     });

//     if (speech == true) {
//         recognition.start();
//     }
// });

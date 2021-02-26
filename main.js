//need to access everything in the text box
const text = document.getElementById('text');

// we need to get our window speech recognition...regular and webkit
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//CREATE AN INSTANCE OF
const recognition = new window.SpeechRecognition();

//Controls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.) if false it will wait to end to give results
recognition.interimResults = true;

let paragraph = document.createElement('p');

//add event listener to listen for changes in text box
recognition.addEventListener('result', (evt) => {
  //evt.results contain our speech and length
  //need to map results to put all speeches together
  //allevents want to access result of speech...need to evt.results ...in there results has speechrecogniot and the value[0] which is transcript so put those together (.join)
  const textFromMic = Array.from(evt.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  // console.log(evt);
  // console.log(textFromMic)

  //to render on the sight we have to fill in paragraph
  paragraph.innerText = textFromMic;

  //append in div...append as child of text above
  text.appendChild(paragraph);

  //will now check to see if isFinal is true or false..if true start a new paragraph
  //this is located in evt.result[0].isFinal
  if (evt.results[0].isFinal) {
    paragraph = document.createElement('p');
  }
});

//add event listener so our session ends and restarts
recognition.addEventListener('end', () => recognition.start());

//To start speech to text use start method and allow page to use mic
recognition.start();

//side note...had to run git branch -m "main"

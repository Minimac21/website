var output = document.getElementById("chain");

function loadChain(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'ngram.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
}

// Call loadChain to load the ngram data from the JSON file
loadChain(function(ngram) {
  // Use the ngram data to generate the markov chain
  // word_pair is a single string of the form word1_word2
  var wordPair = Object.keys(ngram)[Math.floor(Math.random() * Object.keys(ngram).length)];
  var wordArr = wordPair.split("_")
  var chain = wordArr[0]+" "+wordArr[1]+" "

  //get chain
  while(true){ 
    if(!(wordPair in ngram)){
      break;
    };
    var third = ngram[wordPair][Math.floor(Math.random() * ngram[wordPair].length)];
    chain += third + " ";
    wordArr = wordPair.split("_")
    wordPair = wordArr[1]+"_"+third;
  };
  
  output.innerHTML += chain;
});

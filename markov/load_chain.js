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
};

function getCorpus() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'corpuses/cslewis.txt');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == "200") {
      return xhr.responsText;
    } else {
      return null
    }
  }
xhr.send(null);
}

// Call loadChain to load the ngram data from the JSON file
function generateChain(ngram) {
  // Use the ngram data to generate the markov chain
  // word_pair is a single string of the form word1_word2
  var word_pair = Object.keys(ngram)[Math.floor(Math.random() * Object.keys(ngram).length)];
  var wordArr = word_pair.split("_")
    var chain = wordArr[0]+" "+wordArr[1]+" "
  

  //get chain
  while(true){ 
    if(!(word_pair in ngram)){
      break;
    };
    var third = ngram[word_pair][Math.floor(Math.random() * ngram[word_pair].length)];
    chain += third + " ";
    wordArr = word_pair.split("_")
    word_pair = wordArr[1]+"_"+third;
  };
  
  output.innerHTML += chain;
};

function getSubStrings(){
  let i = 0;
  let j = 2;

  const wordEnds = [0];
  const chain = output.innerHTML;
  const corpus = getCorpus;
  const substrings = [];
  
  //Keeping track of words with idx of each space (includes final character)
  for(const i = 0;i<chain.length;i++){
    if(chain[i]==' '){
      wordEnds.push(i);
    }
  }

  while (j < wordEnds.length && i + 1 < j) {
    const currSubstr = chain.substr(wordEnds[i], wordEnds[j]);
    if (corpus.includes(currSubstr)) {
      j++;
    } else {
      if (j - i > 4) {
        substrings.push(currSubstr);
      }
      i = j;
      j += 2;
    }
  }
}

loadChain(generateChain);
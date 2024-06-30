const output = document.getElementById("chain");
const saved = document.getElementById("saved");
const substrButton = document.getElementById("analyze");
const reloadButton = document.getElementById("reload");
const saveButton = document.getElementById("save");

var highlighted = false;
var ngramData;

//loads ngram, performs callback on the ngram
function loadChain(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'ngram.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      ngramData = JSON.parse(xhr.responseText)
      callback(ngramData);
    }
  };
  xhr.send(null);
};

function highlightLongestSubstrInCorpus() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'corpuses/cslewisFormatted.txt');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      highlightSubstr(getLongestSubstr(xhr.responseText));
    }
  };
  xhr.send(null);
}

// Call loadChain to load the ngram data from the JSON file
function generateChain(ngram) {
  // reset highlist status
  highlighted=false;
  
  // word_pair is a single string of the form word1_word2
  var word_pair = Object.keys(ngram)[Math.floor(Math.random() * Object.keys(ngram).length)];
  var wordArr = word_pair.split("_")
    var chain = wordArr[0]+" "+wordArr[1]+" "

  //make chain
  while(true){ 
    if(!(word_pair in ngram)){
      break;
    };
    var third = ngram[word_pair][Math.floor(Math.random() * ngram[word_pair].length)];
    chain += third + " ";
    wordArr = word_pair.split("_")
    word_pair = wordArr[1]+"_"+third;
  };
  
  output.innerHTML = chain;
};

function getSubstrings(corpus){
  const wordEnds = [0];
  const chain = output.innerText;
  var substrings = [];
  
  //Keeping track of words with idx of each space (includes final character)
  for(let i = 0;i<chain.length;i++){
    if(chain[i]==' '){
      wordEnds.push(i);
    }
  }
  let i=0;
  let j=2;
  while (j < wordEnds.length && i + 1 < j) {
    const currSubstr = chain.substring(wordEnds[i], wordEnds[j]);
    if (corpus.includes(currSubstr)) {
      j++;
    } else {
      if (j - i > 3) {
        var idx = [wordEnds[i],wordEnds[j]];
        substrings.push(idx);
      }
      i = j;
      j += 2;
    }
  }
  return substrings;
}

function getLongestSubstr(corpus) {
  const substrings = getSubstrings(corpus);
  var result = [0,0];
  for(const substr of substrings){
    if(substr[1]-substr[0]>result[1]-result[0]){
      result = substr;
    }
  }
  return result;
}

function highlightSubstr(substrIdx) {
  if(highlighted){
    return;
  }
  highlighted = true;
  var chain = output.innerHTML;
  var result = chain.slice(0,substrIdx[0]).concat("<span style='color: gold;'>", chain.slice(substrIdx[0],substrIdx[1]), "</span>", chain.slice(substrIdx[1]));
  output.innerHTML = result;
  return;
}

var savedChains;
function addSavedChain(chainText){
  listItem = document.createElement('li');
  listItem.innerHTML = chainText
  saved.appendChild(listItem);
}

function populateSavedChains(){
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("text/plain")
  xhr.open('GET', 'saved_outputs.txt');
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var savedChains=xhr.responseText.split("\n");
      //assuming saved_outputs.txt has a trailing newline
      for(var i=0; i<savedChains.length-1; i++){
        chainText=savedChains[i]
        addSavedChain(chainText);
      }
    }
  };
  xhr.send(null);
}

async function saveCurrentChain(){
  //hits /api/savemarkovchain
  //appends chain to "saved" element
  var chain = output.innerText;
  const formChain = new FormData();
  formChain.append("chain",chain);
  const response = await fetch('/api/savemarkovchain',
    {
      method: "POST",
      body: formChain
    })
  if(!response.ok){
    console.error(response)
  }
  addSavedChain(chain); 
}

reloadButton.addEventListener("click", () => {generateChain(ngramData)});
substrButton.addEventListener("click", highlightLongestSubstrInCorpus);
saveButton.addEventListener("click", saveCurrentChain);
populateSavedChains();
loadChain(generateChain);

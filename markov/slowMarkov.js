//choose corpus
var output = document.getElementById("output");


var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
        corpus = reader.result
corpus = corpus.toLowerCase().replace(/["'’\[\]\(\)""]/g,'').replace(/[\n\r]/g," ");



//Constructing the ngram, n=2 in this code
ngram = {}
var word_pair
for(var j = 0; j < corpus.split(/[.?!]/g).filter(Boolean).length; j++) {
    sentence = corpus.split(/[.?!]/g)[j]
    words = sentence.split(" ").filter(Boolean)
    for(var i = 2; i < words.length; i++) {
        word_pair = [words[i-2],words[i-1]]
        if(!(word_pair in ngram)){
            ngram[word_pair] = []
        }
        ngram[word_pair].push(words[i])
    }
}
//random first word pair
word_pair = Object.keys(ngram)[Math.floor(Math.random() * Object.keys(ngram).length)]
var chain = word_pair[0] + " " + word_pair[1] + " "

//get chain
while(true){
    if(!(word_pair in Object.keys(ngram))){
        break
    };
    third = ngram[word_pair][Math.floor(Math.random() * ngram[word_pair].length)];
    chain += third + " "; 
    word_pair = [word_pair[1],third]; 
}
output.innerHTML = chain
};
reader.readAsText(input.files[0])
}






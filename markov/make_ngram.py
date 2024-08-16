#https://onlinegdb.com/IrQRJkyX0
#https://files.catbox.moe/fj3568.py

#if ur lucky it will combine sailor moon eva n lain lore
import sys
assert len(sys.argv) == 2
corpusFile = open(sys.argv[1],"r")
corpus = corpusFile.read()
import re
import random
import json
ngram = {}
corpus = corpus.lower().replace('"','').replace("'",'').replace('\n',' ').replace(')','').replace('(','').replace('[','').replace(']','').replace('’','').replace("“",'').replace("”",'').replace("\r"," ").replace(",","").replace(";","").replace("\u2014"," ").replace("\u2018","").replace("_","")
     
for sentence in re.split(r"[.?!]", corpus):
    
    #iterate through the words of the sentence
    for i in range(2, len(sentence.split(' '))):
        wordOne = sentence.split(' ')[i - 2]
        wordTwo = sentence.split(' ')[i - 1]
        wordThree = sentence.split(' ')[i]
        if "" in [wordOne,wordTwo,wordThree]:
            continue
        word_pair = wordOne + "_" + wordTwo       
        if word_pair not in ngram:
            ngram[word_pair] = []
        ngram[word_pair].append(wordThree)
corpusFile.close()

ngramFile = open("joyce-ngram.json","w")
ngramJson = json.dumps(ngram, indent=2)
ngramFile.write(ngramJson)
ngramFile.close()

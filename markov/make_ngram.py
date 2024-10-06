#https://onlinegdb.com/IrQRJkyX0
#https://files.catbox.moe/fj3568.py

import sys
import re
import json
from os import path

try:
    assert len(sys.argv) == 3
except Exception as e:
    raise Exception("This script takes two arguments; the path to the corpus, and the n in ngram")

corpusFileName = sys.argv[1]
n=sys.argv[2]
try:
    n=int(n)
except Exception as e:
    raise Exception("The second argument must be an integer, which is the n in ngram")

corpusFile = open(corpusFileName,"r")

corpus = corpusFile.read()
ngram = {}
corpus = corpus.lower().replace('"','').replace("'",'').replace('\n',' ').replace(')','').replace('(','').replace('[','').replace(']','').replace('’','').replace("“",'').replace("”",'').replace("\r"," ").replace(",","").replace(";","").replace("\u2014"," ").replace("\u2018","").replace("_","")

for sentence in re.split(r"[.?!]", corpus):

    words = sentence.split(" ")
    #iterate through the words of the sentence
    for i in range(n-1, len(words)):
        gram = words[i+1-n:i+1]
        if "" in gram:
            continue
        pre_gram = "_".join(gram[:-1])
        if pre_gram not in ngram:
            ngram[pre_gram] = []
        ngram[pre_gram].append(gram[-1])

corpusFile.close()

ngramFileName=path.basename(corpusFileName).split(".")[0]
ngramFile = open(f"{n}grams/{ngramFileName}-ngram.json","w")
ngramJson = json.dumps(ngram, indent=2)
ngramFile.write(ngramJson)
ngramFile.close()

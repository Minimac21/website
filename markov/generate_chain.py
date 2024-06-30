#https://onlinegdb.com/IrQRJkyX0
#https://files.catbox.moe/fj3568.py

#if ur lucky it will combine sailor moon eva n lain lore
import sys
assert len(sys.argv) == 2
f = open(sys.argv[1],"r")
corpus = f.read()

import random
ngram = {}
corpus = corpus.lower().replace('"','').replace("'",'').replace('\n',' ').replace(')','').replace('(','').replace('[','').replace(']','').replace('’','').replace("“",'').replace("”",'')
     
for sentence in corpus.split('.'):
    #iterate through the words of the sentence
    for i in range(2, len(sentence.split(' '))):
        word_pair = (sentence.split(' ')[i - 2], sentence.split(' ')[i - 1])
        if '' in word_pair:
            continue
        if (word_pair) not in ngram:
            ngram[word_pair] = []
        ngram[word_pair].append(sentence.split(' ')[i])
    
word_pair = random.choice(list(ngram.keys())) 
out = word_pair[0] + ' ' + word_pair[1] + ' '

while True:
    if word_pair not in ngram.keys():
        break  
    third = random.choice(list(ngram[word_pair]))
    out += third + ' '
    word_pair = (word_pair[1], third)
    
print ('output banter: \n', out)
f.close()


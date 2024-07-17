import json
def valid_chain(chain):
    with open("ngram.json") as f:
        ngram = json.loads(f.read())
    chain = chain.strip()
    words = chain.split(" ")
    if len(words) == 1:
        return False

    if len(words)==2:
        if "_".join(words) not in ngram.keys():
            return False

    for i, word in enumerate(words[:-2]):
        key="_".join([word,words[i+1]])
        if key not in ngram.keys():
            return False
        if words[i+2] not in ngram[key]:
            return False
    return True


valids=[
    "moment therefore it crossed his mind and matter on which our planet and about his future ",
    "venus that could speak english had led her to make a man in mind of an old man and addressed himself to the sunward chambers into the reddish ochre of the new knowledge to man and his voice was speaking the truth of the tempter what was happening ransom had heard of one more promise ",
    "had mastered the details of his position descended upon ransom: finally horror with no particular reason to believe that anything would do all you religious people were always afraid were only a metaphor isnt it all about him for then ",
    "an economy during the last few days on perelandra he muttered something about equality not being re-elected when i said it transcended the animals had opened on the threshold of that sort of things of it in the wood and came rather a prologue to our head is the right sleeve stiff with blood would not like you and i dont know the real nerve of his race showed small and ephemeral against a tree but it had nothing to compare with our species could offer any attractions to a new expression on her own offices which were on and pulling after him get him something to say to him across a wide open hearth glowing with health and rounded with muscle and seemingly leisurely and even the late train ",
    "to begin by doing the same in all directions some of those short unsatisfactory walks which a fairy-tale in the presence of a precipice down and all i do hope your well and good men ",
]
print("Valids: ")
for valid in valids:
    print(valid_chain(valid))


notvalids=[
    "I am not gay ",
    "I am gay ",
    "THis guy is definitely gay ",
    "Mac sucks",
    "Nigger",
    "he eating beans"
]

print("Invalids: ")
for valid in notvalids:
    print(valid_chain(valid))

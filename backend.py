from flask import Flask, request
import requests
import json

app = Flask(__name__)

@app.route("/api/spotifysongs", methods=["GET"])
def get_spotify_songs():
    url="https://api.spotify.com/v1/me/tracks"
    with open("../spotify_access_token", 'r') as f:
        access_token=f.read().strip()
    headers={"Authorization": f"Bearer {access_token}"}
    try:
        number=int(request.args.get("n"))
        if number<1:
            number=1
        if number>10:
            number=10
    except Exception as e:
        number=5
    try:
        response = requests.get(url, headers=headers, params={"limit": number})
        return json.loads(response.content)
    except Exception as e:
        return(str(e))

def valid_chain(chain):
    with open("/var/www/macdepriest.com/markov/ngram.json") as f:
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



@app.route("/api/savemarkovchain", methods=["POST"])
def save_markov_chain():
    assert request.method == "POST"
    #chain parameter as body of form or whatever
    chain=request.form["chain"]
    if valid_chain(chain):
        try:
            with open("/var/www/macdepriest.com/markov/saved_outputs.txt", "a") as f:
                f.write(chain)
                f.write("\n")
            return "success"
        except Exception as e:
            return(str(e),400)
    else:
        return ("Invalid chain",400)

#if __name__=="__main__":
#    app.run(debug=True)

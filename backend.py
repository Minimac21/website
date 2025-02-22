from flask import Flask, request
import requests
import json
import html
import random
import re
import subprocess
from pathlib import Path

kylie_favs_playlist="https://www.youtube.com/playlist?list=PLIjqh5qaKPIA-YalxpkVZzBOsfIU4VF-S"

app = Flask(__name__)

@app.route("/api/spotify-songs/<num>", methods=["GET"])
def get_spotify_songs(num):

    url="https://api.spotify.com/v1/me/tracks"
    with open("../spotify_access_token", 'r') as f:
        access_token=f.read().strip()
    headers={"Authorization": f"Bearer {access_token}"}
    try:
        number=int(num)
        if number<1:
            number=1
        if number>10:
            number=10
    except Exception as e:
        number=5
    try:
        response = requests.get(url, headers=headers, params={"limit": number})
        json_response = json.loads(response.content)
        song_ids = [song["track"]["id"] for song in json_response["items"]]
        return song_ids
    except Exception as e:
        return(str(e))

@app.route("/api/kylie-songs/<num>", methods=["GET"])
def kylie_songs(num):
    num = int(num)
    command_ran = subprocess.run(f"yt-dlp --flat-playlist --get-id {kylie_favs_playlist}".split(" "), stdout=subprocess.PIPE)
    songs = command_ran.stdout.decode().split("\n")
    n_songs = songs[-(num+1):-1]
    n_songs.reverse()
    return n_songs
    
def valid_chain(chain):
    with open("/var/www/macdepriest.com/markov/3grams/lewis-ngram.json") as f:
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
            print(chain)
            with open("/var/www/macdepriest.com/markov/saved_outputs.txt", "a") as f:
                f.write(chain)
                f.write("\n")
            return "success"
        except Exception as e:
            return str(e), 501
    else:
        return "Invalid chain", 400

def sanitize_user_input(user_input):
    # Convert special characters to HTML entities
    #sanitized = html.escape(user_input)
    
    # Remove any null bytes
    #sanitized = sanitized.replace('\0', '')
    
    # Optional: Remove or replace potentially harmful patterns
    # This example removes script tags and event handlers
    sanitized = re.sub(r'<script.*?>.*?</script>', '', sanitized, flags=re.IGNORECASE | re.DOTALL)
    sanitized = re.sub(r'\bon\w+\s*=', '', sanitized, flags=re.IGNORECASE)
    
    # Optional: Limit the length of the input
    max_length = 100000  # Adjust as needed
    sanitized = sanitized[:max_length]
    
    return sanitized

@app.route("/api/copynote", methods = ["POST"])
def copy_note():
    assert request.method == "POST"

    note = request.form["note"]
    try:

        with open("notepad/note.txt", "w") as f:
            f.write(note)
        return "success"
    except Exception as e:
        return (str(e), 400)

@app.route("/api/get-random-vid", methods = ["GET"])
def get_random_vid():
    vids_dir = Path("videos")

    videos = [v for v in vids_dir.iterdir() if v.is_file()]

    return {"name": "/"+str(random.choice(videos))}

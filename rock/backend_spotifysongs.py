from flask import Flask, request
import requests
import json

app = Flask(__name__)

@app.route("/api/spotifysongs")
def get_2_songs():
    url="https://api.spotify.com/v1/me/tracks"
    with open("../../spotify_access_token", 'r') as f:
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

if __name__=="__main__":
    app.run(debug=True)

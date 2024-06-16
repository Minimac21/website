import axios from 'axios'
import fs from 'fs'

access_token = fs.readFileSync('spotify_access_token', 'utf-8')
songs = axios.get("https://www.api.spotify.com/v1/me/tracks",
	{headers: {'Authorization': `Bearer ${access_token}`}, data: {"limit": 2}},
)
Console.log(songs)
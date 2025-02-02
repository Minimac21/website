document.addEventListener('DOMContentLoaded', function () {
  fetchAndDisplaySongs();
  fetchRandomVid();
});

async function fetchAndDisplaySongs() {
  try {
    const spotify_response = await fetch('/api/spotify-songs/5');
    const youtube_response = await fetch('/api/kylie-songs/5')
    if (!spotify_response.ok) {
      console.error("couldn't fetch /api/spotify-songs/<num>");
    }
    if (!youtube_response.ok) {
      console.error("couldn't fetch /api/kylie-songs/<num>")
    }
    const spotify_songs = await spotify_response.json();
    const youtube_songs = await youtube_response.json();
    const songsContainer = document.getElementById("songs-container");

    const paired_songs = spotify_songs.map((item, index) => [item, youtube_songs[index]]);
    for( const pair of paired_songs ){
      songsContainer.innerHTML = songsContainer.innerHTML.concat(createSpotifyIframe(pair[0]));
      songsContainer.innerHTML = songsContainer.innerHTML.concat(createYoutubeIframe(pair[1]));
    }

  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function createSpotifyIframe(trackId) {
  return `
    <iframe style="border-radius:12px" 
      src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator" 
      width="100%" 
      height="152" 
      frameBorder="0" 
      allowfullscreen="" 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy">
    </iframe>
  `;
}
function createYoutubeIframe(trackId) {
  return `
    <iframe 
      width="100%" 
      height="152" 
      src="https://www.youtube.com/embed/${trackId}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerpolicy="strict-origin-when-cross-origin" 
      allowfullscreen>
    </iframe>`;
}

async function fetchRandomVid(){
  try {
    const response = await fetch("/api/get-random-vid");
    if(!response.ok){
      console.error("error fetching random video");
    }

    const json = await response.json();
    const name = json.name;
    const vid_element = document.getElementById('random-vid')
    vid_element.src = name;
    
  } catch (error) {
    console.error('Error adding random video: ', error);
  }
}

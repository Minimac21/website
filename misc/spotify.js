document.addEventListener('DOMContentLoaded', function() {
  fetchAndDisplaySongs();

});

async function fetchAndDisplaySongs() {
  try {
    const response = await fetch('/api/spotifysongs');
    if(!response.ok){
      console.error("couldn't fetch /api/spotifysongs");
    }
    const data = await response.json();
    const songsContainer = document.getElementById("songs-container");

    var track_ids = [];
    for(const item of data.items){
      console.log("Track ID: " + item.track.id);
      track_ids.push(item.track.id);
      songDiv = createSpotifyEmbed(item.track.id);
      songsContainer.appendChild(songDiv);
    }
    console.log("Track IDS: " + track_ids);

  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

function createSpotifyEmbed(trackId) {
  const div = document.createElement('div');
  div.className = 'song-embed';
  div.innerHTML = `
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
  return div;
}

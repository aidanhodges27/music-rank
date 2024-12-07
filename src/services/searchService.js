export async function fetchItunesData(searchTerm) {
  if (!searchTerm) {
    return [];
  }
  const baseUrl = "https://itunes.apple.com/search";
    return fetch(`${baseUrl}?term=${encodeURIComponent(searchTerm)}&entity=song&limit=25`)
    .then((response) => response.json())
    .then((data) => data.results || []);
}

export async function fetchItunesById(id) {
  if (!id) {
    return {};
  }
  const baseUrl = "https://itunes.apple.com/search/lookup";
  return fetch(`${baseUrl}?term=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => data.results[0] || {});
}

export async function fetchNameandArtist(id) {
  if (!id) {
    return [];
  }
  const baseUrl = "https://itunes.apple.com/search/lookup";
  return fetch(`${baseUrl}?term=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => {
      const song = data.results[0];
      return song ? [song.trackName, song.artistName] : [];
    });
}


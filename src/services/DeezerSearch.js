export async function fetchDeezerData(query) {
  if (!searchTerm) {
    return [];
  }
  const baseUrl = "https://api.deezer.com/search";
  return fetch('${baseUrl}?q=${searchTerm}')
    .then((response) => response.json())
    .then((data) => data.data || []);
}

export async function fetchDeezerById(id) {
  const baseUrl = "https://api.deezer.com/search";
  return fetch(`${baseUrl}?i=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => data || {});
}

export async function fetchNameandArtist(id) {
  const baseUrl = "https://api.deezer.com/search";
  return fetch(`${baseUrl}?i=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((data) => [data.data[0].strSong, data.data[0].strArtist]);
}


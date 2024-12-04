export async function fetchDeezerData(query) {
  const response = await fetch(`https://api.deezer.com/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data from Deezer API");
  }
  const data = await response.json();
  return data.data;
}


import { env } from "../../../utils/envsafe";

interface LastFmResponse {
  topalbums: {
    album: {
      name: string;
      artist: {
        name: string;
      };
      image: {
        "#text": string;
      }[];
      playcount: number;
    }[];
  };
}

export async function getAlbums() {
  const reqParams = "&format=json&api_key=" + env.LASTFM_TOKEN;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${env.LASTFM_USER}&limit=50&period=1month${reqParams}`;

  try {
    const response: LastFmResponse = await (await fetch(url)).json();

    const albums = response.topalbums.album.map((album) => ({
      album: album.name,
      artist: album.artist.name,
      image: album.image[3]["#text"],
      plays: album.playcount,
    }));

    return {
      albums,
    };
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
}

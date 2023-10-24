import { env } from "../../../utils/envsafe";

interface LastFmTrack {
  "@attr"?: any;
  artist: {
    "#text": string;
  };
  album: {
    "#text": string;
  };
  name: string;
  image: {
    "#text": string;
  }[];
}

interface LastFmResponse {
  recenttracks: {
    track: LastFmTrack[];
  };
}

export async function currentStream() {
  const reqParams = "&format=json&api_key=" + env.LASTFM_TOKEN;
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${env.LASTFM_USER}&limit=1${reqParams}`;

  try {
    const response: LastFmResponse = await (await fetch(url)).json();

    const track = response.recenttracks.track[0];

    if (track["@attr"]) {
      return {
        streaming: {
          artist: track.artist["#text"],
          album: track.album["#text"],
          track: track.name,
          cover: track.image[3]["#text"],
        },
      };
    } else {
      return { streaming: null };
    }
  } catch (error) {
    console.error("Error fetching current stream:", error);
    throw error;
  }
}

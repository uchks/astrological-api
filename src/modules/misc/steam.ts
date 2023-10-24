import { env } from "../../../utils/envsafe";

interface SteamGame {
  appid: number;
  name: string;
  hoursPlayed: number;
}

interface SteamResponse {
  response: {
    games: {
      appid: number;
      name: string;
      playtime_2weeks: number;
    }[];
  };
}

export async function getSteam() {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${env.STEAM_KEY}&steamid=${env.STEAM_ID}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching Steam data: HTTP ${response.status}`);
    }

    const json: SteamResponse = await response.json();

    const games: SteamGame[] = json.response.games.map((game) => ({
      appid: game.appid,
      name: game.name,
      hoursPlayed: Math.floor(game.playtime_2weeks / 60),
    }));

    const totalPlaytime: number = games.reduce(
      (accumulator, game) => accumulator + game.hoursPlayed,
      0
    );

    return { games, totalPlaytime };
  } catch (error) {
    console.error("Error fetching Steam data:", error);
    throw error;
  }
}

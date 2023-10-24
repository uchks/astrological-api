import { env } from "../../../utils/envsafe";

interface DiscordActivity {
  name: string;
  state: string | null;
  details: string | null;
}

interface LanyardResponse {
  data: {
    activities: DiscordActivity[];
  };
}

export async function getPresence() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${env.DISCORD_ID}`);

    if (!response.ok) {
      throw new Error(`Error fetching presence: HTTP ${response.status}`);
    }

    const json: LanyardResponse = await response.json();

    const coding = json.data.activities.find((activity) => activity.name === "Code");
    const watching = json.data.activities.find((activity) => activity.name === "Crunchyroll");

    return {
      coding: coding
        ? {
          state: coding.state,
          details: coding.details,
        }
        : null,
      watching: watching
        ? {
          state: watching.state,
          details: watching.details,
        }
        : null,
    };
  } catch (error) {
    console.error("Error fetching presence:", error);
    throw error;
  }
}

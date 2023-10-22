import { env } from "../../../utils/envsafe";

export async function getPresence() {
  const data = await fetch(
    `https://api.lanyard.rest/v1/users/${env.DISCORD_ID}`
  );

  const json = await data.json();

  const coding = json.data.activities.find(
    (activity: any) => activity.name === "Code"
  );

  const watching = json.data.activities.find(
    (activity: any) => activity.name === "Crunchyroll"
  );

  return {
    coding:
      coding && coding.details
        ? {
            state: coding.state,
            details: coding.details,
          }
        : null,
    watching:
      watching && watching.details
      ? {
          state: watching.state,
          details: watching.details,
        }
      : null,
  };
}

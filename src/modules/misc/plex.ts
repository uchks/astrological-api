import { env } from "../../../utils/envsafe";

export async function getPlex() {
    const data = await fetch(
        `https://device.proton.usbx.me/tautulli/api/v2?apikey=${env.TAUTULLI_KEY}&cmd=get_activity&user=sukarodo`
    );

    const json = await data.json();

    const watching = json.data.activities.find(
        (activity: any) => activity.name === "Crunchyroll"
    );

    return {
        watching:
            watching && watching.details
                ? {
                    state: watching.state,
                    details: watching.details,
                }
                : null,
    };
}

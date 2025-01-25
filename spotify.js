const CLIENT_ID = "4970fd386cac4681bea3ceab01344588";
const CLIENT_SECRET = "10bffc10c45e42f29bded71cb004e50e";

const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken() {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET);
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const accessToken = data.access_token;
        console.log("Access Token:", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error fetching access token:", error.message);
        throw error;
    }
}
async function fetchSpotifyData(accessToken) {
    try {
        const trackId =
            "7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B";
        const response = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${trackId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const trackData = await response.json();
        console.log("Track Data:", trackData);
    } catch (error) {
        console.error("Error fetching Spotify data:", error.message);
    }
}
 async function main() {
    try {
        const accessToken = await getAccessToken();
        await fetchSpotifyData(accessToken);
    } catch (error) {
        console.error("Script failed:", error);
    }
}

main();

export default {getAccessToken, fetchSpotifyData, main};
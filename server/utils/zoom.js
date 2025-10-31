import axios from "axios";
import qs from "qs";

export const getZoomAccessToken = async () => {
  try {
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;

    const tokenRes = await axios.post(
      "https://zoom.us/oauth/token",
      qs.stringify({ grant_type: "account_credentials" }),
      {
        auth: { username: clientId, password: clientSecret },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return tokenRes.data.access_token;
  } catch (err) {
    console.error("Zoom token error:", err.response?.data || err.message);
    throw err;
  }
};

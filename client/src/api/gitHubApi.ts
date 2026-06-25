import axios from "axios";

export async function getLatestVersion() {

  const res = await axios.get("/api/git/latest-version");
  return res.data;
}

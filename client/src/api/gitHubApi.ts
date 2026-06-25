import axios from "axios";

const VITE_GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;
const VITE_GITHUB_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER_API_BASE_URL;
const VITE_GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO_NAME_API_BASE_URL;

export async function getLatestVersion() {
    const baseUrl = VITE_GITHUB_API_BASE_URL;
    const owner = VITE_GITHUB_OWNER;
    const repo = VITE_GITHUB_REPO;

    console.log(owner, repo);
  const res = await axios.get(
    `${baseUrl}/repos/${owner}/${repo}/releases/latest`,
  );
  return res.data;
}

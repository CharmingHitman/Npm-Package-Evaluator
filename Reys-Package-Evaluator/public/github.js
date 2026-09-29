import axios from 'axios';

/**
 * Pull { owner, repo } out of a registry repository URL, e.g.
 * "git+https://github.com/axios/axios.git" -> { owner: "axios", repo: "axios" }.
 * Returns null if it's not a GitHub URL (some packages have no repo, or use
 * GitLab/Bitbucket/etc).
 * 
 */
// github.js
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function getRepoStats(owner, repo) {
  const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`
    }
  });
  console.log('commit data:', data);
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    lastPush: data.pushed_at,
  };
}

export function parseGitHubRepo(repositoryUrl) {
  if (!repositoryUrl) return null;
  const match = repositoryUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}



/**
 * Weekly commit totals for the last year (52 entries, oldest first).
 * GitHub computes this async on first request for a given repo — if nobody's
 * asked for it recently, it returns 202 with no data yet, so this retries
 * once after a couple seconds instead of coming back empty.
 */
export async function getCommitActivity(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`;
  let { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`
    }
  });

  if (!Array.isArray(data) || data.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    ({ data } = await axios.get(url));
  }

  if (!Array.isArray(data)) {
    // Still computing on GitHub's end even after the wait — give up on the
    // chart for this load rather than crashing the page. commitWeeks stays
    // [], the component just skips rendering the sparkline this time.
    return [];
  }

  return data.map((week) => week.total);
}

export function timeAgo(isoDate) {
  const days = Math.floor((Date.now() - new Date(isoDate)) / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}
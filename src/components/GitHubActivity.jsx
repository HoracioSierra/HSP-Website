import { useEffect, useState } from "react";
import githubRepos from "../data/githubRepos";

const GITHUB_USERNAME = "HoracioSierra";
const PORTFOLIO_TOPIC = "portfolio";

function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadRepos() {
      try {
        const manualRequests = githubRepos.map((item) =>
          fetch(`https://api.github.com/repos/${item.owner}/${item.repo}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to load ${item.name}`);
              }

              return response.json();
            })
            .then((data) => ({
              id: data.id,
              name: item.name,
              url: item.url,
              description: data.description,
              language: data.language,
              stars: data.stargazers_count,
              updatedAt: data.updated_at,
            }))
        );

        const autoResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`
        );

        if (!autoResponse.ok) {
          throw new Error("Failed to load automatic GitHub repos");
        }

        const autoData = await autoResponse.json();

        const autoRepos = autoData
          .filter(
            (repo) =>
              repo.topics && repo.topics.includes(PORTFOLIO_TOPIC)
          )
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            updatedAt: repo.updated_at,
          }));

        const manualRepos = await Promise.all(manualRequests);

        const combinedRepos = [...manualRepos, ...autoRepos];

        const uniqueRepos = combinedRepos.filter(
          (repo, index, self) =>
            index === self.findIndex((item) => item.url === repo.url)
        );

        uniqueRepos.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setRepos(uniqueRepos.slice(0, 6));
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    loadRepos();
  }, []);

  return (
    <section className="github-section panel">
      <div className="github-header">
        <p className="label">github activity</p>
      </div>

      {status === "loading" && (
        <p className="github-muted">Loading repository activity...</p>
      )}

      {status === "error" && (
        <p className="github-muted">
          Could not load GitHub activity right now.
        </p>
      )}

      {status === "success" && repos.length === 0 && (
        <p className="github-muted">
          No GitHub activity to show yet.
        </p>
      )}

      {status === "success" && repos.length > 0 && (
        <div className="github-grid">
          {repos.map((repo) => (
            <a
              key={repo.url}
              className="github-repo-card"
              href={repo.url}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description added yet."}</p>
              </div>

              <div className="github-repo-meta">
                <span>{repo.language || "code"}</span>
                <span>★ {repo.stars}</span>
                <span>
                  updated {new Date(repo.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default GitHubActivity;
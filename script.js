  document.addEventListener("DOMContentLoaded", () => {
    // footer dates
    const yearEl = document.getElementById("year");
    const lastUpdatedEl = document.getElementById("lastUpdated");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastUpdatedEl) lastUpdatedEl.textContent = new Date(document.lastModified).toDateString();

    // blog fetch (Hashnode)
    loadHashnodePosts("thedebugger.hashnode.dev", 5);
  });

  async function loadHashnodePosts(publicationHost, limit = 5) {
    const statusEl = document.getElementById("blogStatus");
    const container = document.getElementById("blogPosts");
    if (!statusEl || !container) return;

    try {
      const query = `
        query PublicationPosts($host: String!, $first: Int!) {
          publication(host: $host) {
            posts(first: $first) {
              edges {
                node {
                  title
                  brief
                  url
                  publishedAt
                }
              }
            }
          }
        }
      `;

      const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { host: publicationHost, first: limit }
        }),
      });

      if (!res.ok) throw new Error(`Hashnode HTTP ${res.status}`);

      const data = await res.json();
      const edges = data?.data?.publication?.posts?.edges ?? [];

      if (!edges.length) {
        statusEl.textContent = "No posts found yet.";
        return;
      }

      statusEl.textContent = "";

      container.innerHTML = edges.map(({ node }) => {
        const date = new Date(node.publishedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        return `
          <div class="post">
            <div class="date">${escapeHtml(date)}</div>
            <div class="title">
              <a href="${escapeAttr(node.url)}" target="_blank" rel="noopener">
                ${escapeHtml(node.title)}
              </a>
            </div>
            <p class="excerpt">${escapeHtml(node.brief || "")}</p>
          </div>
        `;
      }).join("");
    } catch (err) {
      console.error(err);
      statusEl.innerHTML = `
        Couldn’t load posts dynamically.
        <br />You can still read them here:
        <a href="https://${publicationHost}/" target="_blank" rel="noopener">${publicationHost}</a>
      `;
    }
  }

  // basic escaping (safety)
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c]));
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  loadHashnodePosts();
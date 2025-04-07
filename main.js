const APIURL = "https://api.github.com/users/";
const input = document.getElementById("input");
const searchRes = document.querySelector(".searchRes");
const historyContainer = document.querySelector(".search-history");
const toggleThemeBtn = document.getElementById("toggle-theme");
const exportBtn = document.getElementById("exportHistory");

let allRepos = [];
let visibleCount = 3;

const showSpinner = () => {
  searchRes.innerHTML =` <div class="spinner"></div>`;
};

const renderUser = (data) => {
  return (`

  <img src="${data.avatar_url}" alt="${data.name}">
  <div class="content">
    <h3>${data.name}</h3>
    <p class="desc">${data.bio || "No description available"}</p>
    <div class="follwers">
      <div class="box"><span class="number">${
        data.followers
      }</span><span class="word">Followers</span></div>
      <div class="box"><span class="number">${
        data.following
      }</span><span class="word">Following</span></div>
      <div class="box"><span class="number">${
        data.public_repos
      }</span><span class="word">Repos</span></div>
    </div>
    <div class="repos" id="repos"></div>
    <button id="loadMoreBtn">Load More</button>
    <button id="shareProfileBtn">Share Profile</button>
  </div>
  `);
};

const renderRepos = () => {
  const reposContainer = document.getElementById("repos");
  reposContainer.innerHTML = allRepos
    .slice(0, visibleCount)
    .map(
      (repo) => 
    `  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
        ${repo.name} ⭐ ${repo.stargazers_count}
      </a>`
    
    )
    .join("");

  const btn = document.getElementById("loadMoreBtn");
  btn.style.display = visibleCount >= allRepos.length ? "none" : "block";

  btn.onclick = () => {
    visibleCount += 3;
    renderRepos();
  };
};

const updateSearchHistory = (username) => {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.includes(username)) {
    history.unshift(username);
    history = history.slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }

  renderSearchHistory();
};

const renderSearchHistory = () => {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyContainer.innerHTML = history
    .map((user) => `<li class="history-item">${user}</li>`)
    .join("");

  document.querySelectorAll(".history-item").forEach((item) => {
    item.addEventListener("click", () => {
      input.value = item.textContent;
      getUser(item.textContent);
    });
  });
};

const getUser = async (user) => {
  showSpinner();
  try {
    const res = await fetch(`${APIURL}${user}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();
    const reposRes = await fetch(`${APIURL}${user}/repos`);
    allRepos = await reposRes.json();
    visibleCount = 3;

    searchRes.innerHTML = renderUser(data);
    renderRepos();
    updateSearchHistory(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    searchRes.innerHTML =` <p class="error"> User not found. Try again.</p>`;
  }
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchVal = e.target.value.trim();
    if (searchVal) getUser(searchVal);
  }
});

// ! dark mode
toggleThemeBtn.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
  toggleThemeBtn.textContent = html.dataset.theme === "dark" ? "☀️" : "🌙";
});

// ! Export history as JSON
exportBtn.addEventListener("click", () => {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const jsonHistory = JSON.stringify(history, null, 2);
  const blob = new Blob([jsonHistory], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "searchHistory.json";
  link.click();
});


document.addEventListener("click", (e) => {
    const generalLink = "https://github.com/"
  if (e.target.id === "shareProfileBtn") {
    const profileURL = `${generalLink}${input.value.trim()}`;
    if (navigator.share) {
      navigator
        .share({
          title: "GitHub Profile",
          url: profileURL,
        })
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this platform");
    }
  }
});

renderSearchHistory();

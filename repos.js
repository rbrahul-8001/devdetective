// repos.js

const reposContainer = document.getElementById('reposContainer');

function getStoredUsername() {
    return localStorage.getItem('githubUsername');
}

async function fetchAndDisplayRepos() {
    const username = getStoredUsername();
    try {
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch repositories. Status code: ${response.status}`);
        }

        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error(`Error fetching repositories: ${error.message}`);
    }
}

function displayRepos(repos) {
    reposContainer.innerHTML = ""; // Clear previous content

    // Process the repository data
    repos.forEach(repo => {
        const repoBox = document.createElement('div');
        repoBox.classList.add('repoBox');

        const repoName = document.createElement('p');
        repoName.classList.add('repoName');
        repoName.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.classList.add('repoDescription');
        repoDescription.textContent = repo.description || 'No description available.';

        repoBox.appendChild(repoName);
        repoBox.appendChild(repoDescription);

        reposContainer.appendChild(repoBox);
    });
}

// Initial fetch with a default username
fetchAndDisplayRepos();

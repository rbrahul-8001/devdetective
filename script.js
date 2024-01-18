const wrapper = document.querySelector(".wrapper");
const middle = document.querySelector(".middle");
const mainBox = document.querySelector(".mainBox");

const avatar = document.querySelector(".avatar");

const user = document.querySelector(".user-name");
const anchor = document.querySelector(".anch");
const date = document.querySelector(".date");

const bio = document.querySelector(".bio");

const value1 = document.querySelector(".value1");
const value2 = document.querySelector(".value2");
const value3 = document.querySelector(".value3");

const loc = document.querySelector(".location");
const website = document.querySelector(".website");
const twitter = document.querySelector(".twitter");
const company = document.querySelector(".company");
const repos = document.querySelector(".repo");

const btn = document.querySelector(".btn");
const searchBar = document.querySelector(".searchBar");
const write = document.querySelector("input");

const found = document.querySelector(".error");

const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const mode = document.querySelector(".mode");

let text = "rbrahul-8001";


async function getUserData(text) {

    try {
        found.classList.remove("active");
        const username = text;

        const response = await fetch(`https://api.github.com/users/${username}`);

        //if api req limit is exhausted
        if (response.status === 403) {
            const resetTime = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
            console.log(`Rate limit exceeded. Please wait until ${resetTime}`);
            // Display an error message to the user
            return;
        }

        const data = await response.json();

        if (data.message === "Not Found") {
            console.log(data)
            throw data;
        }

        console.log(data);
        renderData(data);

        localStorage.setItem('githubUsername', text);
    }
    catch (error) {
        console.log("Catch me ghus gua hu")
        console.log(error)
        found.classList.add("active");
    }
}

getUserData(text);

function renderData(data) {
    avatar.src = data?.avatar_url;

    user.innerHTML = data?.name || data?.login;
    anchor.href = data?.html_url;
    anchor.innerHTML = `@${data?.login}`;

    // date.innerHTML += data?.created_at;
    const isoDate = data?.created_at;
    const dateObject = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    date.innerHTML = `Joined ${formattedDate}`;

    bio.innerHTML = data?.bio || "This Profile has no bio";

    value1.innerHTML = data?.public_repos;
    value2.innerHTML = data?.followers;
    value3.innerHTML = data?.following;

    loc.innerHTML = data?.location || "Not Available";
    website.innerHTML = data?.blog || "Not Available";
    twitter.innerHTML = data?.twitter_username || "Not Available";
    company.innerHTML = data?.company || "Not Available";

    // company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
}

searchBar.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    text = write.value;
    console.log(write.value);
    getUserData(text);
});

moon.addEventListener("click", () => {
    wrapper.classList.add("new");
    middle.classList.add("new");

    mainBox.classList.add("new1");
    searchBar.classList.add("new1");

    moon.classList.add("invisible");
    sun.classList.remove("invisible");

    moon.classList.remove("visible");
    sun.classList.add("visible");
});

sun.addEventListener("click", () => {
    wrapper.classList.remove("new");
    middle.classList.remove("new");

    mainBox.classList.remove("new1");
    searchBar.classList.remove("new1");

    moon.classList.remove("invisible");
    sun.classList.add("invisible");

    moon.classList.add("visible");
    sun.classList.remove("visible");
});

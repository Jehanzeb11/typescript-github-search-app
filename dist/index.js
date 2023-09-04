"use strict";
const api = "https://api.github.com/users";
const form = document.getElementById("form");
const inp = document.getElementById("inp");
const results = document.getElementById("results");
async function custom(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`${res.status} Network Error`);
    }
    const data = await res.json();
    return data;
}
function againFetch(user) {
    user.forEach((el) => {
        console.log(el);
        results.innerHTML += `<div class="card" style="width: 18rem;">
        <img src=${el.avatar_url} class="card-img-top" alt="pic">
        <div class="card-body">
          <h5 class="card-title text-center">${el.login}</h5>
          <button class="mt-3 btn btn-dark text-center w-100"><a href=${el.url} class="text-decoration-none text-center text-bold text-light">Github ></a></button>
        </div>
        </a>`;
    });
}
function fetchUserData(url) {
    custom(url, {}).then((user) => {
        againFetch(user);
    });
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const search = inp.value.toLowerCase();
    try {
        const res = await custom(api, {});
        const matchingUsers = res.filter((e) => {
            return e.login.toLowerCase().includes(search);
        });
        results.innerHTML = '';
        if (matchingUsers.length === 0) {
            results.innerHTML = "<p class='text-white'>No User Found</p>";
        }
        else {
            againFetch(matchingUsers);
        }
    }
    catch (error) {
        console.log(error);
    }
});
fetchUserData(api);

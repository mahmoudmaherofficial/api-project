let posts = document.getElementById("posts");
let users = document.getElementById("users");

function getUsers() {
  let userRequest = new XMLHttpRequest();
  userRequest.open("GET", "https://jsonplaceholder.typicode.com/users");
  userRequest.send();
  userRequest.onload = function () {
    if (userRequest.status >= 200 && userRequest.status < 300) {
      let usersData = JSON.parse(userRequest.responseText);
      for (const user of usersData) {
        users.innerHTML += `
        <div class="user" id="${user.id}" onclick="getPosts(${user.id})">
          <h1>${user.name}</h1>
          <p>${user.email}</p>
        </div>
      `;
      }
    }
  };
}
getUsers();

function getPosts(userId) {
  let postRequest = new XMLHttpRequest();
  postRequest.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  postRequest.send();
  postRequest.onload = function () {
    if (postRequest.status >= 200 && postRequest.status < 300) {
      let postsData = JSON.parse(postRequest.responseText);
      posts.innerHTML = "";
      for (const post of postsData) {
        posts.innerHTML += `
            <div class="post" id="${post.id}">
              <h2>${post.title}</h2>
              <hr />
              <p>${post.body}</p>
            </div>
          `;
      }
    }
  };
}

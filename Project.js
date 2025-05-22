const postsContainer = document.getElementById('posts-container');
const loadBtn = document.getElementById('load-btn');
const userFilter = document.getElementById('user-filter');
let posts = [];

// Fetch posts and fill user filter
async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  posts = await res.json();

  const userIds = [...new Set(posts.map(post => post.userId))];
  userIds.forEach(id => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `User ${id}`;
    userFilter.appendChild(opt);
  });
}

// Display filtered posts
function displayPosts() {
  const selected = userFilter.value;
  const filtered = selected === 'all' ? posts : posts.filter(p => p.userId == selected);

  postsContainer.innerHTML = '';

  filtered.forEach(post => {
    const div = document.createElement('div');
    div.className = 'flex-item';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    postsContainer.appendChild(div);
  });
}

loadBtn.addEventListener('click', displayPosts);
fetchPosts();

// Select DOM elements
const postsContainer = document.getElementById('posts');
const postForm = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');

// Function to get posts from Local Storage
function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

// Function to save posts to Local Storage
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to display posts
function displayPosts() {
    const posts = getPosts();
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. Be the first to add one!</p>';
        return;
    }

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;

        const postContent = document.createElement('p');
        postContent.textContent = post.content;

        if (post.image) {
            const postImage = document.createElement('img');
            postImage.src = post.image;
            postImage.alt = 'Blog Image';
            postDiv.appendChild(postImage);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = '#e74c3c';
        deleteBtn.style.color = '#fff';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.marginTop = '10px';
        deleteBtn.addEventListener('click', () => deletePost(index));

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        postDiv.appendChild(deleteBtn);

        postsContainer.appendChild(postDiv);
    });
}

// Function to add a new post
function addPost(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    let image = imagePreview.src; // Use previewed image URL

    if (title === '' || content === '') {
        alert('Please fill in both the title and content.');
        return;
    }

    const newPost = { title, content, image };
    const posts = getPosts();
    posts.unshift(newPost); // Add new post to the beginning
    savePosts(posts);
    displayPosts();

    postForm.reset();
    imagePreview.style.display = 'none'; // Hide preview after submission
}

// Function to delete a post
function deletePost(index) {
    let posts = getPosts();
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1);
        savePosts(posts);
        displayPosts();
    }
}

// Function to handle image preview
function handleImagePreview() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '';
        imagePreview.style.display = 'none';
    }
}

// Event Listener for form submission
postForm.addEventListener('submit', addPost);

// Event Listener for image input
imageInput.addEventListener('change', handleImagePreview);

// Initial display of posts on page load
document.addEventListener('DOMContentLoaded', displayPosts);

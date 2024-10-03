// i use object to store multiple user data into and retrieve them with their unique id (username)  
const usersData = {
    //  user data with userName as key
    misal2723: {
        password: 'pass123',
        name: 'Misal Khan',
        // array of posts with objects and each post has postId, content, likes, comments and commentsList
        posts: [
            {
                postId: 1,
                content: 'Just finished my first React project!',
                likes: 120,
                comments: 15,
                commentsList: []
            },
            {
                postId: 2,
                content: 'Exploring new places in Lahore!',
                likes: 80,
                comments: 8,
                // each post has multiple comments and to store comments, I'm using array
                commentsList: []
            },
            {
                postId: 3,
                content: 'Can anyone recommend a good book on web development?',
                likes: 45,
                comments: 5,
                commentsList: []
            }
        ]
    },
    khan777: {
        password: 'securePass321',
        name: 'Khan Ali',
        posts: [{
            postId: 4,
            content: 'Learning full-stack development!',
            likes: 100,
            comments: 20,
            commentsList: []
        },
        {
            postId: 5,
            content: 'Started working on my portfolio website.',
            likes: 75,
            comments: 10,
            commentsList: []
        },
        {
            postId: 6,
            content: 'Just watched an amazing movie last night!',
            likes: 65,
            comments: 3,
            commentsList: []
        }
        ]
    },
    ahmad2723: {
        password: 'ahmad@567',
        name: 'Ahmad Iqbal',
        posts: [{
            postId: 7,
            content: 'Attended a JavaScript workshop today.',
            likes: 90,
            comments: 12,
            commentsList: []
        },
        {
            postId: 8,
            content: 'Joined a local tech community!',
            likes: 55,
            comments: 9,
            commentsList: []
        },
        {
            postId: 9,
            content: 'Preparing for my next coding interview.',
            likes: 70,
            comments: 7,
            commentsList: []
        }
        ]
    },
    mk2723: {
        password: 'mk7890',
        name: 'Muhammad Kashif',
        posts: [{
            postId: 10,
            content: 'Just completed a Python automation project.',
            likes: 110,
            comments: 18,
            commentsList: []
        },
        {
            postId: 11,
            content: 'Looking for job opportunities in software development.',
            likes: 85,
            comments: 6,
            commentsList: []
        },
        {
            postId: 12,
            content: 'What’s the best way to learn Django?',
            likes: 60,
            comments: 4,
            commentsList: []
        }
        ]
    }
};




// for storing value of username and password I declare two variables
let username, password;


// when user clicks on 'Login' button, this event listener is triggered
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // I fetch the values of username and password from form fields
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    // I create a new element for error message and show it if login fails
    const errorMessage = document.getElementById('errorMessage');
    // if login credentials are correct, then I hide the error message and show the post container
    if (usersData[username] && usersData[username].password === password) {

        // I remove any previous error message and show a success message
        errorMessage.textContent = '';
        alert('Login successful! Welcome, ' + usersData[username].name);
        // I hide the login form and show the post container
        let loginContainer = document.getElementById('login-container');
        loginContainer.style.display = 'none';
        let postContainer = document.getElementById('post-container');
        postContainer.style.display = 'block';

        // I call the function to display posts for the selected user by default showing their timeline posts.
        showPosts('timeline')
    } else {
        // if login credentials are incorrect, then I show an error message
        errorMessage.textContent = 'Invalid username or password';
    }
});

// function called when user clicks on 'Timeline' or 'Profile' button
function showPosts(view) {

    // I log the view parameter to the console for debugging purposes
    console.log('triggered', view)

    // I get the post container element and assign it to the variable postsContainer
    const postsContainer = document.getElementById('post-container');

    // I select all elements with class 'post-div' 
    const existingPosts = postsContainer.querySelectorAll('.post-div');

    // I get all the existing post div elements and remove them using the forEach method. 
    //This ensures that the existing posts are not duplicated when new posts are loaded.
    existingPosts.forEach(post => post.remove());

    // I check if the username and password are not empty 
    if (username && password) {

        //and if the view is 'timeline'
        if (view === 'timeline') {

            // I loop through each user in the usersData object
            for (let user in usersData) {

                let userId = user;

                // If the current user is not the logged in user
                if (usersData[user] !== usersData[username]) {

                    // I loop through each post in the current user's posts array
                    usersData[user].posts.map(post => {

                        // I create a new div element for each post
                        const postDiv = document.createElement('div');

                        // I assign a new class to the post div element
                        postDiv.className = 'post-div';

                        // to hold the post id i create a new variable to hold the post id
                        let postId = post.postId

                        // I add the post content, likes, and comments to the post div element
                        postDiv.innerHTML = `
                            <p class="content">${post.content}</p>
                            <div>
                                <div class="action-div">
                                    <p id="likes" class='likes' onclick='likePost(event)'>Likes: ${post.likes}</p>
                                    <p id="comments">Comments: ${post.comments}</p>
                                </div>
                                <div class="action-div">
                                    <input type="text" id="post-comment" placeholder="Post your Comment">
                                    <button id="post-btn" onclick='postComment("${userId}", ${postId})'>Post</button>
                                </div>
                            </div>
                        `;

                        // I append the new post div element to the post container
                        postsContainer.appendChild(postDiv);
                    }
                    )
                }

            }
        } else { // if the view is 'profile'

            // same as above
            usersData[username].posts.map(post => {
                const postDiv = document.createElement('div');
                let userId = username;
                let postId = post.postId
                postDiv.className = 'post-div';

                postDiv.innerHTML = `
                    <p class="content">${post.content}</p>
                    <div>
                        <div class="action-div">
                            <p id="likes" class='likes' onclick='likePost(event)'>Likes: ${post.likes}</p>
                            <p id="comments">Comments: ${post.comments}</p>
                        </div>
                        <div class="action-div">
                            <input type="text" id="post-comment" placeholder="Post your Comment">
                            <button id="post-btn" onclick='postComment("${userId}", ${postId})'>Post</button>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postDiv);
            }
            )
        }
    }
    else { // if user is not logged in
        console.log('Login Please')
    }
}

// function to handle like button click event and update the likes count and color accordingly. 
//Also, it adds the comment to the post's comments list. 1. toggles the 'liked' class 2.
function likePost(event) {

    // I select the 'likes' element that was clicked
    const likesElement = event.target;

    // I toggle the 'liked' class to the 'likes' element
    likesElement.classList.toggle('liked');

    let likesText = likesElement.innerText;

    // I split the likes text to get the current likes count and convert it to an integer. 
    //1. Extract the count 
    //2. Convert it to integer. 
    //3. Update the UI. 
    //4. Toggle the 'liked' class. 
    //5. Update the likes count in the UI.
    let currentLikes = parseInt(likesText.split(': ')[1]);

    // I update the likes count in the UI. If the 'liked' class is present, 
    //I increment the count by 1, otherwise, I decrement it by 1.
    likesElement.innerText = `Likes: ${likesElement.classList.contains('liked') ? currentLikes + 1 : currentLikes - 1}`;
}

// function to handle posting a comment. This function is called when the user clicks on the 'Post' button. 
function postComment(user, postId) {

    // I get the comment value from the input field and clear the input field. 
    // Get the comment value 
    const commentedPost = document.getElementById('post-comment').value;
    const commentsValue = document.getElementById('comments');

    // I check if the comment value is not empty. If it is not, I update the comments count in the UI.
    if (commentedPost) {
        let commentText = commentsValue.innerText;
        // I split the comments text to get the current comments count and convert it to an integer.
        let currentComments = parseInt(commentText.split(': ')[1]) || 0;
        commentsValue.innerText = `Comments: ${currentComments + 1}`;

        // I find the post object for the given postId 
        const post = usersData[user].posts.find(post => post.postId === postId)

        //and add the commentedPost to its commentsList.
        post.commentsList.push(commentedPost);
        // Clear the input field.
        document.getElementById('post-comment').value = '';
    }
    console.log(usersData[user])
}





// let profile = false;

// if (usersData[loginUserName] && usersData[loginUserName].password === loginUserPassword) {
//     console.log('login....')

//     for (let user in usersData) {
//         if (usersData[user] !== usersData[loginUserName]) {
//             console.log(usersData[user].posts)
//         }

//     }
//     function profilePosts(){
//         console.log(usersData[loginUserName].posts)
//     }
// profilePosts()
// } else {
//     console.log('Incorrect Password');
// }



// let usersData = new Map();

// usersData.set('misal2723', {
//     password: 'pass123',
//     name: 'Misal Khan',
//     posts: [
//         {
//             postId: 1,
//             content: 'Just finished my first React project!',
//             likes: 120,
//             comments: 15,
//             commentsList: []
//         },
//         {
//             postId: 2,
//             content: 'Exploring new places in Lahore!',
//             likes: 80,
//             comments: 8,
//             commentsList: []
//         },
//         {
//             postId: 3,
//             content: 'Can anyone recommend a good book on web development?',
//             likes: 45,
//             comments: 5,
//             commentsList: []
//         }
//     ]
// });


// function addUser() {
//     let userName = prompt('Enter user name');
//     console.log(usersData.get(userName))
//     if (usersData.get(userName)) {
//         alert('User Name already exist');
//         return;
//     }
//     else {
//         usersData.set(userName, {
//             password: prompt('set your password'),
//             name: prompt('Enter your name'),
//             posts: []
//         })
//         console.log(usersData)
//     }
// }

// addUser()






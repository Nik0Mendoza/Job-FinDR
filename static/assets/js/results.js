posts = []

function createJobPost(role, location, company, description) {
    const div = document.createElement('div')
    div.classList.add("job-post")

    div.innerHTML = `<h2>${role}</h2>` +
        `<span>${company}, </span><span class="fst-italic">${location}</span>` +
        `<p>${description}</p>`

    return div
}

function checkPostsScroll() {
    posts.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
    
        // the multiplier for the window height to determine where in the window height should
        // the element be rendered
        const threshold = 0.8
    
        if (elementTop < windowHeight * threshold) {
            element.classList.add('show')
        }
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./job-posts')

    if (response.status == 200 || response.status == 201) {
        const postsData = await response.json()

        // Remove progress indicator
        document.getElementById('progress-spinner').remove()

        // Add posts to container
        container = document.getElementById('posts-container')
        for (const postData of postsData) {
            post = createJobPost(
                postData.title,
                postData.location,
                postData.company,
                postData.description
            )

            container.append(post)
            posts.push(post)     
        }

        checkPostsScroll()
    }
})

// Try another button behavior
document
    .getElementById('upload-new-btn')
    .addEventListener('click', () => {
        window.location.href = './get-started-forms.html'
    })

document.addEventListener('scroll', checkPostsScroll)
let commonData = []
let addedData = []

let posts = []

const container = document.getElementById('posts-container')
const commonViewLabel = document.getElementById('common-view-label')
const addedViewLabel = document.getElementById('added-view-label')

const commonPrediction = document.getElementById('common-prediction')
const addedPrediction = document.getElementById('added-prediction')

function createJobPost(role, location, company, description) {
    const div = document.createElement('div')
    div.classList.add("job-post")

    div.innerHTML = `<h2>${role}</h2>` +
        `<div><span>${company}, </span><span class="fst-italic">${location}</span></div>` +
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

function removePosts() {
    while (container.firstChild)
        container.removeChild(container.lastChild)
    posts = []
}

function fillPosts(list) {
    for (let i = 0; i < list.length; i++) {
        const post = createJobPost(
            list[i].title,
            list[i].location,
            list[i].company,
            list[i].description
        )
        container.append(post)
        posts.push(post)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    commonViewLabel.classList.toggle('hide')
    addedViewLabel.classList.toggle('hide')

    console.log(commonPrediction.innerHTML)
    console.log(addedPrediction.innerHTML)
    
    const response = await fetch(`./job-posts?common-prediction=${commonPrediction.innerHTML}&added-prediction=${addedPrediction.innerHTML}`)

    if (response.status == 200 || response.status == 201) {
        const postsData = await response.json()
        commonData = postsData.common
        addedData = postsData.added

        console.log(commonData)
        console.log(addedData)

        // Remove progress indicator
        document.getElementById('progress-spinner').remove()

        removePosts()
        fillPosts(addedData)
        checkPostsScroll()

        commonViewLabel.classList.toggle('hide')
    }
})

commonViewLabel.addEventListener('click', () => {
    removePosts()
    fillPosts(commonData)
    checkPostsScroll()
    commonViewLabel.classList.toggle('hide')
    addedViewLabel.classList.toggle('hide')
})

addedViewLabel.addEventListener('click', () => {
    removePosts()
    fillPosts(addedData)
    checkPostsScroll()
    commonViewLabel.classList.toggle('hide')
    addedViewLabel.classList.toggle('hide')
})

// Try another button behavior
document.getElementById('upload-new-btn')
    .addEventListener('click', () => {
        window.location.href = './get-started-forms.html'
    })

// See breakdown button behavior
document.getElementById('breakdown-btn')
    .addEventListener('click', () => {
        const overlay = document.getElementById('overlay')
        overlay.classList.toggle('hide')
    })

document.querySelector('.preprocessing-dialog i')
    .addEventListener('click', () => {
        const overlay = document.getElementById('overlay')
        overlay.classList.toggle('hide')
    })

document.addEventListener('scroll', checkPostsScroll)
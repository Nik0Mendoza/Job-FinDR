const ROLES = [
    "Senior Software Engineer",
    "Marketing Coordinator",
    "Data Scientist",
    "Graphic Designer",
    "Customer Support Specialist",
]

const COMPANIES = [
    "Acme Innovations",
    "Quantum Dynamics",
    "Stellar Solutions",
    "ByteCraft Technologies",
    "Global Ventures Inc.",
]

const LOCATIONS = [
    "San Francisco, CA, USA",
    "Tokyo, Japan",
    "Berlin, Germany",
    "Sydney, Australia",
    "Bangalore, India",
]

const DESCRIPTIONS = [
    "Develop and maintain software applications, lead a team of developers, and contribute to the design and architecture of complex systems.",
    "Plan and eecute marketing campaigns, manage social media accounts, and collaborate with cross-functional teams to drive brand awareness.",
    "Analyze large datasets, build predictive models, and provide insights to support data-driven decision-making within the organization.",
    "Create visually appealing designs for print and digital media, collaborate with clients to understand their needs, and stay updated on design trends.",
    "Assist customers with product-related inquiries, troubleshoot issues, and provide excellent service to ensure customer satisfaction.",
]

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

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Remove progress indicator
        document.getElementById('progress-spinner').remove()

        // Add posts to container
        container = document.getElementById('posts-container')
        for (let index = 0; index < 5; index++) {
            post = createJobPost(
                ROLES[index],
                LOCATIONS[index],
                COMPANIES[index],
                DESCRIPTIONS[index]
            )

            container.append(post)
            posts.push(post)            
        }

        checkPostsScroll()
    }, 2000)

})

document.addEventListener('scroll', checkPostsScroll)
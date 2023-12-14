var experience_role = []
var experience_years = []
var experience_description = []

function addTextInput(containerId, placeholder) {
    const container = document.getElementById(containerId)
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = placeholder
    container.append(input)
}

function addExperience() {
    const container = document.getElementById('experience-container')
    const input = document.createElement('input')
    const textarea = document.createElement('textarea')
    input.type = 'text'
    input.placeholder = 'Enter previous role'
    textarea.placeholder = 'Describe your past experience'
    container.append(input)
    container.append(textarea)
}

function getAllInputs(containerId, isArea = false) {
    const inputs = document.querySelectorAll('#' + containerId + (isArea ? ' textarea' : ' input'))
    return Array.from(inputs).map(input => input.value)
}

const dropZone = document.getElementById("drop-zone")

dropZone.addEventListener("drop", (ev) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                const file = item.getAsFile();
                console.log(`… file[${i}].name = ${file.name}`);
            }
        });
    }

    dropZone.classList.remove("drop-zone-hover-state")
})

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drop-zone-hover-state")
})

dropZone.addEventListener("dragenter", () => {
    dropZone.classList.add("drop-zone-hover-state")
})

dropZone.addEventListener("dragover", (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
})

document.getElementById('add-certification')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('certifications-container', "License or any certifications")
    })

document.getElementById('add-training')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('training-container', "Training")
    })

document.getElementById('add-hard-skill')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('hard-skills-container', "Enter hard skill")
    })

document.getElementById('add-soft-skill')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('soft-skills-container', "Enter soft skill")
    })

document.getElementById('add-experience')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addExperience()
    })

document.getElementById("submit-btn")
    .addEventListener('click', async (e) => {
        e.preventDefault()

        overlay = document.getElementById('overlay')

        // Get birthdate from the form input
        const birthdate = document.querySelector('input[name="birthdate"]').value

        // Calculate age
        const today = new Date()
        const birthDate = new Date(birthdate)
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--

        // Get form data
        const formData = {
            age: [age.toString()],
            sex: document.querySelector('select[name="sex"]').value,
            program: [document.querySelector('input[name="program"]').value],
            certifications: getAllInputs('certifications-container'),
            training: getAllInputs('training-container'),
            hard_skills: getAllInputs('hard-skills-container'),
            soft_skills: getAllInputs('soft-skills-container'),
            experience_years: [document.querySelector('input[name="experience_years"]').value],
            experience_role: getAllInputs('experience-container'),
            experience_description: getAllInputs('experience-container', true),
        }

        overlay.classList.remove('hide-overlay')
        overlay.classList.add('show-overlay')

        const response = await fetch("./submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })

        if (response.status == 200 || response.status == 201) {
            // Navigate to results page
            window.location.href = "./results"
        } else {
            alert("There was an error on our end. Please try again later.")
        }
    })
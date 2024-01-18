var experience_role = []
var experience_years = []
var experience_description = []

async function getParsedData(file) {
    // const delay = ms => new Promise(res => setTimeout(res, ms));

    const blob = new Blob([file], { type: file.type })
    const formData = new FormData()
    formData.append('file', blob, file.name)

    const response = await fetch('./parsed-data', {
        method: 'POST',
        body: formData,
    })

    if (response.status == 200 || response.status == 201) {
        const json = await response.json()
        json.Value.ResumeData.status = 200
        return json.Value.ResumeData
    } else {
        return response.json()
    }

    /*
    // Use this to test autofill, to prevent parser credits from running out
    return {
        status: 200,
        education: [
            {
                course: "Something"
            }
        ],
        employer: [
            {
                role: "someone",
                description: "something"
            },
            {
                role: "someone",
                description: "something"
            }
        ],
        total_experience: {
            years: 15,
        },
        skills: {
            overall_skills: [
                "some skill",
                "some skill"
            ]
        }
    }
    */
}

async function handleDrop(ev) {
    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        const items = [...ev.dataTransfer.items]

        for (const item of items) {
            // get first file in input and break out
            if (item.kind === 'file') {
                const file = item.getAsFile()

                dropZoneLabel.innerHTML = 'Loading...'
                configureInput(true)

                const data = await getParsedData(file)

                dropZoneLabel.innerHTML = 'File uploaded: ' + file.name
                configureInput(false)

                if (data.status == 200) {
                    console.log(data)
                    // fillData(data)
                } else {
                    alert("There was an error parsing the resume inserted. You may have to fill up the fields manually.")
                }

                break
            }
        }
    }
}

// Drop behavior
const dropZone = document.getElementById('drop-zone')
const dropZoneLabel = document.querySelector('#drop-zone span')
const dropZoneInput = document.querySelector('#drop-zone input')
dropZone.addEventListener('drop', async (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    await handleDrop(ev)
    dropZone.classList.remove('drop-zone-hover-state')
})

dropZoneInput.addEventListener('change', async (ev) => await handleDrop(ev))

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drop-zone-hover-state')
})

dropZone.addEventListener('dragenter', () => {
    dropZone.classList.add('drop-zone-hover-state')
})

dropZone.addEventListener('dragover', (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault()
})

function fillData(parsedData) {
    if (parsedData.education) {
        for (const item of parsedData.education) {
            if (item.course) {
                fillSingle('program', item.course)
                break
            }
        }
    }

    if (parsedData.skills) {
        if (parsedData.skills.overall_skills) {
            const hardSkills = parsedData.skills.overall_skills
            fillMultiple('hard-skills-container', 'Enter hard skill', hardSkills)
        }
    }

    if (parsedData.total_experience) {
        if (parsedData.total_experience.years) {
            const years = parsedData.total_experience.years
            fillSingle('experience-years', years)
        }
    }

    if (parsedData.employer) {
        fillExperience(parsedData.employer)
    }
}

function fillSingle(name, value) {
    const input = document.querySelector(`input[name=${name}]`)
    input.value = value
}

function fillMultiple(containerId, inputPlaceholder, values) {
    const inputs = document.querySelectorAll(`#${containerId} input`)
    for (let i = 0; i < values.length; i++) {
        if (i >= inputs.length) {
            const addedInput = addTextInput(containerId, inputPlaceholder)
            addedInput.value = values[i]
        } else {
            inputs[i].value = values[i]
        }
    }
}

function fillExperience(experiences) {
    const inputs = document.querySelectorAll(`#experience-container input`)
    const textareas = document.querySelectorAll(`#experience-container textarea`)
    for (let i = 0; i < experiences.length; i++) {
        if (i >= inputs.length) {
            const added = addExperience()
            added.input.value = experiences[i].role
            added.textarea.value = experiences[i].description
        } else {
            inputs[i].value = experiences[i].role
            textareas[i].value = experiences[i].description
        }
    }
}

function configureInput(disabled) {
    const inputs = document.querySelectorAll('input')
    const textareas = document.querySelectorAll('textarea')
    const buttons = document.querySelectorAll('button')

    for (const input of inputs)
        input.disabled = disabled
    for (const textarea of textareas)
        textarea.disabled = disabled
    for (const button of buttons)
        button.disabled = disabled
}

function addTextInput(containerId, placeholder) {
    const container = document.getElementById(containerId)

    const inputDiv = document.createElement('div')
    const icon = document.createElement('i')

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = placeholder

    inputDiv.append(input)
    inputDiv.append(icon)
    container.append(inputDiv)

    inputDiv.classList.add('position-relative')
    icon.classList.add('close-icon', 'bi', 'bi-x-circle')

    return input
}

function addExperience() {
    const container = document.getElementById('experience-container')

    const inputDiv = document.createElement('div')
    const icon = document.createElement('i')

    const input = document.createElement('input')
    const textarea = document.createElement('textarea')
    input.type = 'text'
    input.placeholder = 'Enter previous role'
    textarea.placeholder = 'Describe your past experience'

    inputDiv.append(input)
    inputDiv.append(textarea)
    inputDiv.append(icon)
    container.append(inputDiv)

    inputDiv.classList.add('position-relative')
    icon.classList.add('close-icon', 'bi', 'bi-x-circle')

    return {
        input: input,
        textarea: textarea
    }
}

function getAllInputs(containerId, isArea = false) {
    const inputs = document.querySelectorAll('#' + containerId + (isArea ? ' textarea' : ' input'))
    return Array.from(inputs).map(input => input.value)
}

// Event listener for all clicks (used for finding close icons and their respective div containers)
document.addEventListener("click", function (event) {
    // If the clicked element has the class "close-icon"
    if (event.target.classList.contains("close-icon")) {
      var parentDiv = event.target.closest("div"); // Find the closest parent div
      parentDiv.parentNode.removeChild(parentDiv); // Remove the parent div from its container
    }
  });

document.getElementById('add-certification')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('certifications-container', 'License or any certifications')
    })

document.getElementById('add-training')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('training-container', 'Training')
    })

document.getElementById('add-hard-skill')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('hard-skills-container', 'Enter hard skill')
    })

document.getElementById('add-soft-skill')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addTextInput('soft-skills-container', 'Enter soft skill')
    })

document.getElementById('add-experience')
    .addEventListener('click', (e) => {
        e.preventDefault()
        addExperience()
    })

document.getElementById('submit')
    .addEventListener('click', async (e) => {
        e.preventDefault()

        const overlay = document.getElementById('overlay')

        // Get birthdate from the form input
        const birthdate = document.querySelector('input[name="birthdate"]').value

        // Calculate age
        const today = new Date()
        const birthDate = new Date(birthdate)
        const monthDiff = today.getMonth() - birthDate.getMonth()
        let age = today.getFullYear() - birthDate.getFullYear()
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
            experience_years: [document.querySelector('input[name="experience-years"]').value],
            experience_role: getAllInputs('experience-container'),
            experience_description: getAllInputs('experience-container', true),
            job_field: document.querySelector('select[name="job-field"]').value,
        }

        overlay.classList.remove('hide-overlay')
        overlay.classList.add('show-overlay')

        const response = await fetch('./submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (response.status == 200 || response.status == 201) {
            const json = await response.json()

            const commonPrediction = json.body['common_prediction']
            const addedPrediction = json.body['added_prediction']

            // Navigate to results page
            window.location.href = `./results?common-prediction=${commonPrediction}&added-prediction=${addedPrediction}`
        } else {
            alert('There was an error on our end. Please try again later.')
        }
    })
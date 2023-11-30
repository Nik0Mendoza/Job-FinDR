var experience_role = []
var experience_years = []
var experience_description = []
document
    .getElementById("addExperience")
    .addEventListener("click", function (event) {
        // Prevent the default behavior of the button click
        event.preventDefault()

        // Clone the existing experience section
        var clone = document
            .getElementById("experience-section")
            .cloneNode(true)

        // Clear input values in the cloned section
        var inputs = clone.querySelectorAll("input, textarea")
        inputs.forEach(function (input) {
            input.value = ""
        })

        // Append the cloned section to the container
        document
            .getElementById("experience-section")
            .parentNode.insertBefore(
                clone,
                document.getElementById("addExperience")
            )
    })

document
    .getElementById("submit")
    .addEventListener('click', async (e) => {
        e.preventDefault()

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
            sex: document.querySelector('select[name="sex"]').value,
            age: age.toString(),
            degree: document.querySelector('select[name="degree"]').value,
            program: document.querySelector('input[name="program"]').value,
            certifications: document.querySelector('input[name="certifications"]').value,
            training: document.querySelector('input[name="training"]').value,
            hard_skills: document.querySelector('textarea[name="hard_skills"]').value,
            soft_skills: document.querySelector('textarea[name="soft_skills"]').value,
            experience_role: document.querySelector('input[name="experience_role"]').value,
            experience_years: document.querySelector('input[name="experience_years"]').value,
            experience_description: document.querySelector('textarea[name="experience_description"]').value,
        }

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
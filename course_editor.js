document.addEventListener("DOMContentLoaded", function() {
    try {
        const saveButton = document.getElementById('saveButton');

        // Handle save button click
        saveButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission

            // Collect the updated pars manually from the inputs
            const newPars = [];
            for (let i = 1; i <= 9; i++) {
                const input = document.getElementById(`hole${i}`);
                if (input) {
                    newPars.push(Number(input.value));
                }
            }

            const updatedCourseData = {
                name: document.getElementById('courseName').value,
                difficulty: document.getElementById('courseDifficulty').value,
                music: document.getElementById('courseMusic').value,
                notes: document.getElementById('courseNotes').value,
                starsRequired: Number(document.getElementById('starsRequired').value),
                holePars: newPars
            };

            console.log('Updated Course Data:', updatedCourseData);
            // Here, you would typically save the updatedCourseData back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

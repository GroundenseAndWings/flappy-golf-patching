document.addEventListener("DOMContentLoaded", function() {
    try {
        // Course data object
        const courseData = {
            name: "Lofstrom Links 2024",
            difficulty: "easy",
            music: "Song1",
            notes: "The grassiest level!",
            starsRequired: 0,
            holePars: [3, 3, 3, 3, 3, 3, 3, 3, 3]
        };

        // Populate course details
        document.getElementById('courseName').value = courseData.name;
        document.getElementById('courseDifficulty').value = courseData.difficulty;
        document.getElementById('courseMusic').value = courseData.music;
        document.getElementById('courseNotes').value = courseData.notes;
        document.getElementById('starsRequired').value = courseData.starsRequired;

        // Populate hole pars
        const parForm = document.getElementById('parForm');
        courseData.holePars.forEach((par, index) => {
            const label = document.createElement('label');
            label.textContent = `Hole ${index + 1} Par:`;

            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.value = par;
            input.id = `hole${index + 1}`;

            parForm.appendChild(label);
            parForm.appendChild(input);
        });

        // Handle save button click
        document.getElementById('saveButton').addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission

            const updatedCourseData = {
                name: document.getElementById('courseName').value,
                difficulty: document.getElementById('courseDifficulty').value,
                music: document.getElementById('courseMusic').value,
                notes: document.getElementById('courseNotes').value,
                starsRequired: Number(document.getElementById('starsRequired').value),
                holePars: []
            };

            courseData.holePars.forEach((_, index) => {
                updatedCourseData.holePars.push(Number(document.getElementById(`hole${index + 1}`).value));
            });

            console.log('Updated Course Data:', updatedCourseData);
            // Here, you would typically save the updatedCourseData back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

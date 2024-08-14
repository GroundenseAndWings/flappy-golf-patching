document.addEventListener("DOMContentLoaded", function() {
    try {
        const saveButton = document.getElementById('saveButton');
        const terrainCanvas = document.getElementById('terrainCanvas');
        const ctx = terrainCanvas.getContext('2d');

        let drawing = false;

        // Start drawing
        terrainCanvas.addEventListener('mousedown', (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        });

        // Draw line
        terrainCanvas.addEventListener('mousemove', (e) => {
            if (drawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        });

        // Stop drawing
        terrainCanvas.addEventListener('mouseup', () => {
            drawing = false;
            ctx.closePath();
        });

        terrainCanvas.addEventListener('mouseleave', () => {
            drawing = false;
            ctx.closePath();
        });

        // Handle save button click
        saveButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission

            // Collect terrain data as an image
            const terrainData = terrainCanvas.toDataURL();

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
                holePars: newPars,
                terrain: terrainData // Save the terrain as an image data URL
            };

            console.log('Updated Course Data:', updatedCourseData);
            // Here, you would typically save the updatedCourseData back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    try {
        const parForm = document.getElementById('parForm');
        console.log('parForm:', parForm); // Check if parForm is found
        const saveButton = document.getElementById('saveButton');
        console.log('saveButton:', saveButton); // Check if saveButton is found

        // Example data: Array of hole pars
        const holePars = [3, 3, 4, 4, 5, 3, 4, 5, 3]; // Adjust this array as needed

        // Generate input fields for each hole
        holePars.forEach((par, index) => {
            const label = document.createElement('label');
            label.textContent = `Hole ${index + 1} Par:`;

            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.value = par;
            input.id = `hole${index + 1}`;

            parForm.appendChild(label); // This is where the error occurred
            parForm.appendChild(input);
        });

        // Handle save button click
        saveButton.addEventListener('click', () => {
            const newPars = [];

            holePars.forEach((_, index) => {
                const input = document.getElementById(`hole${index + 1}`);
                newPars.push(Number(input.value));
            });

            console.log('New Pars:', newPars);
            // Here, you would typically save the newPars array back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    try {
        const parForm = document.getElementById('parForm');
        console.log('parForm:', parForm); // Verify if parForm is being found
        const saveButton = document.getElementById('saveButton');
        console.log('saveButton:', saveButton); // Verify if saveButton is being found

        // Example data: Array of hole pars
        const holePars = [3, 3, 4, 4, 5, 3, 4, 5, 3]; // Adjust this array as needed

        // Check if parForm is found before attempting to append children
        if (parForm) {
            // Generate input fields for each hole
            holePars.forEach((par, index) => {
                const label = document.createElement('label');
                label.textContent = `Hole ${index + 1} Par:`;

                const input = document.createElement('input');
                input.type = 'number';
                input.min = 1;
                input.value = par;
                input.id = `hole${index + 1}`;

                parForm.appendChild(label); // Append label to the form
                parForm.appendChild(input); // Append input to the form
            });
        } else {
            console.error('parForm element not found!');
        }

        // Handle save button click
        saveButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission

            const newPars = [];

            // Collect the updated pars
            holePars.forEach((_, index) => {
                const input = document.getElementById(`hole${index + 1}`);
                if (input) {
                    newPars.push(Number(input.value));
                }
            });

            console.log('New Pars:', newPars);
            // Here, you would typically save the newPars array back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

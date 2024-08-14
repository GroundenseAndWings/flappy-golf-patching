document.addEventListener("DOMContentLoaded", function() {
    try {
        const saveButton = document.getElementById('saveButton');
        const terrainCanvas = document.getElementById('terrainCanvas');
        const ctx = terrainCanvas.getContext('2d');

        let drawing = false;
        let terrainVertices = []; // This will store the terrain vertices

        // Example: Decoded vertices from the Base64 string
        const exampleBase64 = `AIB/RAIAykP/v3tEAIDDQwCAeUQAgLpDAIB4RASAsEP//3dE/v+YQwCAdkQAgIxDAEB0RAAA
        gkMAwHBE/P9zQwKAbEQAAGlDAkBnRAAAY0P/P2VE+P9hQ/8/WEQAAGJD/j9YRAAAXUP+/1VE
        /P9cQ/7/VUQAAGJD/j84RAAAYkP+vzJEAABgQwOAK0QIAFVDA8AkRAgAQUMCQCBECAA7QwKA
        G0QIADtDAAAXRPz/QUMBABFEAABVQ/7/C0T8/19D/n8GRAAAZUP+/wFEAABlQ/x/90MAAGND
        BIDnQwgAV0P8f9tD+P9DQ/5/1kMAADlDAQDMQwAAKkP+/8NDAAAiQ/x/vEMAAB9DBACtQwQA
        H0MAAKBDAAAmQwCAl0MAAC9DBACKQwAAQ0MAAIRD+P9JQwIAdEMEAE9DDABnQwAAUEMAAJhC
        +P9PQwgAiEL4/1RDIAB8QgAAX0MwAHhC/P+MQ+D/W0IAgJNDCAA0Qvx/lkPo/xtCBACXQwAA
        AAAAAAJdDIPDAOAAAAAAAAIBEAAAAOf7/f0QAAMlD`;

        const decodedVertices = base64_to_vertices(exampleBase64); // Decode the Base64 string to vertices

        // Draw the initial terrain from the decoded vertices
        function drawTerrain(vertices) {
            if (vertices.length > 0) {
                ctx.beginPath();
                ctx.moveTo(vertices[0][0], vertices[0][1]);
                for (let i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i][0], vertices[i][1]);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }

        drawTerrain(decodedVertices);

        // Start drawing
        terrainCanvas.addEventListener('mousedown', (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            terrainVertices.push([e.offsetX, e.offsetY]);
        });

        // Draw line
        terrainCanvas.addEventListener('mousemove', (e) => {
            if (drawing) {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                terrainVertices.push([e.offsetX, e.offsetY]);
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

            // Convert terrainVertices to Base64 for saving
            const base64Terrain = vertices_to_base64(terrainVertices);

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
                terrain: base64Terrain // Save the terrain as a Base64 string
            };

            console.log('Updated Course Data:', updatedCourseData);
            // Here, you would typically save the updatedCourseData back to your data structure or file
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// Helper functions for base64 conversion
function vertices_to_base64(vertices) {
    const binaryData = vertices.flatMap(vertex => 
        Array.from(new Uint8Array(new Float32Array(vertex).buffer))
    );
    return btoa(String.fromCharCode.apply(null, binaryData));
}

function base64_to_vertices(base64_string) {
    // Sanitize the base64 string by removing any non-base64 characters like spaces and newlines
    const sanitizedBase64 = base64_string.replace(/[\n\r\s]/g, '');

    try {
        const binaryString = atob(sanitizedBase64);
        const binaryData = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
        const vertices = [];

        for (let i = 0; i < binaryData.length; i += 8) {
            const x = new Float32Array(binaryData.slice(i, i + 4).buffer)[0];
            const y = new Float32Array(binaryData.slice(i + 4, i + 8).buffer)[0];
            vertices.push([x, y]);
        }

        return vertices;
    } catch (e) {
        console.error('Failed to decode Base64 string:', e);
        return [];
    }
}

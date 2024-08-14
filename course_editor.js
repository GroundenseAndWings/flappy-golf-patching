// Function to convert vertices to Base64 (encoding)
function verticesToBase64(vertices) {
    let binaryData = '';
    vertices.forEach(vertex => {
        const [x, y] = vertex;
        const buffer = new ArrayBuffer(8); // 2 floats, 4 bytes each
        const view = new DataView(buffer);
        view.setFloat32(0, x, true); // little-endian
        view.setFloat32(4, y, true); // little-endian
        binaryData += String.fromCharCode(...new Uint8Array(buffer));
    });
    return btoa(binaryData);
}

// Function to convert Base64 to vertices (decoding)
function base64ToVertices(base64String) {
    const binaryString = atob(base64String);
    const vertices = [];
    for (let i = 0; i < binaryString.length; i += 8) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        for (let j = 0; j < 8; j++) {
            view.setUint8(j, binaryString.charCodeAt(i + j));
        }
        const x = view.getFloat32(0, true); // little-endian
        const y = view.getFloat32(4, true); // little-endian
        vertices.push([x, y]);
    }
    return vertices;
}

// Example usage within your main code

document.addEventListener("DOMContentLoaded", function() {
    try {
        const saveButton = document.getElementById('saveButton');
        const terrainCanvas = document.getElementById('terrainCanvas');
        const ctx = terrainCanvas.getContext('2d');

        let drawing = false;
        let terrainVertices = []; // This will store the terrain vertices

        // Example Base64 string
        const exampleBase64 = `AIB/RAIAykP/v3tEAIDDQwCAeUQAgLpDAIB4RASAsEP//3dE/v+YQwCAdkQAgIxDAEB0RAAA...`;
        const decodedVertices = base64ToVertices(exampleBase64); // Decode the Base64 string to vertices

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
            const base64Terrain = verticesToBase64(terrainVertices);

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

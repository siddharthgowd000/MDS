const fetch = require('node-fetch');

const predictImage = async (imageUrl) => {
    const data = { image_url: imageUrl };

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        throw new Error('There was a problem with the fetch operation: ' + error.message);
    }
};

module.exports = { predictImage };

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numbers = [];


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDYwOTMwLCJpYXQiOjE3MTcwNjA2MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk5MTFmNjdiLTU2MzQtNGE5Zi1iZGFmLTYzZGIwOGZhNDI4ZSIsInN1YiI6InJpc2hhYmhrcmF3YXRAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiUmlzaGFiaENvbXBhbnkiLCJjbGllbnRJRCI6Ijk5MTFmNjdiLTU2MzQtNGE5Zi1iZGFmLTYzZGIwOGZhNDI4ZSIsImNsaWVudFNlY3JldCI6Ikp0U1ZHQlZyYUZDbFNlQWUiLCJvd25lck5hbWUiOiJSaXNoYWJoIFJhd2F0IEJhcmkiLCJvd25lckVtYWlsIjoicmlzaGFiaGtyYXdhdEBnbWFpbC5jb20iLCJyb2xsTm8iOiIxIn0.Ge03ZxLqL8G7xG_K1b3MhrsTvg_00MIwZFwpx_p9_hs";


const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(`http://20.244.56.144/test/${type}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            timeout: 500 
        });
        return response.data.numbers;
    } catch (error) {
        console.error('Error fetching numbers:', error);
        return [];
    }
};


app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    const validTypes = ['prime', 'fibo', 'even', 'rand'];
    

    if (!validTypes.includes(type)) {
        return res.status(400).send('Invalid number type');
    }

 
    const newNumbers = await fetchNumbers(type);
    const uniqueNewNumbers = [...new Set(newNumbers)]; 


    const prevState = [...numbers];
    

    numbers = [...numbers, ...uniqueNewNumbers].slice(-WINDOW_SIZE);
    
   
    const average = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

 
    res.json({
        windowPrevState: prevState,
        windowCurrState: numbers,
        numbers: uniqueNewNumbers,
        avg: average.toFixed(2),
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Average Calculator API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});

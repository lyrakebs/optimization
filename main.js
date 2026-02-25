const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен для скачивания
const TOKEN = "e2f1c3b9-7d44-4a2f-bb5a-9d1c2f7e5a12";

// Маршрут скачивания
app.get('/download', (req, res) => {
    const auth = req.headers['authorization'];
    if (!auth || auth !== `Bearer ${TOKEN}`) {
        return res.status(401).send('Unauthorized');
    }

    const filePath = path.join(__dirname, 'optimization.bat');
    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

    res.download(filePath); // потоковое скачивание
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

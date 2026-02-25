const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен для авторизации
const SECRET_TOKEN = "my_super_secret_token";
const FILE_PATH = path.join(__dirname, 'secret_file', 'myfile.dat');

app.get('/download', (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || authHeader !== `Bearer ${SECRET_TOKEN}`) {
        return res.status(401).send('Unauthorized');
    }

    if (!fs.existsSync(FILE_PATH)) {
        return res.status(404).send('File not found');
    }

    // Отдаём файл через поток
    const fileStream = fs.createReadStream(FILE_PATH);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="myfile.dat"');
    fileStream.pipe(res);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
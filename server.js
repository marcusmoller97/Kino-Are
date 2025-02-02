import express from 'express';
import { loadMovies } from './src/apiMovies.js';
import initApp from './src/app.js';

const app = initApp(loadMovies());
const PORT = 5080;

// Ensure the 'js' directory exists and contains the 'main.js' file
import fs from 'fs';
const jsDir = 'js';
const mainJsFile = `${jsDir}/main.js`;

if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir);
}

if (!fs.existsSync(mainJsFile)) {
    fs.writeFileSync(mainJsFile, '');
}

// Serve static files from the 'js' directory
app.use('/js', express.static('js'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});

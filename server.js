import initApp from './src/app.js';
import fetch from 'node-fetch';

const app = initApp();
const PORT = 5080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});


//TODO: När användare besöker en filmsida som inte existerar ska en felsida visas och servern svara med korrekt HTTP-status, TODO: ett integrationstest bekräftar att detta fungerar
//TODO: Det ska finnas ett integrationstest som verifierar att filmsidor visar rätt titel
//TODO: 

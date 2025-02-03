import { loadMovies } from './src/apiMovies.js';
import initApp from './src/app.js';

const app = initApp(loadMovies());
const PORT = 5080;



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});

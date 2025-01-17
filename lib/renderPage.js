import fs from 'fs/promises';

const MENU = [
    {
        label: 'Home',
        id: 'home',
        link: '/',
    },
    {
        label: 'Movies',
        id: 'movies',
        link: '/moviesPage.html',
    }
];

export default async function renderPage (response, page) {
    const isMoviePage = page == 'movies'
    response.render(page, {
        menuItems: MENU.map((item) => {
            console.log(item)
            return {
                label: item.label,
                link: item.link,
                active: item.id == page,
            };
        })
    });
}

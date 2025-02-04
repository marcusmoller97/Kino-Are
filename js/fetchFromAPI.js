// to append screenings info from movie
addEventListener('DOMContentLoaded', async () => {
    try {

        const id = window.location.pathname.split('/').slice(-1).pop();

        const response = await fetch(`/screenings/upcoming/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let screenings = await response.json();

        const screeningsDiv = document.querySelector('.screeningsTable');

        if (screenings.length > 0) {
            console.log("Denna är inte tom");

            const screeningsH3 = document.createElement('h3');
            const list = document.createElement('ul');
            // to get wich weekday.
            const weekday = {
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednsday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday',
                7: 'Sunday'
            };
            screenings.forEach((item) => {
                // formate date to day month year time
                const date = new Date(item.attributes.start_time);
                const formateedDate = date.toLocaleString('sv-Se', {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });

                const screeningDay = weekday[date.getDay()];
                const listItem = document.createElement('li');
                listItem.innerHTML = `${item.attributes.room}: ${screeningDay} ${formateedDate}`;
                console.log(item.attributes.start_time);
                // append listItem to list
                list.append(listItem);
            });

            // append list to screening
            screeningsDiv.append(list);

        } else if (screenings.length === 0) {
            const noScreenings = document.createElement('h3');
            noScreenings.innerHTML = 'No upcoming screenings';

            screeningsDiv.append(noScreenings);
        }


    } catch (error) {
        console.error(error);
    }
});

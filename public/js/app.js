console.log('Clinet side javascript file is loded!');


const weatherForm = document.getElementById('weather-form')
const search = document.getElementById('inputaddr');
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';

    var address = search.value;
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                console.log(data.forcast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;

            }

        })
    })
})
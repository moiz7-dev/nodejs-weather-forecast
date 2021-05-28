const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const myLocationWeather = document.querySelector('#myLocation');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    address = search.value

    messageOne.innerText = 'Loading...'
    messageTwo.innerText = ''

    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if (data.error) 
                return messageOne.innerText = data.error
            
                messageOne.innerText = data.location
                messageTwo.innerText = data.forecast
        })
    })

});

myLocationWeather.addEventListener('click', () => {
    messageOne.innerText = 'Loading...'
    messageTwo.innerText = ''

    navigator.geolocation.getCurrentPosition((response) => {
        let latitude = response.coords.latitude
        let longitude = response.coords.longitude
        
        fetch('/your-weather?lat='+latitude+'&long='+longitude).then((response) => {
            response.json().then((data) => {
                if (data.error)
                    return messageOne.innerText = data.error

                messageOne.innerText = data.location
                messageTwo.innerText = data.forecast
            })
        })
    })
})

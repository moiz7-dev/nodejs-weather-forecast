const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

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

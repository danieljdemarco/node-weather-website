const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const forecastIcon = document.querySelector('#forecast-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = searchElement.value
    
    setMessage('loading...', '')
    forecastIcon.src = ''

    fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return setMessage(data.error, '')
            }
            setMessage(data.location, data.forecast)
            forecastIcon.src = data.icon
        })
    })
})

const setMessage = (stringA, stringB) => {
    messageOne.textContent = stringA
    messageTwo.textContent = stringB
}
const $weatherForm = document.querySelector('form')
const $searchElement = document.querySelector('input')
const $messageOne = document.querySelector('#message-1')
const $messageTwo = document.querySelector('#message-2')
const $forecastIcon = document.querySelector('#forecast-icon')
const $currentLocationButton = document.querySelector('#current-location')

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            showWeather({ position })
        })
    }
}

getCurrentLocationWeather()

$currentLocationButton.addEventListener('click', (e) => {
    getCurrentLocationWeather()
})

$weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = $searchElement.value
    showWeather({ address })
})

const showWeather = ({ address, position }) => {
    displayLoading()
    if (address) {
        fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
            displayWeather(response)
        })
    } else if (position) {
        fetch(`/weather?coords=${position.coords.latitude},${position.coords.longitude}`).then((response) => {
            displayWeather(response)
        })
    } else {
        setMessage('Please provide an address or enable location.', '')
    }
}

const displayLoading = () => {
    setMessage('loading...', '')
    $forecastIcon.src = ''
}

const displayWeather = (response) => {
    response.json().then((data) => {
        if (data.error) {
            return setMessage(data.error, '')
        }
        setMessage(data.location, data.forecast)
        $forecastIcon.src = data.icon
    })
}

const setMessage = (stringA, stringB) => {
    $messageOne.textContent = stringA
    $messageTwo.textContent = stringB
}
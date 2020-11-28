console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = searchElement.value
    
    setMessage('loading...', '')

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return setMessage(data.error, '')
            }
            setMessage(data.location, data.forecast)
        })
    })
})

const setMessage = (stringA, stringB) => {
    messageOne.textContent = stringA
    messageTwo.textContent = stringB
}
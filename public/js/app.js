console.log('Client side JS is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  message1.textContent = 'loading...'
  message2.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then(({error, location, forecast}) => {
      if (error) {
        message1.textContent = error
      } else {
        message1.textContent = location
        message2.textContent = forecast
      }
    })
  })
})


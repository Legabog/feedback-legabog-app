import {Feedback} from './feedback'
import {createModal, isValid} from './utils'
import {authWithEmailAndPassword, getAuthForm} from './auth'
import './styles.css'



const form = document.getElementById('form')
const modalbtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitbtn = form.querySelector('#submit')





window.addEventListener('load', Feedback.renderList)
form.addEventListener('submit', submitFormHandler)
modalbtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
  submitbtn.disabled = !isValid(input.value)

})



function submitFormHandler(event) {
  event.preventDefault()

  if (isValid(input.value)) {
    const feedback = {
      text: input.value.trim(),
      date: new Date().toJSON()

    }



    submitbtn.disabled = true

    // Async request to server to save question

    Feedback.create(feedback).then(() => {

      input.value = ''
      input.className = ''
      submitbtn.disabled = false

    })

  }

}



function openModal() {
  createModal('Authorization', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true})
}



function authFormHandler(event) {
  event.preventDefault()

  const btn = event.target.querySelector('button')
  const email = event.target.querySelector('#email').value
  const password = event.target.querySelector('#password').value

  btn.disabled = true

  authWithEmailAndPassword(email, password)
    .then(Feedback.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)

}

function renderModalAfterAuth(content) {

  if (typeof content === 'string') {
    createModal('Error!', content)
  } else {
    createModal('List of feedbacks', Feedback.listtohtml(content))
  }

}


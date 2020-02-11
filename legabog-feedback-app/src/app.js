import {Feedback} from './feedback.js'
import {isValid, createModal} from './utils'
import './styles.css'
import { getAuthForm, authwithemailandpassword } from './auth.js'



const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitbtn = form.querySelector('#submit')
const modalbtn = document.getElementById('modalbtn')

modalbtn.addEventListener('click', openmodal)
form.addEventListener('submit', submitFormHandler)
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

        Feedback.create(feedback).then(() => {
            input.value = ''
            input.className = ''
            submitbtn.disabled = false
      
          })
      
        }
      
    }

function openmodal() {
    createModal('Authorization', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authformhandler, {once: true})
}

function authformhandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true
    authwithemailandpassword(email, password)
    
        .then(Feedback.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disable = false)
        
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Error', content)
    } else {
        createModal('List of feedbacks', Feedback.listtohtml(content))
    }
}


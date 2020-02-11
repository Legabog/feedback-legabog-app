export class Feedback {
    static create(feedback) {
        fetch('https://legabog-feedback-app.firebaseio.com/feedbacks.json', {
            method: 'POST',
            body: JSON.stringify(feedback),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                feedback.id = response.name
                return feedback
            })
            .then(addToLocalStorage)
            .then(Feedback.renderList)

    }

    static fetch(token) {
        if(!token) {
            return Promise.resolve('<p class="error">You have not token</p>')
        }
        return fetch(`https://legabog-feedback-app.firebaseio.com/feedbacks.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if ( response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })

    }

    static renderList() {
        const feedbacks = getQuestionsFromLocalStorage()
        const html = feedbacks.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">You have not feedbacks yet</div>`
    
    
    
        const list = document.getElementById('list')
    
    
    
        list.innerHTML = html
    
      }

    static listtohtml(feedbacks) {
        return feedbacks.length
        ? `<ol>${feedbacks.map(f => `<li>${f.text}</li>`).join('')}</ol>`
        : `<p>No feedbacks yet</p>`
    }

}



function addToLocalStorage(feedback) {
    const all = getFeedbacksFromLocalStorage()
    all.push(feedback)
    localStorage.setItem('feedbacks', JSON.stringify(all))

}

function getFeedbacksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('feedbacks') || '[]')
}

function toCard(feedback) {
    return `
    <div class="mui--text-black-54">
        ${new Date(feedback.date).toLocaleDateString()}
        ${new Date(feedback.date).toLocaleTimeString()}
    </div>
    <div>${feedback.text}</div>
    <br>
    `
}
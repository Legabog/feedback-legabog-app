export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email" required">
      <label for="email">Email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required">
      <label for="password">Password</label>
    </div>
    <button 
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--accent"
      >
      Enter
    </button>
    </form>
    `

}

export function authwithemailandpassword(email, password) {
    const apikey = `AIzaSyBMXDefvD78emWyCWWwhPZ4h5O2hlnIEeE`
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}
// Initialize Supabase client
const supabaseUrl = 'https://shntgjzkuzxpjlfbgcoe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobnRnanprdXp4cGpsZmJnY29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTM2MTQsImV4cCI6MjA0MDg4OTYxNH0.9zF7hydgrAaLGSIRMXieG2BUuC4y7FqQO-I8jNaV4GA'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

// Function to show Auth UI
function showAuthUI() {
    const authContainer = document.getElementById('auth-container')
    ReactDOM.render(
        React.createElement(supabaseAuthUi.Auth, {
            supabaseClient: supabase,
            appearance: { theme: supabaseAuthUi.ThemeSupa },
            providers: ['email']
        }),
        authContainer
    )
}

// Event listeners for login and signup buttons
document.getElementById('loginBtn').addEventListener('click', showAuthUI)
document.getElementById('signupBtn').addEventListener('click', showAuthUI)

// Download button functionality
document.getElementById('downloadBtn').addEventListener('click', () => {
    // Replace with your Chrome Web Store URL when available
    window.open('https://chrome.google.com/webstore', '_blank')
})

// Check if user is already logged in
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        console.log('User is signed in:', session.user)
        document.getElementById('loginBtn').textContent = 'Logout'
        document.getElementById('loginBtn').removeEventListener('click', showAuthUI)
        document.getElementById('loginBtn').addEventListener('click', logout)
    } else if (event === 'SIGNED_OUT') {
        console.log('User is signed out')
        document.getElementById('loginBtn').textContent = 'Login'
        document.getElementById('loginBtn').removeEventListener('click', logout)
        document.getElementById('loginBtn').addEventListener('click', showAuthUI)
    }
})

async function logout() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        console.log('Logged out successfully')
    } catch (error) {
        console.error('Error logging out:', error.message)
    }
}

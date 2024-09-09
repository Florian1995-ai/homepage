// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    loginBtn.addEventListener('click', async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
            console.log('Logged in:', data);
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Failed to log in. Please try again.');
        }
    });

    signupBtn.addEventListener('click', async () => {
        const email = prompt('Enter your email:');
        const password = prompt('Enter your password:');
        if (!email || !password) return;

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            console.log('Signed up:', data);
            alert('Check your email to confirm your account!');
        } catch (error) {
            console.error('Error signing up:', error.message);
            alert('Failed to sign up. Please try again.');
        }
    });

    downloadBtn.addEventListener('click', () => {
        // Replace with your Chrome Web Store URL when available
        window.open('https://chrome.google.com/webstore', '_blank');
    });

    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            console.log('User is signed in:', session.user);
            loginBtn.textContent = 'Logout';
            loginBtn.removeEventListener('click', login);
            loginBtn.addEventListener('click', logout);
        } else if (event === 'SIGNED_OUT') {
            console.log('User is signed out');
            loginBtn.textContent = 'Login';
            loginBtn.removeEventListener('click', logout);
            loginBtn.addEventListener('click', login);
        }
    });
});

async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
}

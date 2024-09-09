// Initialize Supabase client
const supabaseUrl = 'https://shntgjzkuzxpjlfbgcoe.supabase.co';  // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobnRnanprdXp4cGpsZmJnY29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTM2MTQsImV4cCI6MjA0MDg4OTYxNH0.9zF7hydgrAaLGSIRMXieG2BUuC4y7FqQO-I8jNaV4GA';  // Replace with your Supabase anonymous key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const authContainer = document.getElementById('auth-container');

    // Render Supabase Auth UI when login button is clicked
    loginBtn.addEventListener('click', async () => {
        // Clear any existing content in the auth container
        authContainer.innerHTML = '';

        // Render the Supabase Auth UI directly in the auth-container
        const { Auth } = supabase.auth;

        const signInElement = Auth.authSignIn({ 
            supabaseClient: supabase, 
            providers: ['google', 'github'], // Add OAuth providers if needed
            redirectTo: window.location.origin,  // Ensure correct redirect URL
        });

        // Append the Supabase Auth UI to the container
        authContainer.appendChild(signInElement);
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            console.log('User signed in:', session.user);
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = async () => {
                await supabase.auth.signOut();
                loginBtn.textContent = 'Login / Sign Up';
            };
        }
    });
});

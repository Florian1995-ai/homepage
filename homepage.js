import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://shntgjzkuzxpjlfbgcoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNobnRnanprdXp4cGpsZmJnY29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMTM2MTQsImV4cCI6MjA0MDg4OTYxNH0.9zF7hydgrAaLGSIRMXieG2BUuC4y7FqQO-I8jNaV4GA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Login functionality
document.querySelector('.btn-login').addEventListener('click', async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        if (error) throw error;
        console.log('Logged in:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// Sign up functionality
document.querySelector('.btn-signup').addEventListener('click', async () => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: prompt('Enter your email:'),
            password: prompt('Enter your password:')
        });
        if (error) throw error;
        console.log('Signed up:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// Download button functionality
document.querySelector('.btn-download').addEventListener('click', () => {
    // Replace with your Chrome Web Store URL when available
    window.open('https://chrome.google.com/webstore', '_blank');
});

console.log('JavaScript loaded');
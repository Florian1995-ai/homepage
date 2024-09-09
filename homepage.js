import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

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

document.querySelector('.btn-download').addEventListener('click', () => {
    // Replace with your Chrome Web Store URL when available
    window.open('https://chrome.google.com/webstore', '_blank');
});

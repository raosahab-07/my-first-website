const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://yylkfhsabbeolxqclpji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bGtmaHNhYmJlb2x4cWNscGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNjQwODQsImV4cCI6MjA4NTc0MDA4NH0.AUw-e6_Z4_KDSFXlZainpvoBhH_P2f7No8hNXm3Vlmw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
    console.log('Attempting to create user...');
    const { data, error } = await supabase.auth.signUp({
        email: 'raushanyadav2811.r@gmail.com',
        password: '1234567890@Rky',
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created successfully:', data.user.email);
        console.log('NOTE: You might still need to confirm the email if email confirmation is enabled.');
    }
}

createAdmin();

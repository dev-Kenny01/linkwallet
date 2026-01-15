// Initialize Supabase
const SUPABASE_URL = 'https://lchbeieopbkrpcrmxuiq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaGJlaWVvcGJrcnBjcm14dWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MjUyNzcsImV4cCI6MjA4NDAwMTI3N30.Igf1ez9vmXGlNGPn-Yd-nbSA_og4yqyx-39jt64KypQ';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function: Check if Access ID exists
async function checkUserExists(accessId) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('access_id', accessId)
    .single();

  if (error && error.code === 'PGRST116') {
    return false; // Not found
  }
  return !!data;
}

// Function: Get current user data
async function getCurrentUserData() {
  const accessId = localStorage.getItem('Hexawallet_access_id');
  if (!accessId) return null;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('access_id', accessId)
    .single();

  return data;
}

// Function: Save wallet/bank info
async function saveUserData(wallet, bank) {
  const accessId = localStorage.getItem('Hexawallet_access_id');
  if (!accessId) return false;

  const { error } = await supabase
    .from('users')
    .update({
      wallet_address: wallet || null,
      bank_account: bank || null,
      link_status: 'pending'
    })
    .eq('access_id', accessId);

  return !error;
}
// import { Client, Account } from "appwrite";

// // Initialize the Appwrite client
// const client = new Client();
// const account = new Account(client);

// client
//     .setEndpoint("https://cloud.appwrite.io/v1/") // Replace with your Appwrite endpoint
//     .setProject("677c889b0025d387844b"); // Replace with your project ID

// // Export the client and account for reuse
// export { client, account };





import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gqyrnuhzxppdletgnjfj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxeXJudWh6eHBwZGxldGduamZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMDI5NzEsImV4cCI6MjA1MTg3ODk3MX0.xYW22-m_LZys2EmqFqMfWtu-aGWJ7pDXw5qrigcUvNo'


export const supabase = createClient(supabaseUrl, supabaseKey)
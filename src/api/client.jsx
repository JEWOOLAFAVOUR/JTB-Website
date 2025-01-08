import { Client, Account } from "appwrite";

// Initialize the Appwrite client
const client = new Client();
const account = new Account(client);

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("677c889b0025d387844b"); // Replace with your project ID

// Export the client and account for reuse
export { client, account };

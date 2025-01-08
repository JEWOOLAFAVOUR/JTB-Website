import { account } from "./client"; // assuming client is set up correctly

export const loginUser = async (email, password) => {
    try {
        // This should work if you provide the correct email and password
        const session = await account.createSession(email, password);
        console.log("User logged in:", session);
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

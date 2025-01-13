
export const makeSecurity = (type, data) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const phonePattern = /^0\d{10}$/;

    const errors = [];

    if (type === 'login') {
        const { email, password } = data;
        if (!email || email.trim() === "") {
            errors.push("Enter a Valid Email Address");
        } else if (!emailPattern.test(email)) {
            errors.push("Enter a Valid Email Address");
        }

        if (!password || password.trim() === "") {
            errors.push("Enter a Valid Password");
        }
    }


    return errors;
};

// export const baseUrl = 'http://localhost:5173/verify-sirts';
export const baseUrl = "https://jtb-website.vercel.app/verify"
import client from "./client";

const makeApiRequest = async (method, endpoint, data) => {
    try {
        const response = await client.request({
            method,
            url: endpoint,
            data // add the data parameter to the request options
        });
        return { data: response.data, status: response.status };
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return { data: response.data, status: response.status };
        }
        return { error: error.message || error };
    }
};


// COURSES 
export const fetchAllCourses = async (data) => {
    const response = await makeApiRequest('GET', '/quiz/get-all-course', data);
    return response;
};

export const createCourse = async (data) => {
    const response = await makeApiRequest('POST', '/quiz/create-course', data);
    return response;
};

export const editCourse = async (data) => {
    const response = await makeApiRequest('POST', '/quiz/create-course', data);
    return response;
};

export const deleteCourse = async (courseId) => {
    const response = await makeApiRequest('DELETE', `/quiz/delete-course/${courseId}`);
    return response;
};

export const updateCourse = async (id, data) => {
    const response = await makeApiRequest('PUT', `/quiz/update-course/${id}`, data);
    return response;
};

// QUESTION BANK 

export const addQuestionToQuestionBank = async (data) => {
    const response = await makeApiRequest('POST', `/quiz/add-question-question-bank`, data);
    return response;
};

export const getQuestionsOfQuestionBank = async (questionBankId) => {
    const response = await makeApiRequest('GET', `/quiz/get-question-bank-question/${questionBankId}`,);
    return response;
};

// DEPARTMENTS 
export const getAllDepartment = async () => {
    const response = await makeApiRequest('GET', `/user/get-all-department`,);
    return response;
};

export const createDepartment = async (data) => {
    const response = await makeApiRequest('POST', `/user/create-department`, data);
    return response;
};

// LESSONS

export const createLesson = async (data) => {
    const response = await makeApiRequest('POST', `/quiz/create-lesson`, data);
    return response;
};

export const getCourseLessons = async (courseId) => {
    const response = await makeApiRequest('GET', `/quiz/get-lesson-for-course/2/${courseId}`,);
    return response;
};

export const updateLesson = async (lessonId, data) => {
    const response = await makeApiRequest('PUT', `/quiz/lesson/edit/${lessonId}`, data);
    return response;
};


// LESSON QUESTIONS

export const getLessonsQuestions = async (lessonId) => {
    const response = await makeApiRequest('GET', `/quiz/get-lesson-question-2/${lessonId}`,);
    return response;
};

export const editLessonsQuestions = async (data) => {
    const response = await makeApiRequest('PUT', `/quiz/edit-lesson-question`, data);
    return response;
};

export const deleteLessonsQuestions = async (data) => {
    const response = await makeApiRequest('DELETE', `/quiz/delete-lesson-question`, data);
    return response;
};


export const addQuestionToLesson = async (data) => {
    const response = await makeApiRequest('POST', `/quiz/create-lesson-question`, data);
    return response;
};


// PAST QUESTIONS 

export const createPastQuestion = async (data) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("year", data.year);
    formData.append("university", data.university);

    // Append each image file to the formData object
    data.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
    });


    const response = await makeApiRequest('POST', `/past-question/create-past-question`, formData);
    return response;
};



export const getAllPastQuestions = async () => {
    const response = await makeApiRequest('GET', `/past-question/get-all-past-question-2`,);
    return response;
};


export const getPastQuestionById = async (id) => {
    const response = await makeApiRequest('GET', `/past-question/get-past-question/${id}`,);
    return response;
};

export const deletePastQuestion = async (id) => {
    const response = await makeApiRequest('DELETE', `/past-question/${id}`,);
    return response;
};

export const updatePastQuestion = async (id, data) => {
    const response = await makeApiRequest('PUT', `/past-question/${id}`, data);
    return response;
};


// ANNOUNCEMENT 

export const createAnnouncement = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("available", data.available)

    data.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
    });


    const response = await makeApiRequest('POST', `/user/announcement/create`, formData);
    return response;
};

export const getAnnouncement = async () => {
    const response = await makeApiRequest('GET', `/user/announcement/get-all`);
    return response;
};

export const changeAnnouncementStatus = async (announcementId) => {
    const response = await makeApiRequest('PUT', `/user/announcement/change-status/${announcementId}`);
    return response;
};

// ANALYTICS

export const createAds = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("available", data.available)

    data.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
    });

    const response = await makeApiRequest('POST', `/user/ads/create`, formData);
    return response;
};

export const getAds = async () => {
    const response = await makeApiRequest('GET', `/user/ads/get-all`,);
    return response;
};


// PREMIUM

export const getPremiumUsers = async (universityId) => {
    const response = await makeApiRequest('GET', `/user/premium-users/${universityId}`,);
    return response;
};

// CONTEST
export const createContest = async (data) => {
    const response = await makeApiRequest('POST', `/quiz/contest`, data);
    return response;
};

export const getContest = async (data) => {
    const response = await makeApiRequest('GET', `/quiz/contest`, data);
    return response;
};

export const editContest = async (contestId, data) => {
    const response = await makeApiRequest('PUT', `/quiz/contest/${contestId}`, data);
    return response;
};

// PUBLISH CONTEST
export const publishContest = async (contestId) => {
    const response = await makeApiRequest('POST', `/quiz/contest/publish/${contestId}`, data);
    return response;
};
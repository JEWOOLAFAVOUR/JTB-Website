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


export const loginUser = async (data) => {
    const response = await makeApiRequest('POST', '/user/login-user', data);
    return response;
};


export const getProfile = async (data) => {
    const response = await makeApiRequest('GET', '/user/find', data);
    return response;
};


export const fetchUniversity = async () => {
    const response = await makeApiRequest('GET', '/user/university',);
    return response;
};

export const editProfile = async (data) => {
    const response = await makeApiRequest('PUT', '/user/edit-profile', data);
    return response;
};

// ALL USERS 
export const getAllUser = async (data) => {
    const response = await makeApiRequest('GET', '/user/get-all-user', data);
    return response;
};



export const appOpens = async () => {
    const response = await makeApiRequest('GET', '/user/analytics/app-opens',);
    return response;
};

// ANNOUNCEMENT    

export const createAnnouncement = async () => {
    const response = await makeApiRequest('POST', 'user/announcement/create',);
    return response;
};

export const getAllAnnouncement = async () => {
    const response = await makeApiRequest('GET', '/user/announcement/get-all',);
    return response;
};

export const changeAnnouncementStatus = async () => {
    const response = await makeApiRequest('PUT', `/user/announcement/change-status/${announcementId}`,);
    return response;
};

export const fetchDashboard = async () => {
    const response = await makeApiRequest('GET', '/user/analytics/dashboard',);
    return response;
};

export const getUserChannel = async (data) => {
    const response = await makeApiRequest('GET', '/rep/channel/user', data);
    return response;
};

export const createChannelCourse = async (data) => {
    const response = await makeApiRequest('POST', '/rep/manuals', data);
    return response;
};

export const getChannelCourses = async (channelId) => {
    const response = await makeApiRequest('GET', `/rep/channel/${channelId}`,);
    return response;
};


export const generateChannelLink = async (channelId) => {
    const response = await makeApiRequest('GET', `/rep/channel/generate-link/${channelId}`,);
    return response;
};


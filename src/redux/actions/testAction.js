import { PAST_QUESTIONS, TEST_DATA, UPDATE_CHANNEL_ID, UPDATE_CHANNEL_ID2, UPDATE_COURSE_DETAIL } from "../constants/constants"


export const updateTestData = (test) => {
    return {
        type: TEST_DATA,
        test,
    }
}



export const updateChannelId = (channelId) => {
    return {
        type: UPDATE_CHANNEL_ID,
        channelId,
    }
}

export const updateChannelCourses = (courses) => {
    return {
        type: UPDATE_COURSE_DETAIL,
        courses,
    }
}
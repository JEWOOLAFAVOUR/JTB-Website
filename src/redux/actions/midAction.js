import { GET_CHANNEL, GET_QUESTIONS, } from "../constants/constants";
export const updateQuestion = (questions) => {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}


export const updateChannel = (channel) => {
    return {
        type: GET_CHANNEL,
        channel,
    }
}

import { PAST_QUESTIONS, UPDATE_LEADERBOARD } from "../constants/constants"



export const updatePastQuestions = (pastQuestions) => {
    return {
        type: PAST_QUESTIONS,
        pastQuestions,
    }
}

export const updateLeaderboard = (leaderboard) => {
    return {
        type: UPDATE_LEADERBOARD,
        leaderboard,
    }
}
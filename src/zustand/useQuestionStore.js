import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuestionStore = create(
    persist(
        (set, get) => ({
            draftQuestions: {},  // Keyed by lessonId
            setDraftQuestions: (lessonId, questions) =>
                set(state => ({
                    draftQuestions: {
                        ...state.draftQuestions,
                        [lessonId]: questions
                    }
                })),
            clearDraftQuestions: (lessonId) =>
                set(state => {
                    const newDrafts = { ...state.draftQuestions };
                    delete newDrafts[lessonId];
                    return { draftQuestions: newDrafts };
                }),
            getDraftQuestions: (lessonId) => {
                const state = get();
                return state.draftQuestions[lessonId] || [];
            }
        }),
        {
            name: 'question-drafts'
        }
    )
);

export default useQuestionStore;
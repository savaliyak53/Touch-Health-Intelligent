import APIClient from '../utils/axios';

export const getGoals = async () => {
    return APIClient(`/ai/goals/active`);
}

export const getGoalsSuggestion = async () => {
    return APIClient(`/ai/goals/suggested`);
} 

export const getGoalsSearch = async (search: string) => {
    return APIClient(`/ai/goals/search?q=${search}`, 'get');
};

export const addGoal = async (data: any) => {
    return APIClient(`/ai/goals/active`, 'put', data);
};

export const deleteGoal = async (id?: string) => {
    return APIClient(`/ai/goals/active/${id}`, 'delete');
};

export const goalDetails = async (goalId: string) => {
    return APIClient(`/ai/goals/${goalId}/data`);
    // return goalDetail;
};
import APIClient from '../utils/axios';

const suggested = [
  {
      "id": "abc",
      "name": "Optimal Sleep",
      "acronym": "OS",
      "description": "",
      "goal_class": "optimal",
      "color": "394A7E",
      "info_image": "data:image/png;base64,..."
  },
  {
      "id": "def",
      "name": "Diabetes Management",
      "acronym": "DM",
      "description": "",
      "goal_class": "optimal",
      "color": "397E79",
      "info_image": "data:image/png;base64,..."
  },
  {
      "id": "ghi",
      "name": "Cancer Remission",
      "acronym": "OS",
      "description": "",
      "goal_class": "optimal",
      "color": "61397E",
      "info_image": "data:image/png;base64,..."
  },
  {
    "id": "jkl",
    "name": "Insomina Prevention",
    "acronym": "IP",
    "description": "",
    "goal_class": "optimal",
    "color": "F0962D",
    "info_image": "data:image/png;base64,..."
  }

]

const goals = [
  {
    "id": "jkl",
    "name": "Insomina Prevention",
    "acronym": "IP",
    "description": "",
    "goal_class": "optimal",
    "color": "F0962D",
    "info_image": "data:image/png;base64,..."
  }
]

export const getGoals = async () => {
    return APIClient(`/ai/goals/active`);
    // return {data:goals}
}

export const getGoalsSuggestion = async () => {
    return APIClient(`/ai/goals/suggested`);
    // return {data:suggested}
} 

export const getGoalsSearch = async (search: string) => {
    return APIClient(`/ai/goals/search?q=${search}`, 'get');
};

export const addGoal = async (data: any) => {
    return APIClient(`/ai/goals/active`, 'put', data);
};

export const deleteGoal = async (id: string) => {
    return APIClient(`/ai/goals/active/${id}`, 'delete');
};
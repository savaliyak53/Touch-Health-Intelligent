import { IDropDownOptionsItem } from 'interfaces';

export const securityQuestions: IDropDownOptionsItem[] = [
  {
    id: '1',
    text: 'In what city were you born?',
  },
  {
    id: '2',
    text: 'What is the name of your favorite pet?',
  },
  {
    id: '3',
    text: "What is your mother's maiden name?",
  },
  {
    id: '4',
    text: 'What high school did you attend?',
  },
  {
    id: '5',
    text: 'What was the make of your first car?',
  },
];
export const tooltipContent = {
  dashboardText: 'This is your dashboard. From here you can see your Goal scores, and Data scores for each of your goals. Go ahead and click on them to explore more. You can configure your goals by tapping the "+" button.',
  streakText: 'This visualizes which days you have done a Checkup. A streak is when you have an unbroken chain of days with complete Checkups.',
}
export const backButtonContent = {
  dashboardText: 'Going back won\'t take you to the previous page but stay on the dashboard.',
  layoutText: 'Going back won\'t take you to the previous page but to your dashboard page. Are you sure you want to go there?',
  preventText: 'You cannot go back from here.'
}

export const socketPath = {
 LIFESTYLE_DIMENSION: "/v1/ai/lifestyle-dimensions/{dimension_id}",
 CONDITION_DIMENSION:"/v1/ai/condition-dimensions/{dimension_id}",
 LIFESTYLE_DIMENSION_INFLUENCERS:"/v1/ai/lifestyle-dimensions/{dimension_id}/influencers/{influencer_id}",
 CONDITON_DIMENSION_INFLUENCERS:"/v1/ai/condition-dimensions/{dimension_id}/influencers/{influencer_id}",
 LIFESTYLE_DIMENSION_GUIDANCES:"/v1/ai/lifestyle-dimensions/{dimension_id}/guidances/{guidance_id}",
 CONDITON_DIMENSION_GUIDANCES:"/v1/ai/condition-dimensions/{dimension_id}/guidances/{guidance_id}"
}

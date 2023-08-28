import { IPredictionGraphList } from '../interfaces';

export const createValueForGraph = ({date, score, emoji}: IPredictionGraphList): string => {
  return `${date}_${score}_${emoji}`;
}
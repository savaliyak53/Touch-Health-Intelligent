import { IPredictionGraphList } from '../interfaces';

export const createValueForGraph = ({dt, score, emoji}: IPredictionGraphList): string => {
  return `${dt}_${score}_${emoji}`;
}
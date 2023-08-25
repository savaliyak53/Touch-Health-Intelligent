import { EmojiLevelTypes } from '../interfaces';
import { emojis } from '../constants/emoji';

const getLevel = (value: number): EmojiLevelTypes => {
  if (value <= 20) {
    return 'veryLow';
  } else if (value <= 40) {
    return 'low';
  } else if (value <= 60) {
    return 'neutral';
  } else if (value <= 80) {
    return 'high';
  }
  return 'critical';
}

export const getEmoji = (type: string, value: number): string => {
  const level: EmojiLevelTypes = getLevel(value);
  if (emojis[type]) {
    return emojis[type][level] || '-';
  }
  return '-';
}

export const getNextDays = (): string[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return ['Today', daysOfWeek[(today + 1) % 7], daysOfWeek[(today + 2) % 7]];
}
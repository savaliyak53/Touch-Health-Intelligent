import React from 'react';
import goal_styles from '../IntroGoals.module.scss';

export default function ImageAndtext({ question }: any) {
  return (
    <div className={goal_styles['IntroGoals']}>
      <h2 className={goal_styles['Title']}>{question.title}</h2>
      <p className={goal_styles['Description']}>{question.sub_title}</p>
      <img src={question.image} className={goal_styles['Image']} alt="Image" />
    </div>
  );
}

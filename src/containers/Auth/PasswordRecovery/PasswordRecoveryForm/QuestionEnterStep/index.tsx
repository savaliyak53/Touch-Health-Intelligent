import React, { ChangeEvent, useState } from 'react';
import Button from '../../../../../components/Button';
import styles from '../../../Login/Login.module.scss';
import passwordStyles from '../../PasswordRecovery.module.scss';
import TouchInput from '../../../../../components/TouchInput';
import { Tooltip } from 'antd';
import TouchDropdown from '../../../../../components/TouchDropdown';

interface IProps {
  confirmAnswer: () => void;
  question: string;
  setAnswer: (string: string) => void;
  answer: string;
}

const QuestionEnterStep: React.FC<IProps> = ({
  confirmAnswer,
  question,
  setAnswer,
  answer,
}) => {

  const [isReuired, setIsReuired] = useState(false);

  const handlerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
    setIsReuired(false);
  }
  const handlerOnSubmit = () => {
    if (answer) {
      confirmAnswer();
    } else {
      setIsReuired(true)
    }
  }

  return (
    <div className={styles.Form}>
      <h1 className={styles.Title}>Security Question</h1>
      <p className={passwordStyles['Security-Description']}>
        Please help us protect your account. Select a security question and
        input answer. You can use this to get back access to your account.
      </p>
      <TouchDropdown placeholder={question}/>
      <TouchInput
        value={answer}
        design="answer"
        placeholder="Answer"
        type="text"
        onChange={handlerOnChange}
      />
      <Button
        onClick={handlerOnSubmit}
        className={styles.LoginButton}
      >
        Submit
      </Button>
      <Tooltip
        color="orange"
        placement="bottom"
        title={isReuired ? 'Answer is required' : ''}
        open={isReuired}
      />
    </div>
  );
};

export default QuestionEnterStep;

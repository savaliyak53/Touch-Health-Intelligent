import React, { ChangeEvent, useState } from 'react';
import TouchInput from 'components/TouchInput';
import TouchDropdown from 'components/TouchDropdown';
import TouchButton from 'components/TouchButton';

interface IProps {
  confirmAnswer: () => void;
  question: string;
  setAnswer: (string: string) => void;
  setWrongAnswer: (bool: boolean) => void;
  answer: string;
  isLoading: boolean;
  wrongAnswer: boolean;
}

const QuestionEnterStep: React.FC<IProps> = ({
  confirmAnswer,
  question,
  setAnswer,
  answer,
  wrongAnswer,
  setWrongAnswer,
  isLoading
}) => {

  const [isRequired, setIsRequired] = useState(false);

  const handlerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
    setIsRequired(false);
  }
  const handlerOnSubmit = () => {
    if (answer) {
      confirmAnswer();
    } else {
      setIsRequired(true)
    }
  }

  const getErrorMessage = (): string => {
    if (isRequired) {
      return 'Answer is required';
    } else if (wrongAnswer) {
      return 'Wrong answer to security question';
    }
    return '';
  }

  const handlerResetError = () => {
    setIsRequired(false)
    setWrongAnswer(false);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Security Question</h1>
      <p className='font-normal font-roboto text-base mb-2.5 text-justify'>
        Please help us protect your account. Select a security question and
        input answer. You can use this to get back access to your account.
      </p>
      <TouchDropdown value={question}/>
      <TouchInput
        value={answer}
        placeholder="Answer"
        type="text"
        errorMessage={getErrorMessage()}
        resetError={handlerResetError}
        onChange={handlerOnChange}
      />
      <TouchButton
        className='mt-8'
        type='auth'
        onClick={handlerOnSubmit}
        isLoading={isLoading}
      >
        Submit
      </TouchButton>
    </div>
  );
};

export default QuestionEnterStep;

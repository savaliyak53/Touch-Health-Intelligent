import React, { ChangeEvent, useState } from 'react';
import TouchInput from 'components/TouchInput';
import TouchDropdown from 'components/TouchDropdown';

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
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-primary-delft-dark font-tilt-warp font-normal text-[22px] leading-[36px] opacity-80 text-center mb-4'>Security Question</h1>
      <p className='font-normal font-roboto text-base mb-2.5 text-justify'>
        Please help us protect your account. Select a security question and
        input answer. You can use this to get back access to your account.
      </p>
      <TouchDropdown placeholder={question}/>
      <TouchInput
        value={answer}
        placeholder="Answer"
        type="text"
        errorMessage={isReuired ? 'Answer is required' : ''}
        resetError={() => setIsReuired(false)}
        onChange={handlerOnChange}
      />
      <button
        onClick={handlerOnSubmit}
        className='rounded-full bg-high-dark text-nimbus w-full p-4 h-full mt-8 text-center font-tilt-warp text-sm font-medium leading-none disabled:cursor-not-allowed'
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionEnterStep;

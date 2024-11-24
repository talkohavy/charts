import { useRef, useState } from 'react';
import Input from '../Input';

const DELAY_START_RUNNING = 350;
const DELAY_BETWEEN_STEPS = 50;

type NumberInputProps = {
  value: number | string;
  setValue: (value: any) => void;
  step?: number;
  placeholder?: string;
};

export default function NumberInput(props: NumberInputProps) {
  const { value, setValue, step = 1, placeholder = '' } = props;

  const [intervalId, setIntervalId] = useState(null as unknown as NodeJS.Timeout);
  const isAddingRef = useRef(false);
  const isSubtractingRef = useRef(false);
  const timeoutIdRef = useRef(null as unknown as NodeJS.Timeout); // To track the timeout for the initial delay

  const incrementValue = () => setValue((prev: string) => +prev + step);
  const decrementValue = () => setValue((prev: string) => +prev - step);

  const startAdding = () => {
    incrementValue();

    isAddingRef.current = true;
    timeoutIdRef.current = setTimeout(() => {
      const newIntervalId = setInterval(incrementValue, DELAY_BETWEEN_STEPS);

      setIntervalId(newIntervalId);
    }, DELAY_START_RUNNING);
  };

  const stopAdding = () => {
    isAddingRef.current = false;
    clearTimeout(timeoutIdRef.current);
    clearInterval(intervalId);
  };

  const startSubtracting = () => {
    decrementValue();

    isSubtractingRef.current = true;
    timeoutIdRef.current = setTimeout(() => {
      setIntervalId(setInterval(decrementValue, DELAY_BETWEEN_STEPS));
    }, DELAY_START_RUNNING); // Start continuous action after 100ms
  };

  const stopSubtracting = () => {
    isSubtractingRef.current = false;
    clearTimeout(timeoutIdRef.current); // Clear the initial delay timeout
    clearInterval(intervalId);
  };

  return (
    <div className='flex gap-2'>
      <Input value={value} setValue={setValue} placeholder={placeholder} />

      <div className='flex flex-col items-center justify-between p-0.5'>
        <button
          type='button'
          // onClick={incrementValue}
          onMouseDown={startAdding}
          onMouseUp={stopAdding}
          onMouseLeave={stopAdding}
          onTouchStart={startAdding}
          onTouchEnd={stopAdding}
          className='flex size-4 items-center justify-center rounded-md bg-neutral-200 text-xs'
        >
          ▲
        </button>
        <button
          type='button'
          // onClick={decrementValue}
          onMouseDown={startSubtracting}
          onMouseUp={stopSubtracting}
          onMouseLeave={stopSubtracting}
          onTouchStart={startSubtracting}
          onTouchEnd={stopSubtracting}
          className='flex size-4 items-center justify-center rounded-md bg-neutral-200 text-xs'
        >
          ▼
        </button>
      </div>
    </div>
  );
}

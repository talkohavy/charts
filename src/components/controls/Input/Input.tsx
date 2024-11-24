type InputProps = {
  value: string | number;
  setValue: (value: string) => void;
  placeholder?: string;
};

export default function Input(props: InputProps) {
  const { value, setValue, placeholder = '' } = props;

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='h-10 w-72 rounded-md border border-black p-2'
      placeholder={placeholder}
    />
  );
}

type TitleProps = {
  title: string;
};

export default function Title(props: TitleProps) {
  const { title } = props;

  return <h2 className='font-bold text-2xl'>{title}</h2>;
}

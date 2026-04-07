import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type ExampleCardProps = PropsWithChildren<{
  className?: string;
}>;

export default function ExampleCard(props: ExampleCardProps) {
  const { children, className } = props;

  return (
    <div
      className={clsx(
        'flex flex-col items-start justify-start gap-6 shrink-0 h-120 w-full max-w-xl border p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

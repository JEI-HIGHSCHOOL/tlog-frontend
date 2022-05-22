import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({
  placeholder,
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={clsxm(
        'animate-shimmer bg-[#f6f7f8]',
        className +
          ' skeleton flex items-center justify-center text-2xl text-gray-700'
      )}
      {...rest}
    >
      {placeholder}
    </div>
  );
}

import * as React from 'react';

function Plus(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg viewBox='0 0 52 52' {...props}>
      <path d='M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm12.5 28H28v11a2 2 0 01-4 0V28H13.5a2 2 0 010-4H24V14a2 2 0 014 0v10h10.5a2 2 0 010 4z' />
    </svg>
  );
}

export const PlusSvg = React.memo(Plus);

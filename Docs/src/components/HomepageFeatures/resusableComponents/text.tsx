import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

interface TextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: 'body' | 'heading' | 'subheading' | 'small' | 'caption';
  weight?: 'light' | 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean; 
  breakWord?: boolean;
  whiteSpace?: 'normal' | 'nowrap' | 'pre-wrap';
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  style,
  variant = 'body',
  weight = 'normal',
  align = 'left',
  truncate = false,
  breakWord = false,
  whiteSpace = 'normal',
}) => {
  return (
    <div
      className={clsx(
        'text',
        `text--${variant}`,
        `text--${weight}`,
        `text--${align}`,
        truncate && 'text--truncate',
        breakWord && 'text--break',
        className
      )}
      style={{
        ...style,
        whiteSpace,
        overflow: truncate ? 'hidden' : undefined,
        textOverflow: truncate ? 'ellipsis' : undefined,
        wordBreak: breakWord ? 'break-word' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Text;

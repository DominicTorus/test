import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface ButtonProps {
  size?: 'sm' | 'small' | 'lg' | 'large' | 'medium' | null;
  outline?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  block?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  link?: string;
  label?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = null,
  outline = false,
  variant = 'primary',
  block = false,
  disabled = false,
  className,
  style,
  link,
  label,
  children,
}) => {
  const sizeMap: Record<string, string | null> = {
    sm: 'sm',
    small: 'sm',
    lg: 'lg',
    large: 'lg',
    medium: null,
  };
  
  const buttonSize = size ? sizeMap[size] : '';
  const sizeClass = buttonSize ? `button--${buttonSize}` : '';
  const outlineClass = outline ? 'button--outline' : '';
  const variantClass = variant ? `button--${variant}` : '';
  const blockClass = block ? 'button--block' : '';
  const disabledClass = disabled ? 'disabled' : '';

  const destination = disabled ? undefined : link;

  return (
    <Link to={destination || '#'}>
      <button
        className={clsx('button', sizeClass, outlineClass, variantClass, blockClass, disabledClass, className)}
        style={style}
        role="button"
        aria-disabled={disabled}
        disabled={disabled}
      >
        {children || label}
      </button>
    </Link>
  );
};

export default Button;

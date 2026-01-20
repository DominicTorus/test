import React, { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface CardImageProps {
  className?: string;
  style?: CSSProperties;
  cardImageUrl: string;
  alt: string;
  title?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ className, style, cardImageUrl, alt, title }) => {
  const generatedCardImageUrl = useBaseUrl(cardImageUrl);
  return (
    <img
      className={clsx('card__image', className)}
      style={style}
      src={generatedCardImageUrl}
      alt={alt}
      title={title}
    />
  );
};

interface CardProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  shadow?: 'none' | 'low' | 'medium' | 'tall';
  variant?: 'default' | 'outlined' | 'elevated' | 'bordered'|'flat';
  rounded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  style,
  children,
  shadow = 'none',
  variant = 'default',
  rounded = true,
}) => {
  return (
    <div
      className={clsx(
        'card',
        className,
        shadow !== 'none' && `shadow--${shadow}`,
        variant !== 'default' && `card--${variant}`,
        rounded && 'card--rounded'
      )}
      style={style}
    >
      {children}
    </div>
  );
};

interface TextContainerProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  variant?: string;
  italic?: boolean;
  noDecoration?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize';
  breakWord?: boolean;
  truncate?: boolean;
  weight?: 'light' | 'normal' | 'bold';
  component?: keyof JSX.IntrinsicElements;
}

const TextContainer: React.FC<TextContainerProps> = ({
  className,
  style,
  children,
  textAlign,
  variant,
  italic = false,
  noDecoration = false,
  transform,
  breakWord = false,
  truncate = false,
  weight,
  component: Component = 'div',
}) => {
  return (
    <Component
      className={clsx(
        className,
        textAlign && `text--${textAlign}`,
        variant && `text--${variant}`,
        italic && 'text--italic',
        noDecoration && 'text-no-decoration',
        transform && `text--${transform}`,
        breakWord && 'text--break',
        truncate && 'text--truncate',
        weight && `text--${weight}`
      )}
      style={style}
    >
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<TextContainerProps> = (props) => <TextContainer {...props} className={clsx('card__header', props.className)} />;
export const CardBody: React.FC<TextContainerProps> = (props) => <TextContainer {...props} className={clsx('card__body', props.className)} />;
export const CardFooter: React.FC<TextContainerProps> = (props) => <TextContainer {...props} className={clsx('card__footer', props.className)} />;

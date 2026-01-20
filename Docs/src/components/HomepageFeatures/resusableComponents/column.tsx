import React, { ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';

interface ColumnProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}

interface ColumnsProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    gap?: number;
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  }

export const Column: React.FC<ColumnProps> = ({ children, className, style, xs, sm, md, lg, xl,xxl }) => {
    const columnClass = clsx(
        'column',
        xs && `col-xs-${xs}`,
        sm && `col-sm-${sm}`,
        md && `col-md-${md}`,
        lg && `col-lg-${lg}`,
        xl && `col-xl-${xl}`,
        xxl && `col-xxl-${xxl}`,
        className
    );

    return (
        <div className={columnClass} style={style}>
            {children}
        </div>
    );
};


  
  export const Columns: React.FC<ColumnsProps> = ({ children, className, style, gap = 16, justify = 'start' }) => {
    return (
      <div
        className={clsx('columns', className, `justify-${justify}`)}
        style={{ display: 'flex', flexWrap: 'wrap', gap: `${gap}px`, ...style }}
      >
        {children}
      </div>
    );
  };

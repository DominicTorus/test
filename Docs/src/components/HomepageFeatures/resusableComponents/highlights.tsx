import React from "react";

export default function Highlights({ children, color }: { children?: React.ReactNode, color?: string }) {
    return (
        <span
            style={{
                backgroundColor: color,
                borderRadius: '5px',
                color: '#fff',
                padding: '0.2rem',
                display:"inline-block",
            }}>
            {children}
        </span>
    )
}
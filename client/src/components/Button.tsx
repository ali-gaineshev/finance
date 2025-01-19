import React from 'react';

interface ButtonProps {
    children: React.ReactNode; // Text
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void; // Click handler
    className?: string; // Additional class names
    variant?: 'primary' | 'secondary' | 'danger'; // Button style
    style?: React.CSSProperties; // Inline style
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // button Size
    disabled?: boolean; // Disabled state
}

const BoostrapButton: React.FC<ButtonProps> = (
    { children, onClick, style, size, className, variant, type = 'submit', disabled = false }
) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant} btn-${size} ${className}`}
            style = {style}
        >{children}</button>
    );
}

export default BoostrapButton;
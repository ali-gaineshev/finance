import React, { forwardRef } from "react";

interface BootstrapInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    className?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const BootstrapInput = forwardRef<HTMLInputElement, BootstrapInputProps>(
    ({ id, type, className = "", placeholder = "", onChange = () => {}, ...props }, ref) => {
        return (
            <input
                id={id}
                type={type}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                ref={ref}
                {...props}
            />
        );
    }
);

// Add display name for debugging
BootstrapInput.displayName = "BootstrapInput";

export default BootstrapInput;

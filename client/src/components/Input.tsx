import React from 'react';

interface BootstrapInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    className?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const BootstrapInput: React.FC<BootstrapInputProps> = ({
       id,
       type,
       className = '',
       placeholder = '',
       onChange = () => {},
       ...props
   }) => {
    return (
        <input
            id={id}
            type={type}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            {...props} // Spread additional props
        />
    );
};

export default BootstrapInput;


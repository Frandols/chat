import type { ButtonHTMLAttributes } from 'react'

import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
}

const Button = ({ 
    variant = 'primary', 
    ...props 
}: ButtonProps) => {
    return (
        <button
            className={`button button-${variant}`}
            {...props}
        />
    )
}

export default Button
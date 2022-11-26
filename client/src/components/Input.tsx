import type { InputHTMLAttributes } from 'react'

import { forwardRef } from 'react'

import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        props,
        ref
    ) => {
        return (
            <input
                className='input'
                autoComplete='off'
                ref={ref}
                {...props}
            />
        )
    }
)

export default Input
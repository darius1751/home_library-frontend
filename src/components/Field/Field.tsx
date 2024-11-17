import { ChangeEventHandler, useId } from 'react';
import styles from './field.module.css';
export type FieldProps = {
    label: string;
    name: string;
    value?: string | number | readonly string[] | undefined;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    accept?: string;

}
export const Field = ({ label, handleChange, className = "", ...inputProps }: FieldProps) => {
    const id = useId();
    return (
        <div className={`${styles.field} ${className}`}>
            <label
                htmlFor={id}
                className={styles.label}
            >
                {label}
            </label>
            <input
                id={id}
                className={styles.input}
                onChange={handleChange}
                {...inputProps}
            />
        </div>
    )
}
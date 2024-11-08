import { ChangeEventHandler, useId } from 'react';
import styles from './field.module.css';
type Props = {
    label: string;
    name: string;
    value: string | number | readonly string[] | undefined;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

}
export const Field = ({ className, label, handleChange, ...inputProps }: Props) => {
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
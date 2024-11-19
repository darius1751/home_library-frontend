import { ChangeEventHandler, useId } from "react";
import styles from './fieldTextArea.module.css';

type Props = {
    label: string;
    name: string;
    value: string | number | readonly string[] | undefined;
    handleChange: ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    maxLength?: number;
    minLength?: number;
}
export const FieldTextArea = ({ label, handleChange, value, minLength = 0, maxLength = 500, className = '', ...textAreaOptions }: Props) => {
    const id = useId();
    return (
        <div className={`${styles.field} ${className}`}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <textarea
                id={id}
                onChange={handleChange}
                className={styles.textArea}
                minLength={minLength}
                maxLength={maxLength}
                value={value}
                {...textAreaOptions}
            >
            </textarea>
            <small className={styles.length}>{value?.toString().length}/{maxLength}</small>
        </div>
    )
}
import { ChangeEventHandler, useId } from "react"
import styles from './fieldSelect.module.css';
export type FieldSelectOption = {
    text: string;
    value: string;
    disabled?: boolean;
};
type Props = {
    label: string;
    name: string;
    options: FieldSelectOption[];
    value?: string | number | readonly string[] | undefined;
    handleChange: ChangeEventHandler<HTMLSelectElement>;
    className?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}
export const FieldSelect = ({ label, name, className, options, handleChange, ...selectOptions }: Props) => {
    const id = useId();
    return (
        <div className={`${styles.field}`}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select id={id} name={name} onChange={handleChange} {...selectOptions} className={styles.select}>
                {
                    options.map(
                        ({ text, ...option }, index) => (
                            <option key={`fieldSelect-${name}-${index}`} {...option} className={styles.option} >
                                {text}
                            </option>
                        )
                    )
                }
            </select>
        </div>
    )
}
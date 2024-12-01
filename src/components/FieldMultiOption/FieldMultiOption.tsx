import { Field } from "../Field/Field"
import { KeyboardEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './fieldMultiOption.module.css';
type Props = {
    selections: string[];
    setSelections: React.Dispatch<string[]>,
    minSelection?: number;
    maxSelection?: number;
    placeholder?: string;
    label: string;
    name: string;
}
export const FieldMultiOption = ({ label, name, selections, setSelections, maxSelection, minSelection, placeholder }: Props) => {
    const { form, handleChange, setForm } = useForm({ [name]: '' });

    const handleAdd = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && form[name].trim().length > 0) {
            setSelections([...selections, form[name]]);
            setForm({ [name]: '' });
        }
    }
    const handleRemove = (i: number) => {
        const newSelection = selections.filter((_, index) => i !== index)
        setSelections(newSelection);
    }
    return (
        <div className={styles.fieldMultiOption}>
            <Field
                label={label}
                name={name}
                value={form[name]}
                placeholder={placeholder}
                handleChange={handleChange}
                onKeyDown={handleAdd}
                disabled={selections.length === maxSelection}
                className={styles.field}
            />

            {
                selections.length > 0 ?
                    <div className={styles.selections}>
                        {selections.map(
                            (selection, index) => (
                                <span key={`selection-${label}-${index}`} className={styles.selection} onClick={() => { handleRemove(index) }}>
                                    {selection}
                                </span>
                            )
                        )}
                    </div>
                    :
                    <div className={styles.selectionEmpty}>
                        <span className={styles.textMinimum}>The {label} is empty please add minimum: {minSelection}</span>
                    </div>
            }
        </div>
    )
}
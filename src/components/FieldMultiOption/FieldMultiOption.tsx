import styles from './fieldMultiOption.module.css';
import { Field } from "../Field/Field"
import {  KeyboardEvent } from 'react';
import { useForm } from '../../hooks/useForm';
type Props = {
    selections: string[];
    setSelections: React.Dispatch<string[]>,
    minSelection?: number;
    maxSelection?: number;
    placeholder?: string;
    label: string;
    name: string;
}
export const FieldMultiOption = ({ label, name, selections, setSelections, maxSelection, placeholder }: Props) => {
    const { form, handleChange, setForm } = useForm({ [name]: '' });

    const handleAdd = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            setSelections([...selections, form[name]]);
            setForm({ [name]: '' });
        }
    }
    const handleRemove = (i: number) => {
        const newSelection = selections.filter((_, index) => i !== index)
        setSelections(newSelection);
    }
    return (
        <div className={styles.fieldMultiOption} onKeyDown={handleAdd}>
            <Field label={label} handleChange={handleChange} name={name} value={form[name]} placeholder={placeholder} disabled={selections.length === maxSelection} />
            <div className={styles.selections}>
                {
                    selections.map(
                        (selection, index) => (
                            <span key={`selection-${label}-${index}`} className={styles.selection} onClick={() => { handleRemove(index) }}>
                                {selection}
                            </span>
                        )
                    )
                }
            </div>
        </div>
    )
}
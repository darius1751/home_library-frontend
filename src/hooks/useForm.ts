import { ChangeEvent, useState } from "react"

export const useForm = <T>(initialForm: T) => {
    const [form, setForm] = useState(initialForm);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return {
        form,
        setForm,
        handleChange
    }
}
import { FieldSelectOption } from "../components/FieldSelect/FieldSelect";

export const stateOptions: FieldSelectOption[] = [
    {
        text: 'Select a State',
        value: '',
        disabled: true
    },
    {
        text: 'Read',
        value: 'read',
    },
    {
        text: 'Not Finished',
        value: 'not finished',
    },
    {
        text: 'Unread',
        value: 'unread',
    },
]
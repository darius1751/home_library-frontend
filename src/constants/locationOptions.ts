import { FieldSelectOption } from "../components/FieldSelect/FieldSelect";

export const locationOptions: FieldSelectOption[] = [
    {
        value: '',
        text: 'Select a location',
        disabled: true
    },
    {
        value: 'library',
        text: 'Library'
    },
    {
        value: 'lent',
        text: 'Lent'
    },
    {
        value: 'wishlist',
        text: 'Wishlist'
    }
]
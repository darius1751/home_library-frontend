import { FieldSelectOption } from "../components/FieldSelect/FieldSelect";
import lent from '../assets/icons/lent.svg';
import library from '../assets/icons/library.svg';
import wishlist from '../assets/icons/wishlist.svg';
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
export const locationIcons = <any>{
    library,
    lent,
    wishlist
}
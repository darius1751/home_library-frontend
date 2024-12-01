import { FieldSelectOption } from "../components/FieldSelect/FieldSelect";
import read from '../assets/icons/read.svg';
import currentlyReading from '../assets/icons/currentlyReading.svg'
import unread from '../assets/icons/unread.svg'
import notFinished from '../assets/icons/notFinished.svg'
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
        text: 'Currently Reading',
        value: 'currently reading'
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
export const stateIcons = <any>{
    read,
    unread,
    "no finished": notFinished,
    "currently reading": currentlyReading
}
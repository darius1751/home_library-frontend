import BookDto from "../../../../interfaces/book-dto"
import { CardBook } from "../../../CardBook/CardBook"
type Props = {
    image: File | undefined;
    initialImage: string;
}
export const Preview = ({ image, initialImage }: Props) => {
    const book: BookDto = {
        author: 'Author of the new Book',
        genres: ["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5"],
        location: 'lent',
        image: image ? URL.createObjectURL(image) : initialImage,
        state: 'unread',
        summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        title: 'This is the title of your new Book',
        user: '',
        _id: ''
    }
    return (
        <div>
            <CardBook book={book} type="preview" />
        </div>
    )
}
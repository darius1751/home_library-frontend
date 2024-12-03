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
        summary: ``,
        title: 'This is the title of your new Book',
        user: '',
        _id: ''
    }
    return (
        <div>
            <CardBook book={book} type="preview" setFilteredBooks={() => { }} books={[]} />
        </div>
    )
}
export default interface BookDto {
    _id?: string;
    title: string;
    author: string;
    summary: string;
    image: string;
    genres:string[];
    user: string,
    location: string;
    state: string;
}
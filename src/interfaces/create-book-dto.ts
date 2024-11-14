export default interface CreateBookDto {
    _id?: string;
    title: string;
    author: string;
    summary: string;
    image: string;
    genre:string[];
    user: string,
    location: string;
    state: string;
}
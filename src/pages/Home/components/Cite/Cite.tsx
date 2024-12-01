import styles from './cite.module.css';
type Props = {
    text: string;
    creator: string;
}
export const Cite = ({ creator, text }: Props) => {
    return (
        <div className={styles.cite}>
            <cite className={styles.text}>"{text}"</cite>
            <span className={styles.creator}>{creator}</span>
        </div>
    )
}
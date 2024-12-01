import styles from './loading.module.css';
export const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
        </div>
    )
}
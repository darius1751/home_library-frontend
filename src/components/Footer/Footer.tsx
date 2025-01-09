import { NavLink } from 'react-router-dom';
import styles from './footer.module.css';
import { IoCallSharp, IoLogoInstagram, IoMail } from 'react-icons/io5';

type Props = {
    className?: string;
    navItems?: { to: string; text: string }[];
}
export const Footer = ({ className = "" }: Props) => {
    const year = new Date().getFullYear();

    return (
        <footer className={`${styles.footer} ${className}`}>
            <h2 className={`${styles.title}`}>
                <NavLink to={"/"} >Home Library</NavLink>
            </h2>
            <div className={styles.links}>
                <div>
                    <span className={styles.sectionTitle}>Navigation</span>
                    <ul>
                        <li>
                            <NavLink to="/login" className={styles.link}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={styles.link}>Register</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Legacy</span>
                    <ul className={styles.legacy}>
                        <li>
                            <NavLink to={'/terms'} className={styles.link}>Terms & conditions</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/policies'} className={styles.link}>Privacy Policy</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <span className={styles.sectionTitle}>Contact Us</span>
                    <ul className={styles.social}>
                        <li>
                            <NavLink to={'tel:+573013155745'}>
                                <IoCallSharp className={styles.socialIcon}/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'mailto:homelibrary.enterprise@gmail.com'}>
                                <IoMail className={styles.socialIcon}/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'https://www.instagram.com/home.library.shelf/'} target='_blank'>
                                <IoLogoInstagram className={styles.socialIcon}/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <small className={styles.copyright}>copyright©{year}</small>
        </footer>
    )
}
import { Hero } from "./components/Hero/Hero"
import { Section } from "./components/Section/Section";
import bookIcon from '../../assets/icons/booksIcon.svg';
import shareIcon from '../../assets/icons/shareIcon.svg';
import wishListIcon from '../../assets/icons/wishlistIcon.svg';
import { Cite } from "./components/Cite/Cite";
import { Footer } from "../../components/Footer/Footer";
import { navItems } from "../../Layouts/PublicLayout";
import styles from './home.module.css';
import { Loading } from "../../components/Loading/Loading";
export const HomePage = () => {
    return (
        <>
            <div className={`public_page`}>
                <Hero />
                <div className={styles.container}>
                    <div className={styles.sections}>
                        <Section
                            src={bookIcon}
                            alt="Books"
                            description="Keep control of your books"
                        />
                        <Section
                            src={shareIcon}
                            alt="Share"
                            description="Share with your friends"
                        />
                        <Section
                            src={wishListIcon}
                            alt="WishList"
                            description="Create wishlists"
                        />
                    </div>
                </div>
                <Cite creator="John Steinbeck" text="I guess there are never enough books" />

            </div>
            <Footer navItems={navItems} className={styles.footer} />
        </>
    )
}
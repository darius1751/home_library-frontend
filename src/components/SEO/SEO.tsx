import { Helmet } from "react-helmet"

type Props = {
    description?: string;
    keywords?: string;
    title?: string;
    author?: string;
    image?: string;
}
export const SEO = ({
    description = '',
    title = 'Home Library',
    image = '/public/logo.svg',
    author = 'Home Library',
    keywords = ''
}: Props) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={import.meta.env.BASE_URL} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta name="robots" content="googlebot" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content={author} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}
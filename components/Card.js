import classNames from "classnames"
import Tags from '@components/Tags'
import Link from 'next/link'
import styles from "@styles/components/Card.module.css";

const Card = ({ title, description, tags, link, image, children, className }) => {
    return (
        <div className={classNames(className, styles.card)}>
            {children && children}
            <div className={styles.verso}>
                {image && image.src &&
                    <img
                        className={styles.image}
                        src={image.src}
                        alt={image.alt}
                    />
                }
                {title && 
                    <h2 className={styles.title}>{title}</h2>
                }
                {tags &&
                    <Tags tags={tags} className={styles.tags}/>
                }
                {description &&
                    <p className={styles.description}>{description}</p>
                }
                {link && 
                    <Link href={{pathname: link.path}}>
                        <p className={classNames("link", styles.link)}>{link.text}</p>
                    </Link>
                }
            </div>
        </div>
    );
}

export default Card
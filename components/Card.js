import classNames from "classnames"
import Link from 'next/link'
import styles from "@styles/components/Card.module.css";
import { Children } from "react";

const Card = ({ title, description, link, image, children, className }) => {
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
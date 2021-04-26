import Button from '@components/Button'
import Tag from '@components/Tag'
import Image from 'next/image'
import Link from 'next/link'
import styles from "@styles/components/Card.module.css";


export default function Card({ image, title, subtitle, tags, content, link }) {

    const BasicCard = (
        <Link href={link ? link : ''}>
            <div className={styles.card}>
                {image && (<div className={styles.image}>
                    <Image
                        src={image.url}
                        alt={image.alt}
                        layout='fill'
                    />
                </div>)}
                <div className={styles.text}>
                    {title && (<h3 className={styles.title}>{title}</h3>)}
                    {subtitle && (<div className={styles.subtitle}>{subtitle}</div>)}
                    {tags && (
                        <div className={styles.tags}>
                            {tags.map((item, i) => (<Tag key={i} content={item} />))}
                        </div>)}
                    {content && (<p className={styles.content}>{content}</p>)}
                    {link && (<Button
                        link={link}
                        content="Plus d'informations"
                    >
                    </Button>)}
                </div>
            </div>
        </Link>)

    return BasicCard
}
import { Badge, Button } from '@mantine/core';
import Image from 'next/image'
import Link from 'next/link'
import classNames from "classnames"
import styles from "@styles/components/Card.module.css";


export default function Card({ image, title, subtitle, tags, content, link, padded = true }) {

    const BasicCard = (
        <Link href={link ? link : ''}>
            <div className={classNames(styles.card, { [`${styles.padded}`]: padded })}>
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
                            {tags.map((item, i) => (<Badge key={i}>{item}</Badge>))}
                        </div>)}
                    {content && (<p className={styles.content}>{content}</p>)}
                    {link && (<Link href={link ? link : ''}>
                        <Button variant="light" color="green" radius="xs">
                            Voir projet
                        </Button>
                    </Link>)}
                </div>
            </div>
        </Link>)

    return BasicCard
}
import classNames from "classnames"
import styles from "@styles/components/Modal.module.css";

export default function Modal ({ title, description, tags, colorMap, link, image, children, className }) {
    return (
        <>
        <div className={classNames(className, styles.modal)}>
            {children && children}    
        </div>
        <div className={styles.overlay}>

        </div>
        </>
    );
}
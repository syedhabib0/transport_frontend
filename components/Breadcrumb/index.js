import Link from 'next/link'
import styles from './style.module.css'

const Breadcrumb = ({ items }) => {
    return (
        <nav className={styles.breadcrumb}>
            <ul className="flex flex-row">
                {items.map((item, index) => (
                    <li className={styles.breadcrumbItem} key={index}>
                        {item.link ? (
                            <Link href={item.link}>{item.text}</Link>
                        ) : (
                            <span>{item.text}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumb

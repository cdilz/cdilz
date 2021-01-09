import Link from 'next/link'
import styles from './logo.main.module.css'

export default function logo()
{
	return (
		<Link href='/'>
			<a className={styles.mainLogo}>
				C
			</a>
		</Link>
	)
}
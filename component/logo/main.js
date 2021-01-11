import Link from 'next/link'
import style from './logo.main.module.css'

export default function logo()
{
	return (
		<Link href='/'>
			<a className={style.mainLogo}>
				C
			</a>
		</Link>
	)
}
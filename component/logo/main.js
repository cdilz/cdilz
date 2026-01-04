import Link from 'next/link'
import style from './logo.main.module.css'

export default function logo()
{
	return <Link href='/' className={style.mainLogo}> C </Link>
}
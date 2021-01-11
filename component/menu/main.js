import style from './menu.main.module.css'
import Link from 'next/link'

function entriesToList(entries)
{
	let output = []
	for(let i = 0; i < entries.length; i++)
	{
		output.push(
		<li className={style.menuEntry} key = {i}>
			<Link href={entries[i].link}>
				<a>
					{entries[i].text}
				</a>
			</Link>
		</li>
		)
	}
	return output
}

export default function menu()
{
	return (
		<nav className={style.menuButton + ' material-icons'}>menu</nav>
	)
	/*
	let entries =
	[
		 {text: 'Home', link: '/'}
		,{text: 'Test', link: '/'}
	]

	let list = entriesToList(entries)

	return (
		<nav className={styles.menu}>
			<ol className={styles.menuList}>
				{list}
			</ol>
		</nav>
	)
	*/
}
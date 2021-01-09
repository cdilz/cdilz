import styles from './menu.main.module.css'
import Link from 'next/link'

function entriesToList(entries)
{
	let output = []
	for(let i = 0; i < entries.length; i++)
	{
		output.push(
		<li className={styles.menuEntry} key = {i}>
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
}
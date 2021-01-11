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
	let entries =
	[
		 {text: 'Home', link: '/'}
	]
	let list = entriesToList(entries)
	
	return (
		<nav className={style.menuContainer}>
			<nav className={style.menuButton + ' material-icons mainMenuButton'}>menu</nav>
			<nav className={style.fullscreenMenuContainer + ' mainMenuContainer'}>
				<nav className={style.menuBox}>
					<h1 className={style.menuHeader}>
						<Link href='/'>
							<a>
								CDilz
							</a>
						</Link>
					</h1>
					<ol className={style.menuList}>
						{list}
					</ol>
				</nav>
			</nav>
			<script type='text/javascript' src='/script/menu/main.js'></script>
		</nav>
		
	)
	/*


	return (
		<nav className={styles.menu}>
			<ol className={styles.menuList}>
				{list}
			</ol>
		</nav>
	)
	*/
}
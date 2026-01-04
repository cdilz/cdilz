'use client'

import style from './menu.main.module.css'
import Link from 'next/link'

function getMainMenuContainer()
{
	return document.querySelectorAll('.mainMenuContainer')[0]
}

function confirmAndHideClickMenuContainer(e)
{
	if(e.target.classList.contains('mainMenuContainer'))
	{
		hideMenu()
	}
}

function displayMenu()
{
	getMainMenuContainer().style.display = 'flex'
}

function hideMenu()
{
	getMainMenuContainer().style.display = 'none'
}


function entriesToList(entries)
{
	let output = []
	entries.forEach((entry, index) => {
		output.push(
		<li className={style.menuEntry} key={index} onClick={hideMenu}>
			<Link href={entry.link} className='mainMenuLink'>
				{entry.text}
			</Link>
		</li>
		)
	})

	return output
}

export default function menu()
{
	let entries =
	[
		 {text: 'Home', link: '/'},
		 {text: 'Chat', link: '/chat'},
		 {text: 'About', link: '/about'}//,
		 //{text: 'Games', link: '/games'}
	]
	let list = entriesToList(entries)
	
	return (
		<nav className={style.menuContainer}>
			<nav className={style.menuButton + ' material-icons mainMenuButton'} onClick={displayMenu}>menu</nav>
			<nav className={style.fullscreenMenuContainer + ' mainMenuContainer'} onClick={confirmAndHideClickMenuContainer}>
				<nav className={style.menuBox}>
					<h1 className={style.menuHeader + ' mainMenuLink'} onClick={hideMenu}>
						<Link href='/'>
							CDilz
						</Link>
					</h1>
					<ol className={style.menuList}>
						{list}
					</ol>
				</nav>
			</nav>
		</nav>
		
	)
}
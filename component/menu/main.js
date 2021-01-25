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
	for(let i = 0; i < entries.length; i++)
	{
		output.push(
		<li className={style.menuEntry} key = {i} onClick={hideMenu}>
			<Link href={entries[i].link}>
				<a className='mainMenuLink'>
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
		 {text: 'Home', link: '/'},
		 {text: 'Chat', link: '/chat'},
		 {text: 'About', link: '/about'}
	]
	let list = entriesToList(entries)
	
	return (
		<nav className={style.menuContainer}>
			<nav className={style.menuButton + ' material-icons mainMenuButton'} onClick={displayMenu}>menu</nav>
			<nav className={style.fullscreenMenuContainer + ' mainMenuContainer'} onClick={confirmAndHideClickMenuContainer}>
				<nav className={style.menuBox}>
					<h1 className={style.menuHeader + ' mainMenuLink'} onClick={hideMenu}>
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
		</nav>
		
	)
}
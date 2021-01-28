import MainLogo from 'component/logo/main'
import MainMenu from 'component/menu/main'
import style from './header.main.module.css'

export default function header()
{
	/*
	let fullClass = styles.header

	if(typeof className === 'string')
	{
		fullClass += ' ' + className
	}
*/
	return (
		<header className={style.header + ' noselect'}>
			<nav className={style.logo + ' ' + style.nav}>
				<MainLogo/>
			</nav>
			<nav className={style.menu + ' ' + style.nav}>
				<MainMenu/>
			</nav>
		</header>
	)
}
import MainLogo from 'component/logo/main'
import MainMenu from 'component/menu/main'
import styles from './header.main.module.css'

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
		<header className={styles.header + ' noselect'}>
			<nav className={styles.logo + ' ' + styles.nav}>
				<MainLogo/>
			</nav>
			<nav className={styles.spacer}>

			</nav>
			<nav className={styles.menu + ' ' + styles.nav}>
				<MainMenu/>
			</nav>
		</header>
	)
}
import Link from 'next/link'
import style from './styles.module.css'

export const metadata = {
	title: 'About'
}

export default function page()
{
  return (
    <>
		<section className={'wrapper hover'}>
			<p className={style.text}>
				Hello, my name is Charles DiLaurenzio. I have a degree in computer science, but my career has not been as focused on coding as I'd like. Because of this I decided to finally make my own personal site! I decided to challenge myself by using some technologies I don't know very well (such as MongoDB and Nex.js) and using everything as free as can be (except the domain name). As of writing this: I'm using <Link alt='vercel' href='https://vercel.com/' target='_blank'>Vercel</Link> to host the domain, <Link alt='github' href='https://github.com/cdilz/cdilz' target='_blank'>GitHub</Link> as my code repository, and <Link alt='mongodb atlas' href='https://www.mongodb.com/cloud/atlas' target='_blank'>MongoDB Atlas</Link> as a database provider.
			</p>
		</section>
		<section className={'wrapper hover'}>
			<Link className={style.siteLink + ' nodecoration'} href='https://github.com/cdilz' target='_blank'>
				<img src='image/invisible.png' className={style.socialLogo + ' githubMiniDark'}></img>
				<p className={style.socialText}>
					cdilz
				</p>
			</Link>
			<Link className={style.siteLink + ' nodecoration'} href='www.linkedin.com/in/cdilz' target='_blank'>
				<img src='image/invisible.png' className={style.socialLogo + ' linkedInMini'}></img>
				<p className={style.socialText}>
					Charles DiLaurenzio
				</p>
			</Link>
		</section>
	</>
  )
}
import Layout from 'component/layout/scroll'
import style from './pages.about.module.css'

export default function page()
{
  return (
    <Layout titleOverride='Home'>
      <section className={'wrapper hover'}>
        <p className={style.text}>
          Hello, my name is Charles DiLaurenzio. I have a degree in computer science, but my career has not been as focused on coding as I'd like. Because of this I decided to finally make my own personal site! I decided to challenge myself by using some technologies I don't know very well (such as MongoDB and Nex.js) and using everything as free as can be (except the domain name). As of writing this: I'm using <a alt='vercel' href='https://vercel.com/' target='_blank'>Vercel</a> to host the domain, <a alt='github' href='https://github.com/cdilz/cdilz' target='_blank'>GitHub</a> as my code repository, and <a alt='mongodb atlas' href='https://www.mongodb.com/cloud/atlas' target='_blank'>MongoDB Atlas</a> as a database provider.
        </p>
      </section>

			<section className={style.socialLinks + ' hover'}>
				<a className={style.siteLink + ' nodecoration'} href='https://github.com/cdilz' target='_blank'>
					<img src='image/invisible.png' className={style.socialLogo + ' githubMiniDark'}></img>
					<p className={style.socialText}>
						cdilz
					</p>
				</a>
				<a className={style.siteLink + ' nodecoration'} href='https://www.linkedin.com/in/charles-dilaurenzio-45786445/' target='_blank'>
					<img src='image/invisible.png' className={style.socialLogo + ' linkedInMini'}></img>
					<p className={style.socialText}>
						Charles DiLaurenzio
					</p>
				</a>
			</section>
		</Layout>
  )
}
import Layout from 'component/layout/scroll'
import style from './pages.games.village.module.css'

export default function page()
{
  return (
    <Layout titleOverride='About'>
      <section className={'wrapper hover'}>
        <p className={style.text}>
          Nothing here in this commit!
        </p>
      </section>
		</Layout>
  )
}
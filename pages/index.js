import Layout from 'component/layout/scroll'
import style from './pages.index.module.css'

export default function page()
{
  return (
    <Layout titleOverride='Home'>
      <section className={'wrapper hover'}>
        <img className='cautionTape'></img>
        <p className={style.text}>
          Hello, and welcome, to my personal website! {'\n'}
          {'\n'}
          Please use the menu at the top right to navigate around. {'\n'}
          {'\n'}
          There's not much here yet, but I hope you'll enjoy what I have nonetheless!
        </p>
        <img className='cautionTape'></img>
      </section>
    </Layout>
  )
}
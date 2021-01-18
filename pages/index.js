import Layout from 'component/layout/scroll'
import style from './pages.index.module.css'

let innerText =
`Hello, and welcome, to my personal website!

Please use the menu at the top right to navigate around.

There's not much here yet, but I hope you'll enjoy what I have nonetheless!`

export default function page()
{
  return (
    <Layout titleOverride='Home'>
      <section className={style.wrapper + ' hover'}>
        <img className='cautionTape'></img>
        <p className={style.text}>
          {innerText}
        </p>
        <img className='cautionTape'></img>
      </section>
    </Layout>
  )
}
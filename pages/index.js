import Layout from 'component/layout/scroll'
import style from './pages.index.module.css'

let innerText =
`Hello, and welcome, to my personal website!

This is the main landing page, when it's implemented the botton on the top right will be your menu into a realm of unknown possibilities! Mostly because I haven't put anything there as of writing this and I'm not sure what I want to make.

Digressions aside: I hope you enjoy your stay!`

export default function page()
{
  return (
    <Layout titleOverride='Home'>
      <section className={style.wrapper}>
        <img className='cautionTape'></img>
        <p className={style.text}>
          {innerText}
        </p>
        <img className='cautionTape'></img>
      </section>
    </Layout>
  )
}
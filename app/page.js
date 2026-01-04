import style from './styles.module.css'

export const metadata = {
  title: 'Home'
}

export default function Page()
{
  return (
    <section className={'wrapper hover'}>
      <img className='cautionTape'></img>
      <p className={style.text}>
        Hello, and welcome, to my personal website!
      </p>
      <p className={style.text}>
        Please use the menu at the top right to navigate around. 
      </p>
      <p className={style.text}>
        There's not much here yet, but I hope you'll enjoy what I have nonetheless!
      </p>
      <img className='cautionTape'></img>
    </section>
  )
}

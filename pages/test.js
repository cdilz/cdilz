import Layout from 'component/layout/main'
import style from './pages.index.module.css'
/*
import { getSortedPostsData } from 'lib/posts'
import Link from 'next/link'
import Date from 'components/date'
*/
let innerText =
`This is just a test for page transitions`

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
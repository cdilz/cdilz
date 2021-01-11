import Layout from 'component/layout/main'
import style from './pages.index.module.css'
/*
import { getSortedPostsData } from 'lib/posts'
import Link from 'next/link'
import Date from 'components/date'
*/
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

/*
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


  <section className={utilStyles.headingMd}>…</section>
  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>Blog</h2>
    <ul className={utilStyles.list}>
      {allPostsData.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br/ />
          <small className={utilStyles.lightText}>
            <Date datesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestring={date} />
          </small>
        </li>
      ))}
    </ul>
  </section>
*/
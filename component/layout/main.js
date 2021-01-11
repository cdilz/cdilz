import Head from 'next/head'
import style from './layout.main.module.css'
import Header from 'component/header/main'

export const siteTitle = 'Charles DiLaurenzio'

export default function Layout({ children, titleOverride }) 
{
  let title = titleOverride ?? siteTitle

  return (
    <div className={style.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {title}
        </title>
        <meta
          name="description"
          content="Charles DiLaurenzio's Personal Website"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={style.main}>
      <Header/>
        <h1 className={style.innerHead}>
          {title}
        </h1>
        <div className={style.inside}>
          {children}
        </div>
      </main>
      
    </div>
  )
}
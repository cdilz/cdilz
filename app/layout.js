import { generate_open_graph, generate_twitter } from 'utility/metadata'
import style from './layout.module.css'
import Header from 'component/header/main'
import Titled_H1 from 'component/Titled_H1'
import './global.css'

export const title = 'CDilz'

export const metadata = {
  title: {
    tempalte: '%s',
    default: 'CDilz'
  },
  icon: '/favicon.ico',
  openGraph: generate_open_graph(title),
  twitter: generate_twitter()
}

export default function Layout({ children}) 
{
  return (
    <html>
      <body className={style.container}>
      <main className={style.main}>
        <Header/>
        <Titled_H1 />
        <div className={style.inside}>
          {children}
        </div>
      </main>
      </body>
    </html>
  )
}

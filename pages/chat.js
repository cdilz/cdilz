import Layout from 'component/layout/flex'
//import Chat from 'component/chat/encrypted.js'
import Dynamic from 'next/dynamic'
let Chat = Dynamic(() => import('component/chat/encrypted.js'), {ssr: false})

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
    <Layout titleOverride='Chat'>
      <Chat>

      </Chat>
    </Layout>
  )
	}
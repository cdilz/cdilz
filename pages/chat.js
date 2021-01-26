import Layout from 'component/layout/flex'
import Dynamic from 'next/dynamic'
let Chat = Dynamic(() => import('component/chat/encrypted.js'), {ssr: false})

export default function page()
{
  return (
    <Layout titleOverride='Chat'>
      <Chat>

      </Chat>
    </Layout>
  )
	}
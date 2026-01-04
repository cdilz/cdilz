import Dynamic from 'next/dynamic'
const Chat = Dynamic(() => import('component/chat/encrypted.js'), {ssr: false})

export const metadata = {
	title: 'Chat'
}

export default function page()
{
  return <Chat />
}
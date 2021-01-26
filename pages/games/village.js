import Layout from 'component/layout/scroll'
import Dynamic from 'next/dynamic'

//let Game = Dynamic(() => import('component/games/village.js'), {ssr: false})
import Game from 'component/games/village.js'

export default function page()
{
  return (
    <Layout titleOverride='Village'>
			<Game>

			</Game>
		</Layout>
  )
}
import Head from 'next/head'
import style from './games.village.module.css'

export default function page()
{
  return (
    <section>
			<Head>
				<script type='text/javascript' src='/script/games/village/state.js'></script>
				<script type='text/javascript' src='/script/games/village/population.js'></script>
				<script type='text/javascript' src='/script/games/village/game.js'></script>
				<script type='text/javascript' src='/script/games/village/main.js'></script>
			</Head>
			<nav className={style.gameNav}>
				<button className={style.townHall}>
					Town Hall
				</button>
				<button>
					Build
				</button>
			</nav>
      <section className={style.gameTile + ' ' + style.townHall + ' townHall'}>
        <div>
					{'Town Hall\n'.repeat(1000)}
				</div>
      </section>
		</section>
  )
}
import Layout from 'component/layout/scroll'
import style from './pages.games.module.css'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function getStaticProps()
{
	let files = fs.readdirSync('./pages/games')
	let games = []
	for(let i = 0; i < files.length; i++)
	{
		if(path.extname(files[i]).toLowerCase() == '.js')
		{
			let file = files[i].slice(0, -3)
			let name = splitAtUpper(file)
			name = name[0].toUpperCase() + name.slice(1)
			games.push(
				{
					path: `games/${file}`,
					name: name
				})
		}
	}
	return {props:{games}}
}

function splitAtUpper(input)
{
	let output = ''
	for(let i = 0; i < input.length; i++)
	{
		let char = input[i]
		if(char.match(/[A-Z]/))
		{
			output += ' '
		}
		output += char
	}

	return output
}

function generateGameButtons(entries)
{
	let output = []
	for(let i = 0; i < entries.length; i++)
	{
		let entry = entries[i]
		output.push(
			<Link href={entry.path}>
				<a className={style.gameButton + ' hover'}>
					{entry.name}
				</a>
			</Link>
		)
	}

	return output
}

export default function page({games})
{
	let buttons = generateGameButtons(games)
  return (
    <Layout titleOverride='Games'>
      <section className={'wrapper hover'}>
        <p className={style.text}>
          This site may store data related to the game on your browser. If you clear your browsing data you may lose your saved game.
        </p>
      </section>

			<section className={style.gameContainer + ' wrapper'}>
				{buttons}
			</section>
		</Layout>
  )
}
import style from './chat.encrypted.module.css'

let algo =
{
	name: 'RSA-OAEP',
	modulusLength: 4096,
	publicExponent: new Uint8Array([1, 0, 1]),
	hash: 'SHA-256'
}

let extract = true

let usage =
[
	'encrypt',
	'decrypt'
]


export default function chat()
{
	let keypair =
	{
		public: null,
		private: null
	}
	
	let wcs = null
	
	let user =
	{
		name: '',
		color: ''
	}

	let jsxColorStyle = 
	{
		color: ''
	}
	
	if(typeof window !== typeof undefined)
	{
	
		wcs = window.crypto.subtle
	
		async function createKeys()
		{
			let keys = await wcs.generateKey(algo, extract, usage)
			keypair.public = keys.publicKey
			keypair.private = keys.privateKey
		}
	
		async function encrypt(key, message)
		{
			let encoder = new TextEncoder()
			message = encoder.encode(message)
			return await wcs.encrypt(algo, key, message)
		}
	
		async function decrypt(message)
		{
			message = await wcs.decrypt(algo, keypair.private, message)
			let decoder = new TextDecoder()
			message = decoder.decode(message)
			return message
		}
	
		async function login()
		{

		}
	
		document.addEventListener('DOMContentLoaded', login, false)
	
	
	
		createKeys().
		then(() => encrypt(keypair.public, 'test')).
		then(res => decrypt(res)).
		then(res => console.log(res))
	}
	
	function getRand(num)
	{
		let rand = Math.random().toString()
		let randStr = rand.replace(/\D/, '')
		let randBig = BigInt(randStr)
		num = BigInt(num)
	
		let output = randBig % num
		return Number(output)
	}
	
	function arrayPick(arr)
	{
		return arr[getRand(arr.length)]
	}
	
	function generateName()
	{
		let prefix = ['Mr', 'Ms', 'Dr']
		let first = ['Awesome', 'Magnificent', 'Elusive', 'Cool', 'Amazing', 'Vibrant']
		let middle = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
		let last = ['Axolotl', 'Ostrich', 'Elephant', 'Kitty', 'Puppy', 'Koala', 'Kangaroo', 'Racoon']
		let of = ['of', 'von']
		let final = ['Fluffiness', 'Softness', 'Warmness', 'Coolness']
	
		let nameArr = []
		nameArr.push(arrayPick(prefix))
		nameArr.push(arrayPick(first))
		nameArr.push(arrayPick(middle))
		nameArr.push(arrayPick(last))
		nameArr.push(arrayPick(of))
		nameArr.push(arrayPick(final))
	
		return nameArr.join('_')
	}
	
	function generateColor()
	{
		let colors = 
		[
			'black',
			'gray',
			'maroon',
			'red',
			'purple',
			'fuchsia',
			'green',
			'olive',
			'navy',
			'blue',
			'teal',
			'hotpink'
		]
		
		return arrayPick(colors)
	}
	
	function setNameAndColor()
	{
		user.name = generateName()
		user.color = generateColor()

		jsxColorStyle.color = user.color
	}
	
	
	async function fetchPost(url, data)
	{
		let response = fetch(url, 
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
	
		response = await response
		return response.json()
	}
	
	function sendMessage()
	{
		fetchPost('/api/chat/send', {name: 'testName'})
	}



	setNameAndColor()

	return (
		<section className={style.container}>
			<header>
        <img className='cautionTape'></img>
				Work in progress.

				Fully encrypted and anonymous messaging. Your browser generates your keys. Messages are deleted every 30 seconds in db.
        <img className='cautionTape'></img>
			</header>
			<div className={style.textWindow}>

			</div>
			<p className={style.loginInfo + ' loginInfo'}>
				Your name will be displayed as: <span style={jsxColorStyle}> {user.name} </span>
			</p>
			<div className={style.textArea}>
				<input type='text' className={style.textInput + ' chatBox'} placeholder='Type your message here and hit enter to send'></input>
			</div>
		</section>
	)
}
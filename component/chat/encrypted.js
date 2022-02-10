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
	
async function fetchPost(url, data)
{
	try
	{
		let response = await fetch(url, 
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		})
	
		if(!response.ok)
		{
			throw Error(response.statusText)
		}
		return response.json()
	}
	catch(e)
	{
		throw e
	}
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

function dateToString(date)
{
	return date.toLocaleString()	
}


export default function chat()
{	
	let intervalID = null

	let user =
	{
		name: '',
		color: '',
		key: '',
		lastreceive: new Date()
	}

	let jsxColorStyle = 
	{
		color: ''
	}
	
	let keypair =
	{
		public: null,
		private: null
	}
	
	let wcs = window.crypto.subtle

	async function createKeys()
	{
		let keys = await wcs.generateKey(algo, extract, usage)
		keypair.public = keys.publicKey
		keypair.private = keys.privateKey

		let exportedKey = await wcs.exportKey('jwk', keys.publicKey)
		user.key = exportedKey
	}

	async function receive()
	{
		let chatWindow = document.querySelector('.chatWindow')

		if(chatWindow == null)
		{
			clearInterval(intervalID)
			return
		}

		let newreceive = new Date()
		let chats = await fetchPost('/api/chat/receive', user)
		user.lastreceive = newreceive

		for(let i = 0; i < chats.length; i++)
		{
			let message = await decrypt(chats[i].message)
			let sent = dateToString(new Date(chats[i].sent))
			let timeNode = document.createElement('time')
			let timeTextNode = document.createTextNode(sent)
			timeNode.appendChild(timeTextNode)
			
			let line = document.createElement('div')

			let nameNode = document.createElement('div')
			nameNode.style.color = chats[i].color
			nameNode.style.fontWeight = 'bolder'
			let nameTextNode = document.createTextNode(chats[i].name)
			nameNode.appendChild(nameTextNode)
			
			let messageTextNode = document.createTextNode(message)

			let upperWrapper = document.createElement('div')

			upperWrapper.appendChild(nameNode)
			upperWrapper.appendChild(timeNode)
			line.appendChild(upperWrapper)
			line.appendChild(messageTextNode)
			chatWindow.appendChild(line)
		}

		return chats
	}

	async function encrypt(key, message)
	{
		let encoder = new TextEncoder()
		message = encoder.encode(message)
		let encMessage = await wcs.encrypt(algo, key, message)
		return atob(btoa(new Uint8Array(encMessage)))
	}

	async function decrypt(message)
	{
		message = new Uint8Array(message.split(',').map(Number))
		let decoder = new TextDecoder()
		let decMessage = await wcs.decrypt(algo, keypair.private, message)
		return decoder.decode(decMessage)
	}

	async function login()
	{
		return fetchPost('/api/chat/login', user)
	}

	createKeys().
	then(() => login()).
	then(async () =>
	{
		intervalID = setInterval(() => receive(), 1000)
	})

	function setNameAndColor()
	{
		user.name = generateName()
		user.color = generateColor()

		jsxColorStyle.color = user.color
	}
	
	
	async function sendMessage()
	{
		let users = await fetchPost('/api/chat/users', user)
		let chatBox = document.querySelector('.chatBox')
		let message = chatBox.value
		let messages = []

		for(let i = 0; i < users.length; i++)
		{
			let importedKey = await wcs.importKey('jwk', users[i].key, algo, extract, ['encrypt'])
			let encMessage = await encrypt(importedKey, message)
			let messageObj =
			{
				name: user.name,
				color: user.color,
				message: encMessage,
				key: users[i].key
			}
			messages.push(messageObj)
		}

		fetchPost('/api/chat/send', messages).
			catch(() => 
			{
				alert('Your session has timed out.\n\nThe page will now be refreshed and you will be given a brand new identity.')
				window.location = window.location
			})

		chatBox.value = ''
	}

	function checkForEnter(e)
	{
		if(e.key.toLowerCase() == 'enter')
		{
			sendMessage()
		}
	}



	setNameAndColor()

	return (
		<section className={style.container}>
			<header>
				Fully encrypted and anonymous messaging. Your browser generates your keys. Messages self-destruct when received or after a minute. Chat updates once a second.
			</header>
			<div className={style.textWindow + ' chatWindow'}>

			</div>
			<p className={style.loginInfo + ' loginInfo'}>
				Your name will be displayed as: <span style={jsxColorStyle}> {user.name} </span>
			</p>
			<div className={style.textArea}>
				<input type='text' className={style.textInput + ' chatBox'} placeholder='Type your message here and hit enter to send' onKeyPress={checkForEnter}></input>
			</div>
		</section>
	)
}
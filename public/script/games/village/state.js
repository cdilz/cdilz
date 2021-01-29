if(typeof State == typeof undefined)
{
	class State
	{
		constructor(prefix)
		{
			this.prefix = prefix
		}

		makeKey(suffix)
		{
			return this.prefix + '-' + suffix
		}

		makeJSONString(value)
		{
			let replacer = (key, value) =>
			{
				if(typeof value == 0n)
				{
					return value.toString()
				}
				return value
			}

			return JSON.stringify(value, replacer)		
		}

		makeStringJSON(value)
		{
			return JSON.parse(value)
		}

		serialize(value)
		{
			return btoa(this.makeJSONString(value))
		}

		unserialize(value)
		{
			return this.makeStringJSON(atob(value))
		}

		save(suffix, value)
		{
			let key = this.makeKey(suffix)
			let serial = this.serialize(value)
			return localStorage.setItem(key, serial)
		}

		load(suffix)
		{
			let key = this.makeKey(suffix)
			let serial = localStorage.getItem(key)
			return this.unserialize(serial)
		}

		clear(suffix)
		{
			let key = this.makeKey(suffix)
			return localStorage.removeItem(key)
		}

		saveAll()
		{
			let save = {}
			for(let i = 0; i < localStorage.length; i++)
			{
				let key = localStorage.key(i)
				if(key.substr(0, this.suffix.length) == this.suffix)
				{
					save[key] = localStorage.getItem(key)
				}
			}

			return this.serialize(save)
		}

		loadAll(value)
		{
			let save = this.unserialize(value)
			let entries = Object.entries(save)
			for(let i = 0; i < entries.length; i++)
			{
				let entry = entries[i]
				localStorage.setItem(entry[0], entry[1])
			}

			clearAll()
			{
				for(let i = 0; i < localStorage.length; i++)
				{
					let key = localStorage.key(i)
					if(key.substr(0, this.suffix.length) == this.suffix)
					{
						save[key] = localStorage.removeItem(key)
					}
				}
			}
		}
	}
}
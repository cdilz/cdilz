if(typeof Population != typeof undefied)
{
	class Population
	{
		get jobs()
		{
			return {
				UNEMPLOYED: 'unemployed'
			}
		}
	
		constructor()
		{
			this.internal = {}
			this.storageKey = 'village-population'
		}
	
		serialize()
		{
			let replacer = (key, value) =>
			{
				if(typeof value == 0n)
				{
					return value.toString()
				}
				return value
			}
	
			let saveString = JSON.stringify(this.internal, replacer)
			return btoa(saveString)
		}
	
		unserialize(serializeString)
		{
			let saveString = atob(serializeString)
			let save = JSON.parse(saveString)
			let keys = Object.keys(save)
	
			for(let i = 0; i < keys.length; i++)
			{
				let key = keys[i]
				this.internal[key] = BigInt(keys[key])
			}
		}
	
		save()
		{
			return localStorage.setItem(this.storageKey, this.serialize())
		}
	
		load()
		{
			return this.unserialize(localStorage.getItem(this.storageKey))
		}
	
		count(job)
		{
			if(typeof job == typeof undefined)
			{
				let output = 0n
				let keys = Object.keys(this.internal)
				for(let i = 0; i < keys.length; i++)
				{
					output += this.internal[keys[i]]
				}
				return output
			}
	
			return this.internal[job]
		}
	
		hire(job, count = 1)
		{
			if(this.internal[this.jobs.UNEMPLOYED] >= count)
			{
				this.internal[this.jobs.UNEMPLOYED] -= count
				this.internal[job] += count
				return true
			}
			return false
		}
	
		fire(job, count = 1)
		{
			if(this.internal[job] >= count)
			{
				this.internal[job] -= count
				this.internal[this.jobs.UNEMPLOYED] += count
				return true
			}
			return false
		}
	}
}
if(typeof Game == typeof undefined)
{
	class Game
	{
		constructor()
		{
			this.population = new Population()
		}
	
		load()
		{
			if(typeof saveString != typeof undefined)
			{
			}
			else
			{
				this.population.load()
			}
		}
	
		save()
		{
			this.population.save()
	
			return saveString
		}
	
		serialize()
		{
			let save = {}
			save.population = population.serialize()
			return btoa(JSON.stringify(save))
		}
	
		unserialize(input)
		{
			saveString = atob(input)
			let save = JSON.parse(input)
			this.population.load(save.population)
		}
	}
}
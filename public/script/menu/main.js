let mainMenuButton = document.querySelectorAll('.mainMenuButton')[0]
let mainMenuContainer = document.querySelectorAll('.mainMenuContainer')[0]

mainMenuButton.addEventListener('click', () =>
{
	mainMenuContainer.style.display = 'flex'
})

mainMenuContainer.addEventListener('click', (e) =>
{
	if(e.target.classList.contains('mainMenuContainer'))
	{
		mainMenuContainer.style.display = 'none'
	}
})
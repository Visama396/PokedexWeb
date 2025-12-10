function seededRandom(s) {
	const x = Math.sin(s) * 10000
	return x - Math.floor(x)
}

export const getDailyPokemon = () => {
	const today = new Date().toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
	const seed = today.replace(/\//g, '')

	const totalPokemon = 1025
	const random = seededRandom(Number(seed))

	return Math.floor(random * totalPokemon) + 1
}

export const getRandomPokemon = () => {
	const seed = new Date().getTime()

	const totalPokemon = 1025
	const random = seededRandom(Number(seed))

	return Math.floor(random * totalPokemon) + 1
}

export const getYesterdaysPokemon = () => {
	const yesterday = new Date()
	yesterday.setDate(new Date().getDate() - 1)
	const formatted = yesterday.toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })
	const seed = formatted.replace(/\//g, '')

	const totalPokemon = 1025
	const random = seededRandom(Number(seed))

	return Math.floor(random * totalPokemon) + 1
}

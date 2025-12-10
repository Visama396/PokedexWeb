function seededRandom(s) {
	const x = Math.sin(s) * 10000
	return x - Math.floor(x)
}

export const getDailyPokemon = () => {
	const today = new Date().toISOString().slice(0, 10)
	const seed = today.replace(/-/g, '')

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

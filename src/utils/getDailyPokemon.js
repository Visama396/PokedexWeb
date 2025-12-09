export const getDailyPokemon = () => {
	const today = new Date().toISOString().slice(0, 10)
	const seed = today.replace(/-/g, '')

	function seededRandom(s) {
		const x = Math.sin(s) * 15000
		return x - Math.floor(x)
	}

	const totalPokemon = 1025
	const random = seededRandom(Number(seed))

	return Math.floor(random * totalPokemon) + 1
}

import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { getDailyPokemon } from '../utils/getDailyPokemon'

export default function Pokedle() {
	const [pokemon, setPokemon] = useState(null)
	const [types, setTypes] = useState([])
	const [abilities, setAbilities] = useState([])
	const [generation, setGeneration] = useState('')
	const [height, setHeight] = useState(0)
	const [weight, setWeight] = useState(0)
	const [baseStats, setBaseStats] = useState(0)
	const [sprite, setSprite] = useState('')

	useEffect(() => {
		const pokeId = getDailyPokemon()
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
			.then(response => response.json())
			.then(data => setPokemon(data))
	}, [])

	return (
		pokemon && <main>
			<h2 className='text-white text-xl'>{capitalize(pokemon.name)}</h2>
		</main>
	)
}

import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { getDailyPokemon } from '../utils/getDailyPokemon'

export default function Pokemondle() {
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
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
			.then(response => response.json()).then(data => {
				let gen = data.generation.name
				gen = gen.replace('generation-', '')
				gen = capitalize(gen, false)
				setGeneration('Generation ' + gen)
			})

		fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
			.then(response => response.json())
			.then(data => {
				setPokemon(data)
				setTypes(data.types.map(type => capitalize(type.type.name)))
				setAbilities(data.abilities.map(ability => capitalize(ability.ability.name)))
				setHeight(data.height)
				setWeight(data.weight)
				setBaseStats(data.stats.reduce((acc, stat) => acc + stat.base_stat, 0))
				setSprite(data.sprites.other.home.front_default)
			})
	}, [])

	if (!pokemon) {
		return <div></div>
	} else {
		return (
			<main>
				<h2 className='text-white text-xl'>{capitalize(pokemon.name)}</h2>
				<p>{types.join(', ')}</p>
				<p>{abilities.join(', ')}</p>
				<p>{generation}</p>
				<p>{height / 10} m</p>
				<p>{weight / 10} kg</p>
				<p>{baseStats}</p>
				<img className='size-4' src={sprite} alt={pokemon.name} />
			</main>
		)
	}
}

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
	const [pokemonNameInput, setPokemonNameInput] = useState('')

	useEffect(() => {
		const pokeId = getDailyPokemon()
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}`)
			.then(response => response.json()).then(data => {
				let gen = data.generation.name
				gen = gen.replace('generation-', '')
				gen = capitalize(gen, false)
				setGeneration(gen)
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
			<main className='text-white'>
				<input className='text-black' type='text' value={pokemonNameInput} onChange={e => setPokemonNameInput(e.target.value)} />
				<table>
					<thead>
						<tr>
							<th>Type 1</th>
							<th>Type 2</th>
							<th>Height</th>
							<th>Weight</th>
							<th>Base Stats</th>
							<th>Generation</th>
							<th>Sprite</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{types[0]}</td>
							<td>{types[1] || 'None'}</td>
							<td>{height / 10} m</td>
							<td>{weight / 10} kg</td>
							<td>{baseStats}</td>
							<td>{generation}</td>
							<td><img className='size-[20rem]' src={sprite} alt={pokemon.name} /></td>
						</tr>
					</tbody>
				</table>
			</main>
		)
	}
}

import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { getDailyPokemon } from '../utils/getDailyPokemon'
import PokedleInput from './PokedleInput'

export default function Pokemondle() {
	const [pokemon, setPokemon] = useState(null)
	const [allPokemon, setAllPokemon] = useState([])
	const [types, setTypes] = useState([])
	const [abilities, setAbilities] = useState([])
	const [generation, setGeneration] = useState('')
	const [height, setHeight] = useState(0)
	const [weight, setWeight] = useState(0)
	const [baseStats, setBaseStats] = useState(0)
	const [sprite, setSprite] = useState('')
	const [pokeTries, setPokeTries] = useState([])

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025')
			.then(response => response.json())
			.then(data => {
				setAllPokemon(data.results)
			})

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

	const handlePokemonClick = (pokeName, pokeId) => {
		console.log(pokeName, pokeId)
	}

	if (!pokemon) {
		return <div></div>
	} else {
		return (
			<main className='text-white'>
				<div className='flex justify-center mb-[4rem]'>
					<PokedleInput onPokemonClick={handlePokemonClick} pokedex={allPokemon} />
				</div>
				<div className='flex justify-center py-2'>
					<table className='border-spacing-2 border-separate'>
						<thead>
							<tr>
								<th>Tipo 1</th>
								<th>Tipo 2</th>
								<th>Altura</th>
								<th>Peso</th>
								<th>Stats base</th>
								<th>Generación</th>
								<th>Sprite</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							<tr>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}>{types[0]}</td>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}>{types[1] || 'None'}</td>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'red' }}><p>{height / 10} m</p><p>Down</p></td>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'red' }}><p>{weight / 10} kg</p><p>Up</p></td>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{baseStats}</p><p>Down</p></td>
								<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{generation}</p><p>Up</p></td>
								<td className='flex justify-center size-[8rem] rounded-md'><img src={sprite} alt={pokemon.name} /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		)
	}
}

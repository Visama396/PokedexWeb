import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'
import { getDailyPokemon } from '../utils/getDailyPokemon'
import PokedleInput from './PokedleInput'
import PokemondleTry from './PokemondleTry'

export default function Pokemondle({ language = 'en' }) {
	const [pokemon, setPokemon] = useState({ generation: '', height: 0, weight: 0, baseStats: 0, sprite: '', types: [], abilities: [], name: '', id: 0 })
	const [allPokemon, setAllPokemon] = useState([])
	const [pokeTries, setPokeTries] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const pokemonOfTheDay = {
			generation: '',
			height: 0,
			weight: 0,
			baseStats: 0,
			sprite: '',
			types: [],
			abilities: [],
			name: '',
			id: 0
		}

		pokemonOfTheDay.id = getDailyPokemon()

		fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025')
			.then(response => response.json())
			.then(data => {
				setAllPokemon(data.results)
			})

		fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonOfTheDay.id}`)
			.then(response => response.json()).then(data => {
				let gen = data.generation.name
				gen = gen.replace('generation-', '')
				gen = capitalize(gen, false)
				pokemonOfTheDay.generation = gen
				const name = data.names.find(name => name.language.name === language).name || data.name
				pokemonOfTheDay.name = capitalize(name)
			}).finally(() => {
				fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonOfTheDay.id}`)
					.then(response => response.json())
					.then(data => {
						pokemonOfTheDay.id = data.id
						pokemonOfTheDay.height = data.height
						pokemonOfTheDay.weight = data.weight
						pokemonOfTheDay.baseStats = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
						pokemonOfTheDay.sprite = data.sprites.other.home.front_default
						pokemonOfTheDay.types = data.types.map(type => capitalize(type.type.name))
						pokemonOfTheDay.abilities = data.abilities.map(ability => capitalize(ability.ability.name))
					})
					.finally(() => {
						const newPokeAbilities = []
						pokemonOfTheDay.abilities.map(ability =>
							fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
								.then(response => response.json())
								.then(data => {
									newPokeAbilities.push(data.names.find(name => name.language.name === language).name || data.name)
								}).finally(() => {
									pokemonOfTheDay.abilities = newPokeAbilities
									const newPokeTypes = []
									pokemonOfTheDay.types.map(type =>
										fetch(`https://pokeapi.co/api/v2/type/${type}`)
											.then(response => response.json())
											.then(data => {
												newPokeTypes.push(data.names.find(name => name.language.name === language).name || data.name)
											}).finally(() => {
												pokemonOfTheDay.types = newPokeTypes
												setPokemon(pokemonOfTheDay)
												setLoading(false)
											})
									)
								})
						)
					})
			})
	}, [])

	const handlePokemonClick = (pokeName, pokeId) => {
		setPokeTries(pokeTries => [...pokeTries, { name: pokeName, id: pokeId }])
		console.log(pokeName, pokeId)
	}

	if (loading) {
		return <div><h2 className='text-white text-xl text-center'>Loading...</h2></div>
	}

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
							<th>Habilidad 1</th>
							<th>Habilidad 2</th>
							<th>Habilidad 3</th>
							<th>Stats base</th>
							<th>Generación</th>
							<th>Sprite</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						<tr>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}>{pokemon.types[0]}</td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}>{pokemon.types[1] || 'None'}</td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'red' }}><p>{pokemon.height / 10} m</p><p>Down</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'red' }}><p>{pokemon.weight / 10} kg</p><p>Up</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{pokemon.abilities[0]}</p><p>Down</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{pokemon.abilities[1] || 'None'}</p><p>Down</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{pokemon.abilities[2] || 'None'}</p><p>Down</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{pokemon.baseStats}</p><p>Down</p></td>
							<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'green' }}><p>{pokemon.generation}</p><p>Up</p></td>
							<td className='flex justify-center size-[8rem] rounded-md'><img src={pokemon.sprite} alt={pokemon.name} /></td>
						</tr>
						{
							pokeTries.map((pokeTry, index) => {
								return (
									<PokemondleTry key={index} pokemon={pokemon} pokeTry={pokeTry} language={language} />
								)
							})
						}
					</tbody>
				</table>
			</div>
		</main>
	)
}

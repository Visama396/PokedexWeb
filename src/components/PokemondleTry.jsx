import { useState, useEffect } from 'react'
import { capitalize } from '../utils/capitalize'

/**
 *
 * @param {*} pokemon The pokemon of the day
 * @param {*} pokeTry The try the user has made
 */
export default function PokemondleTry({ pokemon, pokeTry, language }) {
	const [pokeTryData, setPokeTryData] = useState({ name: pokeTry.name, id: pokeTry.id, types: [], abilities: [], height: 0, weight: 0, image: '' })
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const newPokeData = {
			name: pokeTry.name,
			id: pokeTry.id,
			types: [],
			abilities: [],
			height: 0,
			weight: 0,
			image: ''
		}

		fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeTry.id}`)
			.then(response => response.json()).then(data => {
				let gen = data.generation.name
				gen = gen.replace('generation-', '')
				gen = capitalize(gen, false)
				newPokeData.generation = gen
				const name = data.names.find(name => name.language.name === language).name || data.name
				newPokeData.name = capitalize(name)
			}).finally(() => {
				fetch(`https://pokeapi.co/api/v2/pokemon/${newPokeData.id}`)
					.then(response => response.json())
					.then(data => {
						newPokeData.id = data.id
						newPokeData.height = data.height
						newPokeData.weight = data.weight
						newPokeData.baseStats = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
						newPokeData.sprite = data.sprites.other.home.front_default
						newPokeData.types = data.types.map(type => capitalize(type.type.name))
						newPokeData.abilities = data.abilities.map(ability => capitalize(ability.ability.name))
					})
					.finally(() => {
						const newPokeAbilities = []
						newPokeData.abilities.map(ability =>
							fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
								.then(response => response.json())
								.then(data => {
									newPokeAbilities.push(data.names.find(name => name.language.name === language).name || data.name)
								}).finally(() => {
									newPokeData.abilities = newPokeAbilities
									const newPokeTypes = []
									newPokeData.types.map(type =>
										fetch(`https://pokeapi.co/api/v2/type/${type}`)
											.then(response => response.json())
											.then(data => {
												newPokeTypes.push(data.names.find(name => name.language.name === language).name || data.name)
											}).finally(() => {
												newPokeData.types = newPokeTypes
												setPokeTryData(newPokeData)
												setLoading(false)
											})
									)
								})
						)
					})
			})
	}, [])

	if (loading) return <div>Loading...</div>

	return (
		<tr>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.types[0] === pokemon.types[0] ? 'green' : 'red' }}>{pokeTryData.types[0]}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.types[1] === pokemon.types[1] ? 'green' : 'red' }}>{pokeTryData.types[1]}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.height - pokemon.height === 0 ? 'green' : 'red' }}><p>{pokeTryData.height}</p><p>{pokemon.height > pokeTryData.height ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.weight - pokemon.weight === 0 ? 'green' : 'red' }}><p>{pokeTryData.weight}</p><p>{pokemon.weight > pokeTryData.weight ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.abilities[0] === pokemon.abilities[0] ? 'green' : 'red' }}>{pokeTryData.abilities[0]}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'lightgray' }}>{pokeTryData.abilities[1]}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'lightgray' }}>{pokeTryData.abilities[2]}</td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: pokeTryData.baseStats - pokemon.baseStats === 0 ? 'green' : 'red' }}><p>{pokeTryData.baseStats}</p><p>{pokemon.baseStats > pokeTryData.baseStats ? 'Up' : 'Down'}</p></td>
			<td className='size-[8rem] rounded-md' style={{ backgroundColor: 'lightgray' }}>{pokeTryData.generation}</td>
			<td className='size-[8rem] rounded-md'><img src={pokeTryData.sprite} alt={pokeTryData.name} /></td>
		</tr>
	)
}

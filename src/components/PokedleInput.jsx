import { useState, useEffect } from 'react'
import PokedleAutocompleteItem from './PokedleAutocompleteItem'
import { getIdFromUrl } from '../utils/getIdFromUrl'
import { capitalize } from '../utils/capitalize'

/**
 *
 * @param {*} onPokemonClick Callback of the method that handles when a pokemon is clicked
 * @param {*} pokedex Array of pokemon objects
 */
export default function PokedleInput({ onPokemonClick, pokedex = [] }) {
	const [inputValue, setInputValue] = useState('')
	const [showAutoComplete, setShowAutoComplete] = useState(false)
	const [autoCompletedPokemon, setAutoCompletedPokemon] = useState([])

	useEffect(() => {
		if (inputValue.length > 0) {
			const filteredPokedex = pokedex.filter(pokemon => pokemon.name.toLowerCase().startsWith(inputValue.toLowerCase()))
			setAutoCompletedPokemon(filteredPokedex.slice(0, 10))
		} else {
			setAutoCompletedPokemon([])
		}
	}, [inputValue])

	return (
		<div className='w-[20rem] rounded-md flex flex-col justify-center items-center py-2 gap-2 z-10 fixed' style={{ backgroundColor: showAutoComplete ? '#333' : 'transparent' }}>
			<input className='rounded-md bg-[#222] w-[96%]' type='text' value={inputValue} onChange={e => { setInputValue(e.target.value); setShowAutoComplete(e.target.value.length > 0) }} placeholder='Enter Pokemon Name' />
			<div className='flex flex-col justify-center items-center gap-2 max-h-[18rem] w-full overflow-auto scrollbar-minimal' style={{ display: showAutoComplete ? 'block' : 'none' }}>
				{
					autoCompletedPokemon.map((pokemon, _) => (
						<PokedleAutocompleteItem key={_} pokeName={capitalize(pokemon.name)} pokeId={getIdFromUrl(pokemon.url)} onPokemonClick={(pokeName, pokeId) => { onPokemonClick(pokeName, pokeId); setShowAutoComplete(false); setInputValue('') }} />
					))
				}
			</div>
		</div>
	)
}

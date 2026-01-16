import { useState, useEffect } from 'react'

import PokedleAutocompleteItem from './PokedleAutocompleteItem'

import { translate } from '../utils/translate'
import { backspaceAndCapitalize } from "../utils/capitalize"

/**
 *
 * @param {*} onPokemonClick Callback of the method that handles when a pokemon is clicked
 * @param {*} pokedex Array of pokemon objects
 */
export default function PokedleInput({ onPokemonClick, pokedex = [], language = 'es' }) {
	const [inputValue, setInputValue] = useState('')
	const [showAutoComplete, setShowAutoComplete] = useState(false)
	const [autoCompletedPokemon, setAutoCompletedPokemon] = useState([])

	useEffect(() => {
  	if (inputValue.length > 0) {
    	const filteredPokedex = pokedex.filter(pokemon =>
    	  pokemon.species.names.find(name => name.language.name === language).name.toLowerCase().startsWith(input.toLowerCase())
    	)
   	  setAutoCompletedPokemon(filteredPokedex.slice(0, 10))
    } else {
     	setAutoCompletedPokemon([])
    }
	}, [inputValue])

	return (
		<div className='w-[20rem] rounded-md flex flex-col justify-center items-center mb-4 gap-2 z-15 sticky top-16 self-center' style={{ backgroundColor: showAutoComplete ? '#333' : 'transparent' }}>
			<input className='rounded-md bg-[#222] w-[96%] p-4 z-15' type='text' value={inputValue} onChange={e => { setInputValue(e.target.value); setShowAutoComplete(e.target.value.length > 0) }} placeholder={translate('pokedleInput', language)} />
      <div className='bg-[#222] absolute top-full flex flex-col justify-center items-center gap-2 max-h-72 w-full overflow-auto scrollbar-minimal' style={{ display: showAutoComplete ? 'block' : 'hidden' }}>
        {
          autoCompletedPokemon.map(pokemon => (
            <PokedleAutocompleteItem key={pokemon.entry_number} name={backspaceAndCapitalize(pokemon.species.names.find(name => name.language.name === language).name)} sprite={pokemon.pokemon.sprites.other.home.front_default} handleClick={() => { onPokemonClick(pokemon); setShowAutoComplete(false); setInputValue('') }} />
          ))
        }
      </div>
		</div>
	)
}

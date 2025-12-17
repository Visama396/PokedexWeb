import { useState, useEffect } from 'react'

import PokedexAutocompleteItem from './PokedexAutocompleteItem'
import { X } from 'lucide-react'

import { translate } from "../utils/translate"

export default function PokedexInput({ pokedex = [], language = 'es' }) {
	const [inputValue, setInputValue] = useState('')
	const [showAutoComplete, setShowAutoComplete] = useState(false)
	const [autoCompletedPokemon, setAutoCompletedPokemon] = useState([])
	const allowedLanguages = ['es', 'en', 'de', 'ja', 'ko']

	useEffect(() => {
		if (!inputValue.trim()) {
	    setAutoCompletedPokemon([])
	    return
	  }

	  const normalizedInput = inputValue.toLowerCase()
	  const allowedLanguages = ['en', 'es', 'de', 'ja', 'ko']

	  const filtered = pokedex.filter(({ pokemon, species }) => {
      const localizedName =
        species.names.find(n => n.language.name === language)?.name ||
        pokemon.name

      return localizedName
        .toLowerCase()
        .startsWith(normalizedInput)
    })

	  setAutoCompletedPokemon(filtered)
	}, [inputValue])

	return (
		<div className='bg-white/20 w-[20rem] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/30 flex flex-col justify-center items-center mb-4 gap-2 z-15 sticky top-16 self center'>
			<input className='rounded-2xl w-[96%] p-4 text-white border-none focus:outline-none' type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value); setShowAutoComplete(e.target.value.length > 0)}} placeholder={translate('pokedleInput', language)} />
			<div className='absolute top-full flex flex-col gap-2 max-h-72 w-full overflow-auto scrollbar-minimal bg-white/20 backdrop-blur-[5px] border border-white/30 rounded-xl z-50' style={{ display: showAutoComplete ? 'block' : 'none' }}>
				{
					autoCompletedPokemon.map((entry) => {
						const displayName = entry.species.names.find(n => n.language.name === language)?.name || entry.pokemon.name
						const fallbackName = entry.pokemon.name
						return (
							<PokedexAutocompleteItem key={entry.entry_number} sprite={entry.pokemon.sprites.other.home.front_default} displayName={displayName} fallbackName={fallbackName} />
						)
					})
				}
			</div>
		</div>
	)
}

import { useState, useEffect } from 'react'
import { translate } from "../utils/translate"
import PokedexAutocompleteItem from './PokedexAutocompleteItem'

export default function PokedexInput({ pokedex = [], language = 'es' }) {
	const [inputValue, setInputValue] = useState('')
	const [showAutoComplete, setShowAutoComplete] = useState(false)
	const [autoCompletedPokemon, setAutoCompletedPokemon] = useState([])

	useEffect(() => {
		if (inputValue.length > 0) {

		} else {
			setAutoCompletedPokemon([])
		}
	}, [inputValue])

	return (
		<div className='w-[20rem] rounded-md flex flex-col justify-center items-center mb-4 gap-2 z-15 sticky top-14 self center'>
			<input className='rounded-md bg-[#222] w-[96%] p-4 text-white' type='text' value={inputValue} onChange={(e) => {setInputValue(e.target.value); setShowAutoComplete(e.target.value.length > 0)}} placeholder={translate('pokedleInput', language)} />
			<div className='bg-[#222] absolute top-full flex flex-col justify-center items-center gap-2 max-h-72 w-full overflow-auto scrollbar-minimal' style={{ display: showAutoComplete ? 'block' : 'none' }}>
				{
					autoCompletedPokemon.map((pokemon, _) => (
						<PokedexAutocompleteItem key={_} pokemon={pokemon} />
					))
				}
			</div>
		</div>
	)
}

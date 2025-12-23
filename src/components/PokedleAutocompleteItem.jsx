import { backspaceAndCapitalize } from "../utils/capitalize"

export default function PokedleAutocompleteItem({ pokemon, handleClick, language = 'es' }) {
	return (
		<div className='flex justify-around items-center px-2 cursor-pointer hover:bg-[#444] rounded-md' onClick={handleClick}>
			<span>{backspaceAndCapitalize(pokemon.species.names.find(name => name.language.name === language).name)}</span>
			<img className='size-20 object-contain' src={pokemon.pokemon.sprites.other.home.front_default} alt={pokemon.pokemon.name} />
		</div>
	)
}

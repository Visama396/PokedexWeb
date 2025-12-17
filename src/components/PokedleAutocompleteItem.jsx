import { useState, useEffect } from 'react'

export default function PokedleAutocompleteItem({ pokeName, pokeId, onPokemonClick, language = 'en' }) {
	return (
		<div className='flex justify-around items-center px-2 cursor-pointer hover:bg-[#444] rounded-md' onClick={() => onPokemonClick(pokeName, pokeId)}><span>{pokeName}</span><img className='size-20 object-contain' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`} alt={pokeName} /></div>
	)
}

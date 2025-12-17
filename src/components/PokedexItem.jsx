import { useState, useEffect } from 'react'
import { getDexNumber } from '../utils/getDexNumber'
import { capitalize, backspaceAndCapitalize } from '../utils/capitalize'
import { translate } from '../utils/translate'

export default function PokedexItem({ nationalEntry, pokemon, species, language = 'es' }) {
	const name = species.names.find(n => n.language.name === language)?.name || pokemon.name

	return (
		<a
			id={pokemon.name}
			href={`/${pokemon.name.toLowerCase()}`}
			className='flex flex-col justify-center items-center py-2 transition-all rounded-md w-full h-full text-white hover:scale-105 hover:shadow-2xl pokemon-card'
			style={{ background: pokemon.types.length == 1 ? `var(--${pokemon.types[0].type.name})` : `linear-gradient(135deg, var(--${pokemon.types[0].type.name}), var(--${pokemon.types[1].type.name}))` }}>
			<p className='text-center text-xl'>#{getDexNumber(nationalEntry)}</p>
			<img className='object-cover p-4 filter drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]' src={pokemon.sprites.other.home.front_default} alt={`sprite ${pokemon.name}`} />
			<div>
				<h1 className='font-black text-center text-lg md:text-2xl pokemon mb-1 text-shadow-md'>{backspaceAndCapitalize(name)}</h1>
				<p className='font-bold text-sm flex gap-2 justify-center'>
					{
						pokemon.types.map((typ, _) => <span key={_} className='bg-white/25 rounded-md py-1 px-2 shadow-[0_2px_6px_rgba(255,255,255,0.3)]' style={{ color: `var(--light-${typ.type.name})`, textShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)' }}>{translate(typ.type.name, language)}</span>)
					}
				</p>
			</div>
		</a>
	)
}

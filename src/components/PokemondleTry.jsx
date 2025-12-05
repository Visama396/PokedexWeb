import { useState, useEffect } from 'react'

/**
 *
 * @param {*} pokemon The pokemon of the day
 * @param {*} pokeTry The try the user has made
 */
export default function PokemondleTry({ pokemon, pokeTry }) {
	const [pokeTryData, setPokeTryData] = useState({ name: '', id: 0, types: [], abilities: [], height: 0, weight: 0, image: '' })
	return (
		<tr>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
			<td className='size-[8rem] rounded-md'></td>
		</tr>
	)
}

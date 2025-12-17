import { openDB } from 'idb'

const DB_NAME = 'pokedex-db'
const STORE = 'pokemon'
const VERSION = 1
const TTL = 1000 * 60 * 60 * 24

const isBrowser = typeof window !== 'undefined'
export const dbPromise = isBrowser ? openDB(DB_NAME, VERSION, {
	upgrade(db) {
		if (!db.objectStoreNames.contains(STORE)) {
			db.createObjectStore(STORE, { keyPath: 'speciesUrl' })
		}
	}
}) : null

export async function getPokemon(speciesUrl) {
	const db = await dbPromise

	const entry = await db.get(STORE, speciesUrl)
	if (!entry) return null
	if (Date.now() - entry.timestamp > TTL) return null

	return entry
}

export async function setPokemon(speciesUrl, data) {
	const db = await dbPromise

	await db.put(STORE, {
		speciesUrl,
		timestamp: Date.now(),
		...data
	})
}

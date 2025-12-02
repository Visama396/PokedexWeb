
/**
 *
 * @param word The string to capitalize
 * @param lowerRest whether to lowercase the rest of the string (default: false)
 * @returns The capitalized string
 */
export const capitalize = ([first, ...rest]: string, lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

/**
 *
 * @param word The string to capitalize
 * @returns The capitalized string
 */
export const backspaceAndCapitalize = (name : string) => {
	let afterhyphen = false
	let result = ''

	for (const char of name) {
		if (afterhyphen) {
			result += char.toUpperCase()
			afterhyphen = false
		} else if (char === '-') {
			result += ' '
			afterhyphen = true
		} else {
			result += char
		}
	}

	return capitalize(result)
}

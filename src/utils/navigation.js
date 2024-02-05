const checkIsNavigationSupported = () => {
	return Boolean(document.startViewTransition)
}

const fetchPage = async(url) => {
	const response = await fetch(url).then(response => response.text())
	const [, data] = response.match(/<body[^>]*>([\s\S]*)<\/body>/i)
	return data
}

export const startViewTransition = () => {
	if (!checkIsNavigationSupported()) return

	window.navigation.addEventListener('navigate', (event) => {
		const toUrl = new URL(event.destination.url)
		if (location.origin !== toUrl.origin) return
		event.intercept({
			async handler() {
				const data = await fetchPage(toUrl.pathname)

				document.startViewTransition(() => {
					document.body.innerHTML = data
					document.documentElement.scrollTop = 0
				})
			}
		})
	})
}
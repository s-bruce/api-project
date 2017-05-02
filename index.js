$(document).ready(function(){

	console.log("Document ready")

	const $form = $("form#search")
	const $input = $("input#query")
	const $characterList = $("ul#characters")

	function fetchAndRenderMovies(e){
		e.preventDefault()
		console.log("Form submitted")
		const url = `https://swapi.co/api/people/?search=${$input.val()}`

		$.ajax({
			method: "GET",
			url: url,
			success: renderMovies
		})
	}

	function renderMovies(data){
		console.log(data)
		const characterListItems = data.results.map(function(c){
			var html = ""
			html += `<li><h5>${c.name}</h5></li>`
			html += `<li>Height: ${c.height}</li>`
			html += `<li>Mass: ${c.mass}</li>`
			html += `<li>Birth Year: ${c.birth_year}</li>`
			html += `<li><button type="button">Get Movies!</button></li>`
			return html
		})
		$characterList.html(characterListItems.join('')) 
	}

	$form.on("submit", fetchAndRenderMovies)

})
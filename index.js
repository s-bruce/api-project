$(document).ready(function(){

	console.log("Document ready")

	const $form = $("form#search")
	const $input = $("input#query")
	const $characterList = $("ul#characters")
	const $movies = $("#characters li button")
	const $movieList = $("ul#movies")

	function fetchAndRenderCharacters(e){
		e.preventDefault()
		console.log("Form submitted")
		const starWarsAdapter = new StarWars($input.val())
		starWarsAdapter.get().then(renderCharacters)
	}

	function renderCharacters(data){
		console.log(data)
		const characterListItems = data.results.map(function(c){
			var html = "<div>"
			html += `<li><h5>${c.name}</h5></li>`
			html += `<li>Height: ${c.height}</li>`
			html += `<li>Mass: ${c.mass}</li>`
			html += `<li>Birth Year: ${c.birth_year}</li>`
			html += `<li><button type="button">Get Movies!</button></li>`
			html += "</div>"
			return html
		})
		$characterList.html(characterListItems.join('')) 
	}

	function getMovies(e){
		$movieList.empty()
		console.log(e)
		const name = e.target.parentElement.parentElement.firstChild.firstChild.innerText
		const starWarsAdapter = new StarWars(name)

		

		starWarsAdapter.get()
		.then(getEachMovie)
	}

	function getEachMovie(data){
		const films = data.results[0].films
		films.forEach(function(film){
			$.ajax({
				method: "GET",
				url: film,
				success: renderMovies
			})
		})
	}

	function renderMovies(data){
		var html = ""
		html += `<li><h5>${data.title}</h5></li>`
		html += `<li><strong>Director:</strong> ${data.director}</li>`
		html += `<li><strong>Release Date:</strong> ${data.release_date}</li>`
		html += `<li><strong>Opening Crawl:</strong> ${data.opening_crawl}</li>`
		$movieList.append(html)
	}

	$form.on("submit", fetchAndRenderCharacters)
	$("#characters").on("click", "li button", getMovies)

})
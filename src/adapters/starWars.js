class StarWars {

	constructor(query){
		this.query = query
		this.baseUrl = "https://swapi.co/api/people/"
	}

	get(){
		const url = `${this.baseUrl}?search=${this.query}`
		return $.ajax({url: url})
	}

}

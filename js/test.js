var request = new XMLHttpRequest()
request.open('GET', 'https://restcountries.eu/rest/v2/name/denmark', true)


var finland  = request.onload = function() {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response)
	if (request.status >= 200 && request.status < 400) {
		data.forEach(info => {
            consol
	} else {
		console.log('error')
	}
}
request.send()
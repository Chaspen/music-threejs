var set = {
	album : Yeezus,
	artist: KanyeWest
}

var malePrn = ["he", "his", "him", "himself"];
var femalePrn = ["she", "her", "hers", "herself"];
var neuterPrn = ["they", "their", "theirs", "themself", "them"];

//album info

$.getJSON( "https://musicbrainz.org/ws/2/release/" + set.album + "?inc=aliases+artist-credits+labels+discids+recordings&fmt=json", function( album ) {
	$("#album").html( album.title);
	$("#artist").html( album['artist-credit'][0].artist.name );
	$("#tracks").html( album.media[0]['track-count'] );
	$("#release").html( album['release-events'][0].date );
	$("#label").html( album['label-info'][0].label.name );

	//cover art
	$.getJSON( "https://coverartarchive.org/release/" + set.album + "", function( cover ) {
		$("#cover").attr("src", cover.images[0].thumbnails.small);
		//artist info
		$.getJSON( "https://musicbrainz.org/ws/2/artist/" + set.artist + "?inc=aliases&fmt=json", function( artist ) {
			$("#name").html( artist.name);
			
			//Refactored code by https://github.com/fantoro
			var prn
			if( artist.gender == "Other" || artist.gender == null ) {
				prn = neuterPrn[1];
			} else {
				prn = ((artist.gender == "Male") ? malePrn[1] : femalePrn[1]);
			}
			$('#pronounSentExample2').html( artist.name + " and " + prn + " studio album " +  album.title)

			$.getJSON( "https://restcountries.eu/rest/v2/alpha/" + artist.country , function( nation ) {
				$("#country").html( nation.name);
			});
		});
	});	
});

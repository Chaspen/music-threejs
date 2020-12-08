var set = {
	album : ToPimpButterfly,
	artist: DorianElectra
}

var malePrn = ["he", "him", "his", "himself"];
var femalePrn = ["she", "her", "hers", "herself"];
var neuterPrn = ["they", "them", "theirs", "their", "themself"];

//album info

$.getJSON( "https://musicbrainz.org/ws/2/release/" + set.album + "?inc=aliases+artist-credits+labels+discids+recordings&fmt=json", function( album ) {
	
	

	$("#album").html( album.title);
	$("#artist").html( album['artist-credit'][0].artist.name );
	$("#tracks").html( album.media[0]['track-count'] );
	$("#release").html( album['release-events'][0].date );
	$("#label").html( album['label-info'][0].label.name );

	//cover art
	$.getJSON( "http://coverartarchive.org/release/" + set.album + "", function( cover ) {
		$("#cover").attr("src", cover.images[0].thumbnails.small);

		//artist info
		$.getJSON( "https://musicbrainz.org/ws/2/artist/" + set.artist + "?inc=aliases&fmt=json", function( artist ) {
			$("#name").html( artist.name);
			if ( artist.gender == "Male" ) {
				$("#pronounSentExample").html( "Album by " + artist.name);
				$("#pronounSentExample2").html( artist.name + " and " + malePrn[2] + " studio album " + album.title );
			}
			else if ( artist.gender == "Female" ) {
				$("#pronounSentExample").html( "Album by " + artist.name);
				$("#pronounSentExample2").html( artist.name + " and " + femalePrn[1] + " studio album " + album.title );
			}
			else if ( artist.gender == "Other" ) {
				$("#pronounSentExample").html( "Album by " + artist.name);
				$("#pronounSentExample2").html( artist.name + " and " + neuterPrn[3] + " studio album " + album.title );
			}
			else if ( artist.gender == null ) {
				$("#pronounSentExample").html( "Album by " + artist.name);
				$("#pronounSentExample2").html( artist.name + " and " + neuterPrn[3] + " studio album " + album.title );
			}



			$.getJSON( "https://restcountries.eu/rest/v2/alpha/" + artist.country , function( nation ) {
				$("#country").html( nation.name);
			});
		});
	});	
});

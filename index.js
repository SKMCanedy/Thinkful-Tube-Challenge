'use strict';

const youTubeURL = 'https://www.googleapis.com/youtube/v3/search';


// Function that calls API with that term. Note - default results is 5

function getDataFromApi(searchTerm, callback) {
	console.log (`getDataFromApi function accessed`);
  const query = {
    part: 'snippet',
    type: 'video',
	key: 'AIzaSyCQh-c-AAYXStZzevOUQ0WX53Ges_NXO9E',
	q: `${searchTerm}`,
  }
  $.getJSON(youTubeURL, query, callback);
}

// Function that produces the results html string to be put into the DOM

function resultsString (result) {
	console.log (`resultsString function accessed`);
	let resultsArray = [];
	for (let i=0; i<result.items.length; i++){
		resultsArray.push(`
	    <div>
	    	<a href = "https://www.youtube.com/watch?v=${result.items[i].id.videoId}"  target="_blank">
	   			<img src = "${result.items[i].snippet.thumbnails.medium.url}" alt="Thumbnail for '${result.items[i].snippet.thumbnails.title}'" class = "videoThumbnail">
	   		</a>
	    </div>`)
	};
	return resultsArray;

}

// Function that displays the results in the DOM

function renderResults (data) {
	console.log (`renderResults function accessed`);
	console.log (data);
	let finalDisplay = resultsString(data);
	$('.searchResults').html(finalDisplay);
}


// Function that pulls the value of what was entered in the form when button is clicked

function runSearch() {
	console.log (`runSearch function accessed`);
	$('.searchButton').on('click', function (event) {
		console.log (`submit event listener function accessed`);
		event.preventDefault();
		let searchText = $(".searchBox").val();
		console.log (`This is what the user searched for: ${searchText}`);
		$('.searchBox').val("");
		getDataFromApi (searchText, renderResults);
	});
}

$(runSearch);
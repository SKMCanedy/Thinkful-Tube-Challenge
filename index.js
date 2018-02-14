// Need help with:
// 1. Understanding why i had to define searchText variable outside the listener function then redefine with same information to get it to work
// reference: https://stackoverflow.com/questions/15236703/val-not-getting-updated-value-from-input
// 2. Figuring out how to get JSON results to render properly into my coding

'use strict';

const youTubeURL = 'https://www.googleapis.com/youtube/v3/search';


// Function that calls API with that term. Note - default results is 5

function getDataFromApi(searchTerm, callback) {
	console.log (`getDataFromApi function accessed`);
  const query = {
    part: 'snippet',
	key: 'AIzaSyCQh-c-AAYXStZzevOUQ0WX53Ges_NXO9E',
	q: `${searchTerm}`,
  }
  $.getJSON(youTubeURL, query, callback);
}

// GH Example || Function that produces the results html string to be put into the DOM

function resultsString (result) {
	console.log (`resultsString function accessed`);
	let resultsArray = [];
	for (let i=0; i<5; i++){
		resultsArray.push(`
	    <div>
	    	<a href = "https://www.youtube.com/watch?v=${result.items[i].id.videoId}">
	    		<img src = "${result.items[i].snippet.thumbnails.medium.url}" alt="Thumbnail for '${result.items[i].snippet.thumbnails.title}'" class = "videoThumbnail"/>
	    	</a>
	    </div>`)
	};
	return resultsArray;

}


function renderResults (data) {
	console.log (`renderResults function accessed`);
	console.log (data);
	// let returnedResults = JSON.parse(data);
	let finalDisplay = resultsString(data);
	$('.searchResults').html(finalDisplay);
}


// // GH Example || Function that displays the results html

// function displayResults (data) {
// 	console.log (`displayResults function accessed`);
//   const results = data.thumbnails.map((item, index) => resultsString(item));
//   $('.searchResults').html(results);
// }

// Function that pulls the value of what was entered in the form when button is clicked

function runSearch() {
	console.log (`runSearch function accessed`);
	let searchText = $(".searchBox").val();
	$('.searchButton').on('click', function (e) {
		console.log (`submit event listener function accessed`);
		event.preventDefault();
		searchText = $(".searchBox").val();
		console.log (`This is what the user searched for: ${searchText}`);
		$('.searchBox').val("");
		getDataFromApi (searchText, renderResults);
	});
}

$(runSearch);
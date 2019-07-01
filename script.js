'use strict';
const apiKey = 'AIzaSyCgg-72owDWeVhMRmUcYB58Gp2O0jymQvw';
const baseUrl = 'https://www.googleapis.com/youtube/v3/search';


function watchForm(){
    $('.mainScreen').submit(event =>{
        console.log("😭");
        event.preventDefault();
        const searchTerm = $('.userSearch').val();
        getYouTubeData(searchTerm);
    });
}

function getYouTubeData(searchTerm){
    const parameters={
        key:apiKey,
        q: searchTerm,
        part: 'snippet',
        maxResults: '8',
    };
    const url = baseUrl + '?'  + jQuery.param(parameters);
    console.log(url);
    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayVideoResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });   
}



function displayVideoResults(responseJson){
    console.log(responseJson);
    $('#result-list').empty();
    for (let i = 0; i < responseJson.items.length; i++){
      $('#result-list').append(
        `<h3>Title: ${responseJson.items[i].snippet.title}</h3>
            <ul>
            <a href = 'https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}'> 
            <img src = ${responseJson.items[i].snippet.thumbnails.default.url}></a>
            
            
            </ul>`
        )};
    $('#results').removeClass('hidden');

}

function displayProductResults(){


{/* <iframe id="inlineFrameExample"
    title="Inline Frame Example"
    width="300"
    height="200"
    src="https://www.homedepot.com/s/drill?NCNI-5">
</iframe>  */}
}



$(watchForm);


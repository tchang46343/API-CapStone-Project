'use strict';
const apiKey = 'AIzaSyCgg-72owDWeVhMRmUcYB58Gp2O0jymQvw';
const productApiKey ='api_key=53wmfi3n9gz2j9n9guxr4baw';
const videoBaseUrl = 'https://www.googleapis.com/youtube/v3/search';
const productBaseUrl = 'https://openapi.etsy.com/v2/listings/active.js?callback=processEtsyResponse';

function watchForm(){
    $('.mainScreen').submit(event =>{
        console.log("😭");
        event.preventDefault();
        const searchTerm = $('.userSearch').val();
        getYouTubeData(searchTerm);
        getProductResults(searchTerm);
    });
}

function getYouTubeData(searchTerm){
    const videoParameters={
        key:apiKey,
        q: searchTerm,
        part: 'snippet',
        maxResults: '8',
    };
    const url = videoBaseUrl + '?'  + jQuery.param(videoParameters);
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
            <a href = 'https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}'target=_blank'> 
            <img src = ${responseJson.items[i].snippet.thumbnails.default.url}></a>
            
            
            </ul>`
        )};
    $('#results').removeClass('hidden');

}
// function processEtsyResponse(data){
//     console.log(data);
// }
function getProductResults(searchTerm){
    const keyWord = 'keywords='+searchTerm;
    const maxResults ='limit=8';
    const url = productBaseUrl + '?' + productApiKey + '&' + keyWord + '&'+ maxResults;
    console.log(url);
    $.ajax({
        url: 'https://openapi.etsy.com/v2/listings/active.js',
     
        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
     
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
     
        // Tell YQL what we want and that we want JSON
        data: {
            api_key:'53wmfi3n9gz2j9n9guxr4baw',
            keyword: 'outlet',
            limit: 8,
        },
     
        // Work with the response
        success: function(response) {
            displayProductResults(response)
            console.log(response); // server response
        },
        //TODO: Implement Error Results
        // error: function(error){
            
        // };
    });
    // .then(response => {
    //     if (response.ok){
    //         return response.json();
    //     }
    //     throw new Error(response.statusText);
    // })
    // .then(responseJson => displayProductResults(responseJson))
    // .catch(err => {
    //   $('#js-error-message').text(`Something went wrong: ${err.message}`);
    // });  
//www.homedepot.com/s/drill?NCNI-5">

}

function displayProductResults(responseJson){
console.log(responseJson);
$('#product-list').empty();
    for (let i = 0; i < responseJson.results.length; i++){
      $('#product-list').append(
        `<h3>Title: ${responseJson.results[i].title}</h3>
            <ul>
            <li> Description: ${responseJson.results[i].description}</li>
            <li> Description: ${responseJson.results[i].price}</li>
            
            
            
            </ul>`
        )};
    $('#results').removeClass('hidden');
}


$(watchForm);


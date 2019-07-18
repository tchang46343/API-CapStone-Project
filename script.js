'use strict';
const apiKey = 'AIzaSyCgg-72owDWeVhMRmUcYB58Gp2O0jymQvw';
const videoBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

function watchForm(){
    $('.mainScreen').submit(event =>{
        event.preventDefault();
        const searchTerm = $('.userSearch').val();
        getYouTubeData(searchTerm);
        getProductResults(searchTerm);
    });
}
// The section below handles the auto scroll feature for displaying the results. In addition to the auto scroll feature the code below
// also hides the instructional message once executed.  
$(document).ready(function(){
    $('input.searchResult').on('click', function(event){ 
        $("body, html").animate({ 
            scrollTop: $('div.resultsContainer').offset().top 
        }, 1000);
        $('.instructionMessage').hide();  
    })
});
function getYouTubeData(searchTerm){
    const videoParameters={
        key:apiKey,
        q: searchTerm,
        part: 'snippet',
        maxResults: 4,
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
        if(responseJson.items.length>0){
            for (let i = 0; i < responseJson.items.length; i++){
                $('#result-list').append(
                `<h3>${responseJson.items[i].snippet.title}</h3>
                    <ul>
                    <a href = 'https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}'target=_blank'> 
                    <img src = ${responseJson.items[i].snippet.thumbnails.high.url}></a>
                    </ul>`
                )};
         }
        else{
             $('#result-list').text(`There are no result for the search phrase you enter. Please try again`); 
        }
    $('#main').removeClass('hidden');

}
function getProductResults(searchTerm){
    $.ajax({
        url: 'https://openapi.etsy.com/v2/listings/active.js',
        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        // Tell YQL what we want and that we want JSON
        data: {
            api_key:'53wmfi3n9gz2j9n9guxr4baw',
            keywords: searchTerm,
            limit: 5,
            includes:'Images:1',
            sort_on: 'score',
            geo_level: 'country',
            result:0
        },
        // Work with the response
        success: function(response) {
            displayProductResults(response)
            console.log(response); // server response
        },
        //TODO: Implement Error Results
        error: function(error){
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        }
    });
}
function displayProductResults(responseJson){
console.log(responseJson);
$('#product-list').empty();
    if(responseJson.results.length>0){
        for (let i = 0; i < responseJson.results.length; i++){
            $('#product-list').append(
                `<h3>${responseJson.results[i].title}</h3>
                    <ul class="product-details">
                    <li class="price"> $${responseJson.results[i].price}</li>
                    <li> <img src="${responseJson.results[i].Images[0].url_fullxfull}" alt= "${responseJson.results[i].description}"/></li>
                    </ul>`
        )};
    } 
    else{
        $('#product-list').text(`There are no result for the search phrase you enter. Please try again`); 
    }       
}
$(watchForm);


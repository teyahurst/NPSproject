'use strict'

const apiKey = 'HkqRRuZQt62dgueq9dNkRFlfCLSy2TZTe4WeEgB9';
const searchURL =`https://developer.nps.gov/api/v1/parks`




function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


function getParks(query, maxResults=10){
    const params = {
        key: apiKey,
        q: query,
        limit: maxResults,
    
    }
    const queryString = formatQueryParams(params)
    const url = `${searchURL}?${queryString}&api_key=${apiKey}`

    //console.log(url)

    fetch(url)
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`)
        });
}


function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    let i = 0; 

    responseJson.data.forEach(items => {
        $('#results-list').append(`<li class="name">Name:${items.fullName}</li><br>
                                    <li class="address">Address: ${items.addresses[0].line1}<br>${items.addresses[0].city}, ${items.addresses[0].postalCode}</li><br>
                                    <li class="description">Description:${items.description}<li><br>
                                    <li class="website"><a href="${items.url}">Link to Website</a></li><br>`)
    })
    $('#results').removeClass('hidden')
}


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();

        getParks(searchTerm, maxResults);
    })
}

$(watchForm);
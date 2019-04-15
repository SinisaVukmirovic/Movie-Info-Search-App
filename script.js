// DOM elements
let searchForm = document.querySelector('#search-form');
let movieInfo = document.querySelector('.movie-info');
let searchTerm = document.querySelector('.search-term');
let movieInfoElem = document.querySelector('.movie-info');

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    let searchValue = searchTerm.value;
    
    let poster = document.querySelector('.poster');
    let title = document.querySelector('.title');
    let genre = document.querySelector('.genre');
    let actors = document.querySelector('.actors');
    let year = document.querySelector('.year');
    let runtime = document.querySelector('.runtime');
    let language = document.querySelector('.language');
    let plot = document.querySelector('.plot');
    let imdbRating = document.querySelector('.imdb-rating');
    let awards = document.querySelector('.awards');
    let error = document.querySelector('.error');

    // getting the data from the API
    const api = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=${searchValue}&apikey=e63a508`;

    fetch(api)
        .then(response => response.text())
        .then(data => {

            let dataJson = JSON.parse(data);

            console.log(dataJson);

            if (dataJson.Response === 'False') {
                movieInfoElem.style.display = 'none';
                error.textContent = 'Sorry, no movie with that title. Please search again.';
            }
            else {
                movieInfoElem.style.display = 'flex';
                error.textContent = '';

                poster.setAttribute('src', dataJson.Poster);
                poster.setAttribute('alt', 'Movie Poster');
                title.textContent = dataJson.Title;
                genre.textContent = dataJson.Genre;
                actors.innerHTML = `<em class="detail">Actors: </em>${dataJson.Actors}`;
                year.innerHTML = `<em class="detail">Year: </em>${dataJson.Year} |`;
                runtime.innerHTML = `<em class="detail">Runtime: </em>${dataJson.Runtime} |`;
                language.innerHTML = `<em class="detail">Language: </em>${dataJson.Language}`;
                plot.textContent = dataJson.Plot;
                imdbRating.innerHTML = `<em class="detail">IMDB Rating: </em>${dataJson.imdbRating}`;
                awards.innerHTML = `<em class="detail">Awards: </em>${dataJson.Awards}`;
            }  
        })
        .catch(err =>  {
            console.log(err);
        });
    
    searchTerm.focus();
    searchTerm.value = "";

});


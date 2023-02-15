// autoComplete Configurations similar for both left and right side.
const autocompleteConfig = {
    /** renderOption
         * Formatted version of the data to be displayed in the dropdown.
         * i.e. Poster, Title, Year
         */
    renderOption (movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `;
    },
    /**inputValue
     * returns data to be displayed on the input after selecting a movie
     * from the dropdown.
     * i.e. Movie Title
     */
    inputValue(movie) {
        return movie.Title;
    },
    /** Fetch Data 
     * Asynchronous Function
     * Parameters (API Key, searchTerm from the input)
     * Returns a promise due to async keyword.
    */
    async fetchData (searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey : 'b964075e',
                s: searchTerm
            }
        })

        if(response.data.Error) {
            return [];
        }
        return response.data.Search;
    }
}

// Call createAutoComplete with the required arguments for left side.
createAutoComplete({
    ...autocompleteConfig,
    /** root
     * Element to which the elements created by JS will be appended.
     */
    root : document.querySelector('#left-autocomplete'),
    /** onOptionSelect
     * Actions to be performed after selecting a movie.
     */
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
    },
    
})

// Call createAutoComplete with the required arguments for right side.
createAutoComplete({
    ...autocompleteConfig,
     /** root
     * Element to which the elements created by JS will be appended.
     */
    root : document.querySelector('#right-autocomplete'),
    /** onOptionSelect
     * Actions to be performed after selecting a movie.
     */
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
    },
})

let leftMovie;
let rightMovie;

// Helper Function for fetching specific movie data and storing it to variables
const onMovieSelect = async ({imdbID}, summaryTarget, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey : 'b964075e',
            i: imdbID
        }
    });

    summaryTarget.innerHTML = movieTemplate(response.data)

    if (side === 'left') {
        leftMovie = response.data;
    } else if (side === 'right') {
        rightMovie = response.data;
    }
    
      if (leftMovie && rightMovie) {
        runComparison();
      }
}

/** runComparison()
 * Runs every time two movies are present in the comparison.
 * Changes css of the elements after the comparison to display the results.
 */
const runComparison = () => {

    // Fetching the DOM Elements of both sides to compare their properties and change their css.
    const leftSideStats = document.querySelectorAll('#left-summary .notification')
    const rightSideStats = document.querySelectorAll('#right-summary .notification')

    // Looping over all the obtained elements.
    leftSideStats.forEach((leftStat, index) => {

        // Right Side Equivalent.
        const rightStat = rightSideStats[index];

        // Parse the obtained elements to fetch their values. Also replacing NaN and null values with 0.
        const leftSideValue = parseFloat(leftStat.dataset.value) || 0;
        const rightSideValue = parseFloat(rightStat.dataset.value) || 0;

        // Comparing values.
        if(rightSideValue == leftSideValue) {
            leftStat.classList.add('is-primary')
            rightStat.classList.add('is-primary')
        }
        else if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary')
            leftStat.classList.add('is-warning')
        } else {
            rightStat.classList.remove('is-primary')
            rightStat.classList.add('is-warning')
        }
    })
}

// Helper Function for onMovieSelect to display the fetched information in a specific HTML format.
const movieTemplate = (movieDetail) => {
    
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    const metascore = parseInt(movieDetail.Metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
    
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
      }, 0);

    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article data-value=${awards} class = "notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class = "notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class = "notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class = "notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class = "notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
  `;
}
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const autherText = document.getElementById('auther');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// get quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        // response won't be set until the fetch happens 
        const response = await fetch(proxyUrl + apiUrl);
        // data won't be set until response is done.
        const data = await response.json();
        console.log(data);

        // if auther is blank, add 'unknown'
        if (data.quoteAuthor === '') {
            autherText.innerText = 'unknown'
        } else {
            autherText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        autherText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
    } catch (error) {
        getQuote();
    }
}

// On Load 
getQuote();
/*

API KEY : AIzaSyAM337uNye7v5t-HkV8ZWopbLo8XsxWt10

*/
const API_KEY = "AIzaSyAM337uNye7v5t-HkV8ZWopbLo8XsxWt10";

function fetchVideos(searchTerm, command) {
  let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchTerm}&type=video&part=snippet&maxResults=10`;

  let settings = {
    method: 'GET'
  };
  //console.log(url);
  fetch(url, settings)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .then(responseJSON => {
      displayResults(responseJSON);
    })
    .catch(err => {
      console.log(err);
    });
}

function displayResults(data) {
  let results = document.querySelector('.results');

  results.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    results.innerHTML += `
          <div>
          <a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
            <h2>
                ${data.items[i].snippet.title}  
            </h2>
          </a>
              <div>
                <a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
                  <img src="${data.items[i].snippet.thumbnails.high.url}" />
                </a>
              </div>
          </div>
      `;
  }
}

function watchForm() {
  let submitButtton = document.querySelector('.submitButtton');
  let previousButtton = document.querySelector('.previousButtton');
  let nextButtton = document.querySelector('.nextButtton');

  
  let command = 0;

  /* 
  command = 0 is the initial page
  command = 1 is the next page
  command = -1 is the prev page
  */

  submitButtton.addEventListener('click', (event) => {
    event.preventDefault();
    let searchTerm = document.querySelector('#searchTerm').value;
    fetchVideos(searchTerm, 0);

  });

  previousButtton.addEventListener('click', (event) => {
    event.preventDefault();
    let searchTerm = document.querySelector('#searchTerm').value;
    fetchVideos(searchTerm, -1);

  });

  nextButtton.addEventListener('click', (event) => {
    event.preventDefault();
    let searchTerm = document.querySelector('#searchTerm').value;
    fetchVideos(searchTerm, 1);

  });
}

function init() {
  watchForm();
}

init();
/*
API KEY : AIzaSyAM337uNye7v5t-HkV8ZWopbLo8XsxWt10
*/

const API_KEY = "AIzaSyAM337uNye7v5t-HkV8ZWopbLo8XsxWt10";
let nextPage;
let prevPage;
let pageNum = 0;

/*
for the seccond fetch attribute
  0 is the initial page
  1 is the next page
  -1 is the prev page
*/
function fetchVideos(searchTerm, command) {

  let url = ""
  if(command == 0){
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchTerm}&type=video&part=snippet&maxResults=10`;
  }
  else if (command == 1){
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchTerm}&type=video&part=snippet&maxResults=10&pageToken=${nextPage}`;
    pageNum += 1
  }
  
  else if (command == -1){
    url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchTerm}&type=video&part=snippet&maxResults=10&pageToken=${prevPage}`;
    pageNum -= 1
  }

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
  nextPage = data.nextPageToken;

	if(pageNum > 1) {
		prevPage = data.prevPageToken;
    }
}

function watchForm() {
  let submitButtton = document.querySelector('.submitButtton');
  let previousButtton = document.querySelector('.previousButtton');
  let nextButtton = document.querySelector('.nextButtton');


  /* 
  for the seccond fetch attribute
    0 is the initial page
    1 is the next page
    -1 is the prev page
  */

  submitButtton.addEventListener('click', (event) => {
    event.preventDefault();
    let searchTerm = document.querySelector('#searchTerm').value;
    fetchVideos(searchTerm, 0);
    pageNum = 1;

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
## Lab6 Youtube-App

- - -
For this lab we built a webpage that uses the Youtube API

which consists of the following:

1. You will have to create an HTML with a form that will have a text input and a
button. When the user types a search term and clicks the submit button you should
retrieve information from the YouTube API relevant to the given search term.

2. Based on the search results the page will display at maximum 10 videos each with:

* Title of the video

* Thumbnail image of the video

3. When clicking in the title or the thumbnail image you should open the
corresponding video in a new tab. A YouTube video has a unique id that is placed at
the end of the following URL in order to open it in play mode:
https://www.youtube.com/watch?v=IDGOESHERE

4. At the bottom of the list of results you will need to show buttons to get more
results (using the previous and next page links from the JSON). Add the appropriate
functionality to make this requirement possible.
// In the google developers console you must create a project
// Then on the credentials section: https://console.cloud.google.com/apis/credentials
// You have to create your KEY
// Then in the library: https://console.cloud.google.com/apis/library
// You have to enable YouTube Data API v3
// This is my API KEY, you can use it but you should use yours

//Commenting out your API Key
//var API_KEY = 'AIzaSyDHJmZWPRekpdFygpXw8jdpcR4kK4m_aBE'

//Inclusing my API Key here:
var API_KEY = 'AIzaSyC2-eGpObSgjAiw38eM9N1K-VmyjvFol5M'

// Listen for click event
//Commented this out to try a submit version
//$('#search-button').on('click', search)

//Trying submit version of search
$('#form').on('submit', search)

// Search for a specified string.
function search(e) {
  // Stop the refresh to send the data. We use JS for that.
  e.preventDefault()

  var query = $('#query').val()

  var API_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q='
    + query
    + '&type=video&key='
    + API_KEY
    + '&maxResults=20'

  var callbackWithResults = function (response) {
    // Check the results on the console to learn how to use the video data
    console.log('RESULTS:', response.items)

    var videoListHTML = response.items.map(function (result) {
      var video = result.snippet
      var videoID = result.id.videoId
      return renderVideoHTML(video, videoID)
    })

    $('#search-container').html(videoListHTML)

    $('a').on('click', renderVideoPlayer)

    $('#preview-video').on('click', '#close-button', function () {
      $('#preview-video').empty()
    })

    // Cleaning the previous query
    $('#query').val('')
  }

  // Make HTTP AJAX request
  $.get(API_URL, callbackWithResults)
}

// Render Video data
var renderVideoHTML = function (video, videoID) {
  var url = 'https://www.youtube.com/watch?v=' + videoID
  return (
// I need to figure out how to make the video title and image that apear in the DOM clickable to go through to their unique YouTube URL...
    '<div class="video-item">'
    + '<h1><a data-id="' + videoID + '" target="_blank" href="' + url + '">' + video.title + '</a></h1>'
    + '<a data-id="' + videoID + '" target="_blank" href="' + url + '"><img src="' + video.thumbnails.default.url  + '" /></a>'
    + '<p>' + video.description + '</p>'
  + '</div>'
  )
}

var renderVideoPlayer = function (e) {
  e.preventDefault()
  var videoID = $(e.target).data('id')
  $('#preview-video').html(
    '<div class="preview-video-modal">'
      + '<a id="close-button">X</a>'
      + '<iframe width="1440" height="630" src="https://www.youtube.com/embed/'
      + videoID
      + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    + '</div>'
  )
}

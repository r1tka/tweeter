/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//function that takes in a tweet object and is responsible for returning 
//a tweet <article> element containing the entire HTML structure of the tweet.

// Test / driver code (temporary). Eventually will get this from the server.
const parseDate = function(time) {
  const timeDifference = Date.parse(new Date) - time
  const sec = timeDifference / 1000;
  const min = sec / 60;
  const hour = min / 60;
  const day = Math.floor(hour / 24);
  const year = Math.floor(day / 365);
  if(year) {
    return `${year} years ago`
} else if (day) {
  return `${day} days ago`
} else if (hour) {
  return `${hour} hours ago`
} else if (min) {
  return `${min} minutes ago`
} else {
  return `${sec} seconds ago`
};
  
}


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(data) {
  return ( `<section class="tweet">
  <header class="tweet-header">
    <div class="avatar-container">
      <img class='avatar' src=${data.user.avatars}>
      <h3 class="username">${data.user.name}</h3>
    </div>
    <h3 class="nickname">${data.user.handle}</h3>
  </header>
  <div class="tweet-body">
    <p class="tweet-text">
      ${data.content.text}
    </p>
  </div>
  <footer class="tweet-footer">
    <p class="tweet-date">${parseDate(data.created_at)}</p>
    <div class="tweet-icon-buttons">
      <i class="fa-thin fa-flag"></i>
      <i class="fa-thin fa-retweet"></i>
      <i class="fa-thin fa-heart"></i>
    </div>
  </footer>      
</section>`
)}
 
const renderTweets = function(tweets) {
  for(let tweet of tweets) {
    $(`.tweets-container`).append(createTweetElement(tweet))
  }}

$(document).ready(() => {
  renderTweets(data)
  $( ".new-tweet-form" ).submit(function( event ) {
    event.preventDefault();
    const cleanData = $("#tweet-text").serialize()

      $.ajax({
      type: "POST",
      url: "/tweets",
      data: cleanData,
    });

    const loadtweets = function() {
      $.ajax({
        type: 'GET',
        url: "/tweets",
      })
    }
  })
 
})


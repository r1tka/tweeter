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
  
};
/* render insecure text: */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
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
      ${escape(data.content.text)}
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
    $(`.tweets-container`).prepend(createTweetElement(tweet))
  }}

$(document).ready(() => {

  
  $( ".new-tweet-form" ).submit(function( event ) {
    event.preventDefault();
    const cleanData = $("#tweet-text").serialize()
    if (cleanData.length > 145) {
      $('.error').text(`❌ Tweet content is too long!`);
      $('.error').css('border', '4px solid red');
      $('.error').slideDown(1000);
    } else if (cleanData.length === 5) {
      $('.error').text(`❌ Tweet can not be empty!`);
      $('.error').css('border', '4px solid red');
      $('.error').slideDown(1000);
    } else {
      $('.error').slideUp(1000);
      $.ajax({
        type: 'POST',
        url: "/tweets",
        data: cleanData
      })
      .then(() => {
        loadtweets();
      });
    }
    
    });
});
const loadtweets = function() {
  $.ajax({
    type: 'GET',
    url: "/tweets",
  }).then((data) => {
    renderTweets(data)
    console.log('data', data)
  }).catch((error) => {
    console.log('error', error)
  })
}



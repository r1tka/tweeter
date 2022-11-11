/* render insecure text: */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = function (data) {
  const ago = timeago.format(data.created_at); 
  return `
<section class="tweet">
  <header class="tweet-header">
    <div class="avatar-container">
      <img class="avatar" src=${data.user.avatars}/>
      <h3 class="username">${data.user.name}</h3>
    </div>
    <h3 class="nickname">${data.user.handle}</h3>
  </header>
  <div class="tweet-body">
    <p class="tweet-text">${escape(data.content.text)}</p>
  </div>
  <footer class="tweet-footer">
    <p class="tweet-date">${ago}</p>
    <div class="tweet-icon-buttons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-code-compare"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</section>
`
};

const renderTweets = function (tweets) {
  $( '.tweets-container' ).empty();
  for (let tweet of tweets) {
    $(`.tweets-container`).prepend(createTweetElement(tweet));
  }
};

$(document).ready(() => {
  loadtweets();
  $(".create-tweet").click(function () {
    $(".new-tweet-form").toggle();
  });
  $(".new-tweet-form").submit(function (event) {
    event.preventDefault();
    const cleanData = $("#tweet-text").serialize();
    //---------handle errors---------
    if (cleanData.length > 145) {
      $(".error").text(`❗️ Tweet content is too long!❗️`);
      $(".error").css("border", "4px solid red");
      $(".error").slideDown(1000);
    } else if (cleanData.length === 5) {
      $(".error").text(`❗️ Tweet can not be empty!❗️`);
      $(".error").css("border", "2px solid red");
      $(".error").slideDown(1000);
    } else {
      $(".error").slideUp(1000);
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: cleanData,
      }).then(() => {
        loadtweets();
      });
    }
  });
});
//--------loading new tweets-----
const loadtweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
  })
    .then((data) => {
      renderTweets(data);
      console.log("data", data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};


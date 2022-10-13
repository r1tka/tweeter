
$(document).ready(function() {
  const maxLength = 140;
  let num = maxLength;
/* set the max value of 140 */
  $('.new-tweet div output').val(num);
/* decrease num after every keydown */
  $('#tweet-text').keydown(function () {
    const tweetLength = $('#tweet-text').val().length;
    num = maxLength - tweetLength;
    if (num < 0) {
      /* change color to red when negative */
      $(this).siblings('div').children('output').val(num).css('color', 'red')
    } else {
      /* assign counter with num */
      $(this).siblings('div').children('output').val(num).css('color', 'grey')
    }
  });
});



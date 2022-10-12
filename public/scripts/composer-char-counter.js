
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

// $(document).ready(function() {
//   console.log(this)
//   const maxLength = 140; //max value 
//   let num = maxLength;

// $("#tweet-text").on( "keydown", function( event ) {
//     // const val = $( "#tweet-text" ).val();
//     const tweetLength = $('tweet-text').val().length
//     num = maxLength - tweetLength;
//     if(num < 0) {
//       $(this).siblings('div').children('output').val(num).css('color', 'red')
//     } else {
//       /* assign counter with num */
//       $(this).siblings('div').children('output').val(num).css('color', 'grey')
//     }
// });

// });

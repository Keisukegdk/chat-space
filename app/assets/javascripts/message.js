$(function() {

  function buildHTML(message) {
  var insertImage = '';
  if (message.image.url) {
    insertImage = `<img src="${message.image}">`;
  }
  var html = `
    <div class="message__name"> ${message.name} </div>
    <div class="message__name"> ${message.created_at} </div>
    <div class="message__name"> ${message.body} </div>
    ${insertImage}
    `
  return html;
  }
  $('#new_message').on('submit', function(e) {
    .done(function(data){
    var html = buildHTML(data);
    $('.message').append(html)
    $('.message__name').val('')
    $('.message__created_at').val('')
    $('.message__body').val('')
    })
    .fail(function(){
    alert('error');
    })
  });
});

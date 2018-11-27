$(function() {

  function buildHTML(message) {
    var insertImage = '';
    if (message.image === null) {
      insertImage = `<img src="${message.image}" class="none" >`;
    }else{
      insertImage = `<img src="${message.image}" class="message-image" >`;
    }
    var html = `
      <div class="message-content" message-id="${message.id}">
        <p class="message__name"> ${message.name}</p>
        <p class="message__date"> ${message.date}</p>
        <p class="message__text"> ${message.body} </p>
        ${insertImage}
      </div>`;
    return html
  }

  function appendHTML(html) {
    $('.message').append(html);
    $('.message').animate({ scrollTop: $('.message')[0].scrollHeight });
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      appendHTML(html)
      $("#new_message")[0].reset();
    })
    .fail(function(data){
    alert('error');
    });
    return false;
  });

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      //$('.message').animate({ scrollTop: $('.message')[0].scrollHeight });
      var latest_message_id = $('.message-content').last().attr('id')

    $.ajax({
      url: location.href,
      type: "GET",
      data: {id: latest_message_id},
      dataType: 'json',
    })

    .done(function(data) {
      data.forEach(function(message) {
        var html = buildHTML(message);
        appendHTML(html)
      })
    })
    .fail(function(data){
    alert('error');
    });
    } else {
        clearInterval(interval);
      }
  } , 5000 );
});

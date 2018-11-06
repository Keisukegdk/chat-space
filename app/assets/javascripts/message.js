$(function() {

  //HTMLの生成
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

  // 非同期通信
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
      console.log(data)
      var html = buildHTML(data);
      console.log(html)
      $('.message').append(html);
      $('.message-form').val('');
    })
    .fail(function(data){
    alert('error');
    });
    return false;
  });
});

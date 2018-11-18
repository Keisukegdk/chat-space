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

  // チャット投稿の非同期の記述
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
      $('.message').append(html);
        document.getElementById("new_message").reset();
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight });
    })
    .fail(function(data){
    alert('error');
    });
    return false;
  });

//自動更新機能を実装する
  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $(".message").animate({scrollTop:$('.message')[0].scrollHeight});
      var content_number = $('.message-content').length;
      var latest_message_id = (118 + content_number -1 );
      //過去のテストをしていた時に何度もデータを書いたのでidがずれているため、調整で書いています。本来は必要ないです。

    $.ajax({
      url: location.href,
      type: "GET",
      data: {id: latest_message_id},
      dataType: 'json',
    })

    .done(function(data) {
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.message').append(html);
        $(".message").animate({scrollTop:$('.messages')[0].scrollHeight});
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

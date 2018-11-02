$(function() {
  function buildHTML(message){
    var html = `
                <div class="message__name"> ${message.name} </div>
                <div class="message__name"> ${message.created_at} </div>
                <div class="message__name"> ${message.body} </div>
                `
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    console.log(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    });
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

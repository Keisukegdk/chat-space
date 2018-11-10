$(function() {

///インクリメンタルサーチ
  var search_list = $("#user-search-result");

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="
                    ${ user.id }" data-user-name="${ user.name }">追加</a>
                  </div>`
        search_list.append(html);
      }

      function appendNoUser(user) {
        var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user }</p>`
          search_list.append(html);
        }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      processData: false,
      contentType: false
    })

   .done(function(users) {
    console.log(users)
     $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致するユーザはいません");
     }
    })
   .fail(function(){
    window.alet('ユーザー検索に失敗しました')
   })
  });

////ユーザ追加の実装
var add_member = $("#chat-group-users")

function appendMember(user) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${ user.userId }'>
                <p class='chat-group-user__name'>${ user.userName }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    add_member.append(html);
}

  $(document).on("click", ".chat-group-user__btn--add", function() {
    var user = $(this).data();
    appendMember(user);
    $(this).parent().remove();
  });

  $(document).on("click", ".chat-group-user__btn--remove",function() {
    $(this).parent().remove();
  })

});


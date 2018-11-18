json.array! @new_message do |message|
  json.name     msssage.user.name
  json.date     message.created_at
  json.body     message.body
  json.image    message.image.url
  json.id       message.id
end




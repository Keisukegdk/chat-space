json.array! @new_messages do |message|
  json.name     message.user.name
  json.date     message.created_at
  json.body     message.body
  json.image    message.image.url
  json.id       message.id
end




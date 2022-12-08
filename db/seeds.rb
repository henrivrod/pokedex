response = RestClient.get 'https://pokeapi.co/api/v2/pokemon?limit=1154'
json= JSON.parse response
if !json.nil?
  json["results"].map do |pmon|
    response= RestClient.get "#{pmon["url"]}"
    json2 = JSON.parse response
    if !json2.nil?
      Pokemon.create(name: "#{pmon["name"]}", image_url: "#{json2["sprites"]["front_default"]}")
    else
      puts "error seeding pokemon"
    end
  end
else
  puts "error seeding pokemon"
end

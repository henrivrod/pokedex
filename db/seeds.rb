response = RestClient.get 'https://pokeapi.co/api/v2/type?limit=40'
json= JSON.parse response
if !json.nil?
  json["results"].map do |type|
    Type.create(name: "#{type["name"]}")
  end
else
  puts "error seeding types"
end

response = RestClient.get 'https://pokeapi.co/api/v2/pokemon?limit=1154'
json= JSON.parse response
if !json.nil?
  json["results"].map do |pmon|
    response= RestClient.get "#{pmon["url"]}"
    json2 = JSON.parse response
    if !json2.nil?
      Pokemon.create(name: "#{pmon["name"]}", image_url: "#{json2["sprites"]["front_default"]}")
      json2["types"].map do |poketype|
        type=Type.find_by name: "#{poketype["type"]["name"]}"
        poke=Pokemon.find_by name: "#{pmon["name"]}"
        PokeType.create(pokemon_id: poke.id, type_id: type.id)
      end
    else
      puts "error seeding poketypes"
    end
  end
else
  puts "error seeding pokemon"
end
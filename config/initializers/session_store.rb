if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_pokedex', domain: 'pokedex-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_pokedex'
end

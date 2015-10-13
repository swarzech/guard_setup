haml_coffee_options = {
  input: 'app/assets/templates',
  output: 'app/assets/guard_output'
}

guard 'haml-coffee', haml_coffee_options do
  watch(/^.+(\.jst?\.hamlc)\Z/)
end

guard :sprockets, minify: 'yes', destination: '../phonegap_app/www/assets/js', asset_paths: ['app/assets/javascripts', 'app/assets/guard_output', 'app/assets/stylesheets', 'vendor/assets/javascript'] do
  watch 'app/assets/javascripts/application.js.coffee'
end

guard :sprockets, minify: 'yes', destination: '../phonegap_app/www/assets/css', asset_paths: ['app/assets/stylesheets'] do
  watch 'app/assets/stylesheets/application.css.scss'
end

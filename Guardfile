# A sample Guardfile
# More info at https://github.com/guard/guard#readme

## Uncomment and set this to only include directories you want to watch
# directories %w(app lib config test spec features) \
#  .select{|d| Dir.exists?(d) ? d : UI.warning("Directory #{d} does not exist")}

## Note: if you are using the `directories` clause above and you are not
## watching the project directory ('.'), then you will want to move
## the Guardfile to a watched dir and symlink it back, e.g.
#
#  $ mkdir config
#  $ mv Guardfile config/
#  $ ln -s config/Guardfile .
#
# and, you'll have to watch "config/Guardfile" instead of "Guardfile"

coffeescript_options = {
  input: 'app/assets/javascripts',
  output: '..phonegap_app/www/assets/js',
  patterns: [%r{^app/assets/javascripts/(.+\.(?:coffee|coffee\.md|litcoffee))$}]
}

guard 'coffeescript', coffeescript_options do
  coffeescript_options[:patterns].each { |pattern| watch(pattern) }
end

guard 'sass', :input => 'app/assets/stylesheets', :output => '..phonegap_app/www/assets/css'

haml_coffee_options = {
  # input: 'app/assets/javascripts',
  # output: '..phonegap_app/www/assets/templates'
  # input: 'foo/bar', # strips 'foo/bar/' from output file name
  # output: 'public/baz', # output dir
  #
  # Example (given above options): src/foo/bar/a.js.hamlc -> public/baz/a.js
}

guard 'haml-coffee', haml_coffee_options do
  watch(/^.+(\.js\.hamlc)\Z/)
end

###
# Sample Guardfile block for Guard::Uglify
#
# :input        - input file to compress
# :output       - file to write compressed output to
# :run_at_start - compressed input file when guard starts
# :uglifier     - options to be passed to the uglifier gem
###
guard "uglify", :input => "app/assets/javascripts/application.js", :output => "public/javascripts/application.js"

guard :jammit do
  watch(%r{^app/assets/stylesheets/(.*)\.css$})
end

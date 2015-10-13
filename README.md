# guard_setup
Instructions on how to setup Guard to replicate assets pipeline

1. Pull down latest repository

1. Run 'bundle install' and 'bundle update' 

1. Run 'bundle exec guard init' in console (must run it with bundler since we're using a gemfile)

1. In directory in terminal, run 'guard' to start guard up

1. Hamlc Templates that are saved will be compiled to guard_output_templates, which application.js.coffee reads from to compile to the application.js file. Application.js.coffee must be saved to initiate guard to compile the new application file every time a template is saved

1. Done!
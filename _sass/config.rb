# syntax
preferred_syntax = :scss

# paths
http_path = "/"
css_dir = "../css"
images_dir = "../img"
javascripts_dir = "../js"
sass_dir = "./sass"

# style
line_comments = false
output_style = :expanded

# autoprefixer
require 'autoprefixer-rails'
on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css)
  end
end
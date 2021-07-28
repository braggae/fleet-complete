const mix = require('laravel-mix');

mix.js('front-end/javascript/main.js', 'public/javascript')
   .vue()
   .sass('front-end/sass/app.scss', 'public/stylesheets');

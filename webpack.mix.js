const mix     = require('laravel-mix');
const webpack = require("webpack");
const config  = require('dotenv').config();

mix.js('front-end/javascript/main.js', 'public/javascript')
   .vue()
   .sass('front-end/sass/app.scss', 'public/stylesheets')
   .webpackConfig({
                      plugins: [new webpack.DefinePlugin({
                                                             "MAPS_API_KEY": JSON.stringify(
                                                                 process.env.MAPS_API_KEY,
                                                             ),
                                                         })],
                  });

A basic webpack project with SASS and ES6.

# General usage
Clone this repo, delete the `.git` folder and initialize as a new repo for your own client side web project. Remember to modify `package.json` accordingly, specifically the name and version of the project.

To build on prod, duplicate the webpack.config.js and change `mode` to `production`, removing the sourcemaps. Use the new config to build a build appropriate for a production environment.

# Using third-party libraries from node-modules
Use `npm install --save` to save the client-side library; e.g. `npm install --save react react-dom`. You should be able to now import your library using `import 'mylibrary';`. To use non-ES6 compatible libraries in your code use `script-loader` like so:

```
import 'script-loader!moment/moment';
```

# Setting up for ReactJS
Clone the 'reactjs' branch of this repo which will have everything set up and ready to go.

`git clone -b reactjs https://github.com/podrezo/webpack-example.git`

# Known Issues
* The `context` variable doesn't seem to work correctly; it will still look for the entry point files (e.g. `app.js` and `index.html`) in the root directory if used.

# Credits
This code is adapted from [here](https://hackernoon.com/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a) and a few other other sources like stack overflow.
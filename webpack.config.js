const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MinChunkSizePlugin = require("webpack/lib/optimize/MinChunkSizePlugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {

  mode : "development",

  entry : "./src/main.jsx",

  output : {
    path : path.resolve(__dirname, "dist"),
    filename : "main.js"
  },

  devServer : {
    contentBase : path.resolve(__dirname, "dist"),
  },

  resolve : {
    extensions : [".js", ".jsx"]
  },

  module : {
    rules : [{
      test : /\.(js|jsx)$/,
      loader : "babel-loader",
      options : {
        presets : ["@babel/preset-react"]
      }
    }]
  },

  plugins : [
    new CopyPlugin({
      patterns : [{ from : "./templates" }]
    }),
    new ModuleFederationPlugin({
      name : "app1",
      library : {
        type : "var",
        name : "app1"
      },
      filename : "remoteEntry.js",
      remotes : {
        app2 : "app2"
      }
    }),
    new MinChunkSizePlugin({
      minChunkSize : 10000
    })
  ],

  optimization : {
    minimize : false
  }

};

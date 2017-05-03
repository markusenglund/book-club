const path = require("path")

module.exports = {
  entry: path.join(__dirname, "src", "App.jsx"),
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react", "env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}

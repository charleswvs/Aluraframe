
const path = require('path');

module.exports = {
    entry: './app-src/app.js', //primeiro módulo carregado na aplicação
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //"__dirname" é uma variável do node.js
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}  
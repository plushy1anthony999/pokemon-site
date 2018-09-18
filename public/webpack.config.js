module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {filename: 'bundle.js'},
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
        
    }
}
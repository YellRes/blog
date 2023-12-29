import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: './webpack/main.cjs',
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle-webpack.js'
    },
    plugins: [new HtmlWebpackPlugin()]
}
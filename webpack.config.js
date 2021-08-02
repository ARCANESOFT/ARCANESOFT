const path = require('path')

module.exports = (webpack) => {
    return {
        resolve: {
            extensions: ['.js', '.json', '.ts', '.vue', '.sass', '.scss'],
            alias: {
                vue$: 'vue/dist/vue.esm-bundler.js'
            }
        },
        plugins: [
            // See: http://link.vuejs.org/feature-flags
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false
            })
        ],
    }
}

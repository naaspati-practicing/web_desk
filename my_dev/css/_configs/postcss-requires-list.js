const modules = [
// 'postcss-comment', // https://www.npmjs.com/package/postcss-comment
// 'postcss-for', // https://github.com/antyakushev/postcss-for
// 'postcss-each' // https://github.com/outpunk/postcss-each
// 'postcss-nested',
// 'postcss-jsmath'
//  'postcss-utilities',  // https://github.com/ismamz/postcss-utilities
// 'postcss-mixins'
// 'postcss-easings',  // https://github.com/postcss/postcss-easings
// 'postcss-conditionals'

// 'postcss-simple-vars'
// 'postcss-color-function',  // https://github.com/postcss/postcss-color-function
// 'postcss-nested-props'
// 'lost'
// 'postcss-css-reset', // https://www.npmjs.com/package/postcss-css-reset
'autoprefixer'
];

const { resolve } = require( 'path' );

function postcss_icon( data ) {
    /**
     * const output = {
        path: resolve( process.cwd(), data.config.css_dest, 'postcss-icons' ),
        formats: ['woff2', 'woff'],
        url( { cssFile, fontName, hash } ) {return `postcss-icons/${fontName}`;}
    };
     */
    return {
        'postcss-icon.font-awesome-v4': {
            prefix: 'fa-', /* required when using multiple Icon data sets */
            output: {
                inline: ['woff2'],
                path: resolve( process.cwd(), data.config.css_dest, 'postcss-icons' ),
                formats: ['woff2', 'woff'],
                url( { cssFile, fontName, hash } ) {return `postcss-icons/${fontName}`;}
            }

        }
    };
}

const configs = {
    // "autoprefixer": { browserslist: ['last 1 versions'] },
    'postcss-utilities': { centerMethod: 'flexbox' },
    'postcss-icon': postcss_icon
};

module.exports = {modules, configs};


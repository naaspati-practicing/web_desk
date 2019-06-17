'use strict';

let data;
const path = './postcss-requires-list.js';
const chalk = require( 'chalk' );

function maker() {
    delete require.cache[require.resolve( path )];
    const {modules, configs} = require( path );

    const ret = [];
    const strings = [];

    for ( const line of modules ) {
        let config = configs[line];

        if ( typeof config === 'function' )
            config = config( data );

        strings.push( config ? `${line}(${JSON.stringify( config, null, '  ' )}) ` : line );
        ret.push( config ? require( line )( config ) : require( line ) );
    }
    console.log( chalk.yellow( '-----------------------------------' ) );
    console.log( chalk.cyan( 'postcss-requires: ' ), '\n  ' + strings.join( '\n  ' ) );
    console.log( chalk.yellow( '-----------------------------------' ) );
    return ret;
}

module.exports = function ( dt, loc2 ) {
    data = dt;
    return maker;
};
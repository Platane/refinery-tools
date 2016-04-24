import {list}           from './list'
import {nest}           from 'utils/object'

export const state = ( list, previous={} ) => {
    const by_id = {...previous}
    list
        .filter( x => !by_id[ x.id ] )
        .forEach( x => by_id[ x.id ] = nest( x.afterState ) )

    return by_id
}

state.dependencies = [ list ]
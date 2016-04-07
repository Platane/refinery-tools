import React, {PropTypes, Component} from 'react'
import ObjectTree_       from './objectTree.jsx'

const decorateObject = ( x, opened, path = [] ) => {

    // treat array as object
    if ( Array.isArray( x ) )
        x = x.reduce( (o, value, i) => ({ ...o, [ `[${i}]`]: value })  , {} )

    if ( typeof x != 'object' )
        return x

    return Object.keys( x )
        .map( key => {

            const _path = [ ...path, key ]

            return {
                key,
                path    : _path.join('.'),
                opened  : !!opened[ _path.join('.') ],
                value   : decorateObject( x[key], opened, _path ),
            }
        })
}

class ObjectTree extends Component {

    constructor(){
        super()

        this.state = { opened: {}  }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.object != this.props.object
            || nextState.opened != this.state.opened
    }

    componentDidMount() {
        this.setState({ opened: {} })
    }

    open( path ){
        this.setState({ opened: { ...this.state.opened, [path]:true  } })
    }

    close( path ){
        this.setState({ opened: { ...this.state.opened, [path]:false  } })
    }

    render() {

        const x = decorateObject( this.props.object, this.state.opened )

        return <ObjectTree_  x={x} open={ this.open.bind( this ) } close={ this.close.bind( this ) } />
    }
}

export default ObjectTree
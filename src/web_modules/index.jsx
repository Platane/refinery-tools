import React, {PropTypes, Component} from 'react'
import App  from 'component/app.jsx'

import * as fragment    from 'fragment'
import {create}         from 'october'

const extractGraph = (fragments, by_id) => {
    const graph = []
    fragments.forEach( fragment => {
        graph[ fragment.index ] = {
            name    : fragment.id,
            arc     : fragment.dependencies.map( id => by_id[id].index ),
            index   : fragment.index
        }
    })
    return graph
}

class OctoberTools extends Component {

    static propsTypes = {
        list        : PropTypes.func.isRequired,
        dispatch    : PropTypes.func.isRequired,
    };

    static childContextTypes = {
        dispatch      : PropTypes.func.isRequired,
        getValue      : PropTypes.func.isRequired,
        register      : PropTypes.func.isRequired,
        unregister    : PropTypes.func.isRequired,
    };

    constructor(){

        super()

        this.store = create( fragment )

        this._graphLoop = () => {

            this.store.dispatch( {type:'graph:step'} )

            requestAnimationFrame( this._graphLoop )
        }
    }

    componentDidMount() {


        // the graph

        const graph = extractGraph( this.props.list(), this.props.by_id() )
            .map( (n,i,arr) =>
                ({
                    ...n,
                    x:Math.cos( i/arr.length*6.28 +1 )*10,
                    y:Math.sin( i/arr.length*6.28 +1 )*10,
                })
            )

        this.store.dispatch( {type:'graph:init', payload:{graph} } )

        this._graphLoop()


        // the dispatcher
        // ...
    }

    getChildContext() {
        return {
            dispatch      : this.store.dispatch,
            getValue      : this.store.getValue,
            register      : this.store.register,
            unregister    : this.store.unregister,
        }
    }

    render() {
        return <App />
    }
}

export default OctoberTools

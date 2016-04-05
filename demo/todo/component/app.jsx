import React, {PropTypes, Component} from 'react'
import Todo from './todo.jsx'
import OctoberTools from '../../../src/index.jsx'

class App extends Component {

    static childContextTypes = {
        dispatch        : PropTypes.func.isRequired,
        register        : PropTypes.func.isRequired,
        list            : PropTypes.func.isRequired,
    };

    getChildContext() {
        return {
            dispatch        : this.props.dispatch,
            register        : this.props.register,
            list            : this.props.list,
        }
    }

    render() {
        return (
            <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Todo />
                <OctoberTools {...this.props} />
            </div>
        )
    }
}

export default App

import React, {PropTypes} from 'react'
import Arc      from './arc'
import Node     from './node'

const Flow = ({ branch, node, position, k, source }) =>
(

    <g className="flow">


        {
            node
                .map( (A,i) =>
                    <Node key={i} changed={ k-0.5 > A.k } { ...A } />
                )
        }

        {
            branch
                .filter( ({ka}) => k-0.5 > ka  )
                .map( ({ka, kb, points }, i) =>
                    <Arc key={ i } path={points} k={ Math.min( ( k -0.5 - ka )/( kb - ka ), 1) } />
            )
        }
    </g>
)
// {
//     source
//         .map( (A,i) =>
//             <Arc key={ 's'+i } k={Math.min( k*2, 1) } path={[ {x:A.x, y:A.y- 10}, A ] } />
//         )
// }
//

// Flow.PropTypes = {
//     branch : PropTypes.arrayOf(
//         PropTypes.shape({
//             A    : PropTypes.object.isRequired,
//             B    : PropTypes.object.isRequired,
//             kb    : PropTypes.number.isRequired,
//             ka    : PropTypes.number.isRequired,
//             path : PropTypes.array.isRequired,
//         })
//     ).isRequired,
//
//     source : PropTypes.arrayOf( PropTypes.number.isRequired ).isRequired,
//
//     k    : PropTypes.number.isRequired,
//
//     position: PropTypes.arrayOf(
//         PropTypes.shape({
//             x    : PropTypes.number.isRequired,
//             y    : PropTypes.number.isRequired,
//         })
//     ).isRequired,
// }

export default Flow

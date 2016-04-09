import React, {PropTypes} from 'react'

const Arc = ({ A, B, k }) =>
(
    <g>
        <line x1={A.x} x2={  k*B.x + (1-k)*A.x } y1={A.y} y2={ k*B.y + (1-k)*A.y } stroke="#7446a0" stroke-width="0.4" />
    </g>
)

Arc.PropTypes = {
    A   : PropTypes.shape({
        x       : PropTypes.number.isRequired,
        y       : PropTypes.number.isRequired,
    }),
    B   : PropTypes.shape({
        x       : PropTypes.number.isRequired,
        y       : PropTypes.number.isRequired,
    }),
    k       : PropTypes.number.isRequired,
}

export default Arc
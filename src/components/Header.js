import PropTypes from 'prop-types'
import Button from './Button'

import { useLocation } from 'react-router-dom'


function Header(props) { 
    const location = useLocation()

    return (
        <header className = 'header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' && (
            <Button onClick = {props.onAdd} 
            color = {props.showAdd ? 'red' : 'green'} 
            text= {props.showAdd ? 'Close' : 'Add'} />
            )}
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
Header.prototypes = {
    title: PropTypes.string.isRequired
}

//CSS in JS
// const headingStyle  = {
//     color : 'yellow',
//     backgroundColor: 'black'

// }
export default Header

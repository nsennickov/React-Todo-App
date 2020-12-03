import React from 'react'


const Todo = (props) => {
    return(
        <div className='item'>
            <span><strong>{props.kluch})</strong></span>
            <h1 className='item-header'>{props.value}</h1>
            <button className='item-btn-change' onClick={props.change}>R</button>
            <button className='item-btn-remove' onClick={props.remove}>&#10004;</button>
        </div>
    )
}


export default Todo

import React from 'react'
import LiComponent from './li-component'

const DropdownComponent = ({ currentPL, playlist, onLiClickHandler }) => (
    <li className='nav-item dropdown'>
        <a
            className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button'
            data-bs-toggle='dropdown' aria-expanded='false'
        >
            Playlist
        </a>
        <ul onClick={onLiClickHandler} className='dropdown-menu' aria-labelledby='navbarDropdown'>
            {playlist.map((p, index) => <LiComponent id={p.id} classe='dropdown-item' key={index} link='#' text={p.title} />)}
        </ul>
    </li>
)

export default DropdownComponent

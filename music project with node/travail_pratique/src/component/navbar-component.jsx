import React from 'react'
import DropdownComponent from './dropdown-component'

const NavbarComponent = ({ currentPL, playlist, onLiClickHandler, onInputChangeHandler, onSubmitHandler }) => (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>Music</a>
                <button
                    className='navbar-toggler' type='button' data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon' />
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>

                        <DropdownComponent
                            currentPL={currentPL}
                            playlist={playlist}
                            onLiClickHandler={onLiClickHandler}
                        />

                    </ul>
                    <input onChange={onInputChangeHandler} className='form-control me-2' type='search' placeholder='Search' aria-label='Search' />
                    <button onClick={onSubmitHandler} className='btn btn-outline-success'>Search</button>
                </div>
            </div>
        </nav>
    </div>
)

export default NavbarComponent

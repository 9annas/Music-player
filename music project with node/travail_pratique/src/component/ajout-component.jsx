import React from 'react'
const AjoutComponent = ({ tracklist, onClickHandler }) => (
    <div className='col-sm'>
        <div className='card' style={{ width: '18rem', marginTop: '20px' }}>
            <div className='card-header'>
                Featured
            </div>
            <ul className='list-group list-group-flush' onClick={onClickHandler}>
                {tracklist.map((t, index) => <li className='list-group-item' id={index} key={index} link='#'>{t.title} </li>)}
            </ul>
        </div>
    </div>
)

export default AjoutComponent

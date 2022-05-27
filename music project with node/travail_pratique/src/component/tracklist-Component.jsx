import React from 'react'

const TracklistComponent = ({ tracklist, onClickHandler }) => (
    <div className='col-sm'>
        <div className='card' style={{ width: '18rem', marginTop: '20px' }}>
            <div className='card-header'>
                Track list
            </div>
            <ul className='list-group list-group-flush' onClick={onClickHandler}>
                {tracklist.map((t, index) => <li className='list-group-item' key={index} link='#'>{t.title}</li>)}
            </ul>
        </div>
    </div>
)

export default TracklistComponent

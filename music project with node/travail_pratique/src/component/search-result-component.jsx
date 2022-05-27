import React from 'react'

const SearchResultComponent = ({ album, onAnkerClickHandler }) => (
    <div className='card' style={{ maxWith: '500px', marginTop: '20px' }}>
        <div className='row g-0'>
            <div className='col-sm-5'>
                <img src={album.uri} className='card-img-top h-100' alt={album.title} />
            </div>
            <div className='col-sm-7'>
                <div className='card-body'>
                    <h5 className='card-title'>Title: {album.title}</h5>
                    <p className='card-text'>Style: {album.style}</p>
                    <p className='card-text'>Year: {album.year}</p>
                    <button data-index-number={album.id} className='btn btn-primary stretched-link' onClick={onAnkerClickHandler}>Detail</button>
                </div>
            </div>
        </div>
    </div>
)

export default SearchResultComponent

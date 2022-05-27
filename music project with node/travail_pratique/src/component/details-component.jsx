import React from 'react'
import AjoutComponent from '../component/ajout-component'

const DetailsComponent = ({ playlist, name, style, image, year, onClickAddHandler }) => (
    <div className='col-sm'>
        <div className='playlist' style={{ marginTop: '20px' }}>
            <div className='row'>
                <div className='col'>
                    <div className='card'>
                        <img src={image} alt='' width={600} height={600} />
                        <div className='card-body'>
                            <h5> artiste: {name} </h5>
                            <div>style: {style}</div>
                            <div>year: {year}</div>
                        </div>
                    </div>
                </div>
                <AjoutComponent
                    tracklist={playlist} onClickHandler={onClickAddHandler}
                />
            </div>
        </div>
    </div>
)
export default DetailsComponent

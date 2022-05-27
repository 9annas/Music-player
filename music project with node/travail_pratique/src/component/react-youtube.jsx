import React, { Component } from 'react'
import YouTube from 'react-youtube'

class Playlist extends Component {
    constructor (props) {
        super(props)

        this.state = {
            index: 0,
            options: {
                height: '390',
                width: '640',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 0
                }
            }
        }

        this.onEndHandler = this.onEndHandler.bind(this)
        this.handleNextOnClick = this.handleNextOnClick.bind(this)
        this.handlePreviousOnClick = this.handlePreviousOnClick.bind(this)
    }

    onEndHandler () {
        if (this.state.index < this.props.tracks.length - 1) {
            this.setState({
                index: this.state.index + 1,
                options: {
                    ...this.state.options,
                    playerVars: {
                        autoplay: 1
                    }
                }
            })
        }
    }

    handleNextOnClick () {
        console.log(this.state.index)
        console.log(this.props.tracks[this.state.index])
        if (this.state.index < this.props.tracks.length - 1) {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    handlePreviousOnClick () {
        console.log(this.state.index)
        console.log(this.props.tracks[this.state.index])
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    getVideoId () {
        let videoId = ''
        if (this.props.tracks.length > 0) {
            const uri = this.props.tracks[this.state.index].uri
            videoId = uri.substring(uri.indexOf('=') + 1)
        }
        return videoId
    }

    onClickHandler (index) {
        this.setState({
            index: index
        })
    }

    render () {
        return (
            <div className='col-sm'>
                <div className='playlist' style={{ marginTop: '20px' }}>
                    <div className='row'>
                        <div className='col'>
                            <div className='card'>
                                <YouTube
                                    videoId={this.props.tracks.length > 0 ? this.props.tracks[this.state.index].uri : 'ly8RJvEEOhE'}
                                    opts={this.state.options}
                                    handleOnEnd={this.onEndHandler}
                                />
                                <div className='card-body'>
                                    <h5 className='card-title' />
                                    <div>
                                        <button onClick={this.handlePreviousOnClick}><i className='fas fa-step-backward' />Previous</button>
                                        <button onClick={this.handleNextOnClick}><i className='fas fa-step-forward' />Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <ul className='list-group' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Playlist

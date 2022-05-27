import React, { Component } from 'react'
import MusicData from '../../discogs'
import NavbarComponent from '../component/navbar-component'
import Playlist from '../component/react-youtube'
import SearchResultComponent from '../component/search-result-component'
import TracklistComponent from '../component/tracklist-Component'
import DetailsComponent from '../component/details-component'

const USER_TOKEN = 'QpeolbLiuPlWndEwCCVvXsiYUzyfHqGWVtHYDYjH'
class MainPageContainer
    extends Component {
    constructor (props) {
        super(props)

        this.state = {
            playlist: [],
            track: [{ uri: 'ly8RJvEEOhE' }],
            selectedPlaylist: '',
            currentPage: 0,
            searchData: '',
            currentSearch: {},
            currentMaster: 0,
            currentPL: 'default',
            albums: [],
            master: {},
            selectedAlbum: {}
        }

        this.handleOnLiClick = this.handleOnLiClick.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnAnkerClick = this.handleOnAnkerClick.bind(this)
        this.handleOnClickAdd = this.handleOnClickAdd.bind(this)
        this.handleOnTrackClick = this.handleOnTrackClick.bind(this)
        this.temp = {}
    }

    /* callback (data) {
        this.setState({ currentSearch: data })
        console.log(data)
        console.log('mon resulta')
    } */

    handleOnClickAdd (event) {
        console.log(event.target.id)
        console.log(this.state.selectedAlbum.videos[event.target.id])
        let title = this.state.selectedAlbum.videos[event.target.id].title
        title = title.replace("'", '')
        const uri = this.state.selectedAlbum.videos[event.target.id].uri.substring(this.state.selectedAlbum.videos[event.target.id].uri.indexOf('=') + 1)
        console.log(uri)
        console.log(title)
        console.log(this.state.selectedAlbum.id)
        console.log(this.state.currentPL)
        fetch('http://localhost:8080/ajout/' + this.state.currentPL + '/' + title + '/' + uri + '/' + this.state.selectedAlbum.id + '', { method: 'PUT' })
            .then(response => response.json())
            .then(response => {
            })
    }

    componentDidMount () {
        fetch('http://localhost:8080/genres', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlist: response })
            })

        fetch('http://localhost:8080/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ track: response })
            })
        const m = new MusicData(USER_TOKEN)
        m.search({ query: 'kygo', perPage: 2 }, (data) => {
            this.setState({ currentSearch: data })
        })
    }

    handleOnLiClick (event) {
        this.setState({ selectedPlaylist: event.target.childNodes[0] })
        console.log('id')
        console.log(event.target.id)
        this.setState({ currentPL: event.target.id })
        fetch('http://localhost:8080/playlist/' + event.target.id, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ track: response })
                console.log('mes tracks')
                console.log(this.state.track)
            })
    }

    handleOnInputChange (event) {
        this.setState({ searchData: event.target.value })
    }

    handleOnTrackClick (event) {
        console.log(event.target)
    }

    handleOnSubmit (event) {
        this.setState({ albums: [] })
        const music = new MusicData(USER_TOKEN)
        // this.setState({ currentPage: 1 })
        music.search({ query: this.state.searchData, perPage: 5 }, (data) => {
            data.results.map((r) => {
                let master = {}
                music.getMaster(r.master_id, (m) => {
                    master = {
                        id: r.master_id,
                        title: m.title,
                        style: m.genres[0],
                        year: m.year,
                        uri: m.images[0].uri
                    }
                    this.setState({ master: master })
                })
                return master
            })
        })
        this.setState({ currentPage: 1 })
    }

    handleOnAnkerClick (event) {
        const m = new MusicData(USER_TOKEN)
        console.log(event.target.getAttribute('data-index-number'))
        this.setState({ currentMaster: event.target.getAttribute('data-index-number') })

        m.getMaster(event.target.getAttribute('data-index-number'), (data) => {
            this.setState({ selectedAlbum: data }, () => {
                console.log('dans le test log')
                console.log(this.state.selectedAlbum.videos)
                console.log(this.state.selectedAlbum)
                this.setState({ currentPage: 2 })
            })
        })
    }

    render () {
        console.log('start render')
        console.log(this.state.currentPL)
        console.log(this.state.electedAlbum)
        if (Object.keys(this.state.master).length > 0) {
            this.state.albums.push(this.state.master)
        }
        let page = (
            <div className='row'>
                <Playlist />
                <TracklistComponent
                    tracklist={this.state.playlist}
                />
            </div>
        )
        switch (this.state.currentPage) {
        case 0:
            page = (
                <div className='row'>
                    <Playlist tracks={this.state.track} />
                    <TracklistComponent
                        tracklist={this.state.track}
                        onClickHandler={this.handleOnTrackClick}
                    />
                </div>
            )
            break

        case 1:
            page = (
                <div>
                    {this.state.albums.map((a, index) =>
                        <SearchResultComponent
                            key={index}
                            album={a}
                            onAnkerClickHandler={this.handleOnAnkerClick}
                        />
                    )}

                </div>
            )
            break
        case 2:
            page = (
                <div className='row'>
                    <DetailsComponent playlist={this.state.selectedAlbum.videos} name={this.state.selectedAlbum.artists[0].name} style={this.state.selectedAlbum.styles} image={this.state.selectedAlbum.images[0].resource_url} year={this.state.selectedAlbum.year} onClickAddHandler={this.handleOnClickAdd} />
                </div>
            )
            break
        default:
            break
        }
        return (
            <div>
                <NavbarComponent
                    currentPL={this.state.currentPL}
                    playlist={this.state.playlist}
                    onLiClickHandler={this.handleOnLiClick}
                    onInputChangeHandler={this.handleOnInputChange}
                    onSubmitHandler={this.handleOnSubmit}
                />
                <div className='container'>
                    {page}
                </div>
            </div>
        )
    }
}

export default MainPageContainer

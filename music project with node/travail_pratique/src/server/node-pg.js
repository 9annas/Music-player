const { Client } = require('pg')

function establishConnexion () {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'tp_music',
        user: 'postgres',
        password: 'postgres'
    })
    client.connect()
    return client
}

function genreList (resultCallback) {
    // let genreListResult
    const connection = establishConnexion()
    connection.query('SELECT * FROM playlist', (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        connection.end()
    })
}

function deleteFromPlaylist (param) {
    const connection = establishConnexion()
    connection.query('DELETE FROM track WHERE id = ' + param + '', (error, result) => {
        if (error) {
            throw error
        }
        connection.end()
    })
}
function addTrack (playId, title, uri, master) {
    const connection = establishConnexion()
    connection.query("INSERT INTO track (playlist_id,title,uri,master_id) VALUES ('" + playId + "','" + title + "','" + uri + "','" + master + "')", (error, result) => {
        if (error) {
            throw error
        }
        connection.end()
    })
}
function showPlayList (param, resultCallback) {
    const connection = establishConnexion()
    connection.query('SELECT * FROM track WHERE playlist_id = ' + param + '', (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result.rows)
        console.log('dans la query function')
        connection.end()
    })
}
/* client.connect((error) => {
    if (error) {
        console.error('connexion error', error.stack)
    } else {
        console.log('connected')
    }
})

client.query('SELECT * FROM playlist', (error, result) => {
    if (error) {
        throw error
    }
    console.log('dans la query function')
    console.log(result)
    client.end()
}) */

module.exports = {
    genreList,
    addTrack,
    deleteFromPlaylist,
    showPlayList
}

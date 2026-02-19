import { Pool } from 'pg';

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongs(playlistId){
        const query = {
            text: 'SELECT playlists.id, playlists.name, users.username ' +
                'FROM playlists ' +
                'LEFT JOIN users ON playlists.owner = users.id ' +
                'WHERE playlists.id = $1',
            values: [playlistId]
        }

        const resultPlaylist = await this._pool.query(query);

        if (resultPlaylist.rowCount === 0) {
            return null;
        }

        const querySongs = {
            text: 'SELECT songs.id, songs.title, songs.performer ' +
                'FROM songs JOIN playlist_songs ON songs.id = playlist_songs.song_id ' +
                'WHERE playlist_songs.playlist_id = $1',
            values: [playlistId]
        }

        const resultSongs = await this._pool.query(querySongs);

        const playlist = resultPlaylist.rows[0];

        return {
            playlist: {
                id: playlist.id,
                name: playlist.name,
                songs: resultSongs.rows
            }
        }
    }
}

export default PlaylistService;
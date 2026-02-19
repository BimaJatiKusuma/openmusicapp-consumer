import { Pool } from 'pg';

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongs(playlistId){
        const query = {
            text: 'SELECT playlist.id, playlist.name, users.username ' +
            'FROM playlist ' +
            'LEFT JOIN users ON playlist.owner = users.id ' +
            'WHERE playlist.id = $1',
            values: [playlistId]
        }

        const resultPlaylist = await this.pool.query(query);

        if (resultPlaylist.rowCount === 0) {
            return null;
        }

        const querySongs = {
            text: 'SELECT songs.id, songs.title, songs.performer ' +
                'FROM songs JOIN playlist_songs ON songs.id = playlist_songs.song_id ' +
                'WHERE playlist_songs.playlist_id = $1',
            values: [id]
        }

        const resultSongs = await this.pool.query(querySongs);

        const playlist = resultPlaylist.rows[0];

        return {
            id: playlist.id,
            name: playlist.name,
            username: playlist.username,
            songs: resultSongs.rows
        }

    }
}

export default PlaylistService;
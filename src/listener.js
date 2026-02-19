class Listener {
    constructor(playlistService, mailSender) {
        this.playlistService = playlistService;
        this.mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this.playlistService.getPlaylistSongs(playlistId);

            const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(playlist));

            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Listener;
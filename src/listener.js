class Listener {
    constructor(playlistService, mailSender) {
        this.playlistService = playlistService;
        this.mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString());

            const playlist = await this.playlistService.getPlaylist(userId);
            const result = await this.mailSender.sendMail(targetEmail, JSON.stringify(playlist));
            console.log(result);
        } catch {
            console.log(error)
        }
    }
}

export default Listener;
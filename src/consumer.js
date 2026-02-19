import 'dotenv/config';
import amqp from 'amqplib';
import PlaylistService from './PlaylistService.js';
import MailSender from './MailSender.js';
import Listener from './Listener.js';

const init = async () => {
    const playlistService = new PlaylistService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:notes', {
        durable: true
    });

    channel.consume('export:notes', listener.listen, { noAck: true });
}

init()
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const siteDoDelivery = 'https://delivery-eats-gaon.vercel.app/'; 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    if (message.body.toLocaleLowerCase() === 'oi') {
        client.sendMessage(message.from, 'Olá, Bem-vindo(a) ao DeliveryEats!');
        client.sendMessage(message.from, 'Deseja fazer um pedido?');
        client.sendMessage(message.from, '1. Sim');
        client.sendMessage(message.from, '2. Não');   
    }

    if (message.body.toLocaleLowerCase() === '1') {
        client.sendMessage(message.from, 'Entre no nosso Cardápio e realize o seu pedido: ' + siteDoDelivery);  
    }

    if (message.body.toLocaleLowerCase() === '2') {
        client.sendMessage(message.from, 'O que você deseja?');
        client.sendMessage(message.from, 'a. Falar com o atendente');
        client.sendMessage(message.from, 'b. Informações sobre o seu pedido');
    }

    if (message.body.toLocaleLowerCase() === 'a') {
        client.sendMessage(message.from, 'Ok! A gabi irá realizar o seu atentimento');
    }

    if (message.body.toLocaleLowerCase() === 'b') {
        client.sendMessage(message.from, 'Só um momentinho, que iremos verificar o seu pedido');

        // Aguardar 1 minuto antes de enviar o status do pedido
        setTimeout(() => {
            client.sendMessage(message.from, 'Seu pedido está á caminho!');
        }, 60000); // 60000 ms = 1 minuto
    }

    if (message.body.toLocaleLowerCase().includes('pedido')) {   
        client.sendMessage(message.from, 'Seu pedido foi recebido com sucesso! Em breve entraremos em contato para confirmar os detalhes.');
    }
});

client.initialize();
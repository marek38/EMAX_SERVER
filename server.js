const WebSocket = require('ws');

// Vytvorenie WebSocket servera
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Nové spojenie prijaté.');

    // Spracovanie prijatých správ od klienta
    ws.on('message', (message) => {
        console.log(`Prijatá správa: ${message}`);

        // Odošleme prijatú správu všetkým pripojeným klientom
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Posielame prijatú správu
            }
        });
    });

    // Pri odpojení klienta
    ws.on('close', () => {
        console.log('Klient sa odpojil.');
    });
});

console.log('WebSocket server beží na porte 8080.');

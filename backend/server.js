const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Allow the frontend on port 8080 to communicate with the backend.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            service: 'financial-computing-backend'
        }));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Financial Computing backend is running'
    }));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend running on port ${PORT}`);
});
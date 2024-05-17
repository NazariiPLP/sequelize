const http = require('http');
const PORT = process.env.PORT || 5000

const server = http.createServer();

server.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

http.createServer((req, res) => {
    const query = url.parse(req.url);
    let pathname = query.pathname;

    pathname = pathname === '/' ? '/index.html' : pathname;
    if (!path.extname(pathname)) {
        pathname += '.html';
    }
    const filename = "." + pathname;

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found: ");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);

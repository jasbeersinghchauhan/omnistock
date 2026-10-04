'use strict';

import http from 'node:http';
import process from 'node:process';

import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = (PORT) => {
    const server = http.createServer(app);

    server.headersTimeout = 20000;      //Headers parsing time
    server.requestTimeout = 40000;      //Complete request receiving time after header
    server.keepAliveTimeout = 50000;    //Keep socket open after last request received

    server.listen(PORT, "0.0.0.0", () => {
        console.log(`[SERVER] Initialized on port ${PORT}`);
    });

    const gracefulShutdown = () => {
        console.log("[SERVER] Shutdown initialized");

        server.close(() => {
            console.log("[SERVER] HTTP Server closed");
            process.exit(0);
        });
    };

    process.on('SIGTERM', gracefulShutdown);
};

startServer(PORT);
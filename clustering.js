import os from 'os';
import { dirname } from 'path';
import cluster from 'cluster';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.availableParallelism();  
console.log("🚀 ~ cpuCount:", cpuCount);
const pid = process.pid;
console.log("🚀 ~ pid:", pid);

if (cluster.isPrimary) {
    cluster.setupPrimary({
        exec: `${__dirname}/server.js`,
    });

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} killed`);
        console.log('starting another worker');
        cluster.fork();
    });
} else {
    import(`${__dirname}/server.js`);
}


/*
This code block checks if the current process is the primary cluster. If it is the primary cluster, it sets up the primary cluster, forks multiple worker processes based on the available CPU count, and handles the exit event of workers by forking another worker. 
If the current process is not the primary cluster, it imports the server.js file.
*/
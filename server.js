import express from 'express';

const app = express();

const port = 7000;
app.listen(port, () => {        
    console.log(`\nListening to port ${port}`);
    console.log(`Worker process id ${process.pid} \n`);
});

app.get('/load', (req, res) => {
    try {
        let total = 0;

        for (let i = 0; i < 10_000_000; i++) {
            total += i;
        }  
        console.log('Received');

        res.send(`CPU intensive task result = ${total}`);
    } catch (error) {
        console.log("🚀 ~ app.get ~ error:", error);
        res.status(500).send('Internal Server Error');
    }
});

import express from 'express';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Enable CORS for your frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ae419a4fbd0029.lhr.life'); // frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, goldsky-webhook-secret');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    next();
});

app.use(bodyParser.json());

// Interface to match Goldsky webhook payload
interface WebhookData {
    data: {
        new: {
            block$: number;
            block_number: string;
            contract_id: string;
            from: string;
            id: string;
            timestamp: string;
            to: string;
            transaction_hash: string;
            value: string;
            vid: string;
        };
        old: null;
    };
    data_source: string;
    delivery_info: {
        current_retry: number;
        max_retries: number;
    };
    entity: string;
    id: string;
    op: string;
    webhook_id: string;
    webhook_name: string;
}

// Webhook endpoint
app.post('/webhook', (req: Request<{}, {}, WebhookData>, res: Response) => {
    const webhookSecret = req.headers['goldsky-webhook-secret'];
    if (webhookSecret !== 'some-secret') {
        res.status(401).json({ error: 'Invalid webhook secret' });
    }

    const { data } = req.body;

        
    if (!data || !data.new || !data.new.transaction_hash) {
        console.error("Missing transaction hash in webhook data:", req.body);
        res.status(400).json({ error: 'Invalid webhook data structure' });
    }

    const message = {
        status: 'success',
        amount: (BigInt(data.new.value) / 10n ** 18n).toString(), // Convert Wei to ETH
        message: `Transfer confirmed with hash: ${data.new.transaction_hash}`,
        timestamp: new Date().toISOString(),
    };

    console.log('Received webhook data:', message);

    
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });

    res.status(200).json({ received: true });
});

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

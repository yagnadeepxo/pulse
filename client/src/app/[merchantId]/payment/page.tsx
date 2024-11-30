"use client";

import { useState, useEffect, useCallback } from "react";
import { PaymentHandler } from "@/sdk/paymentHandler";
import React from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface PaymentStatus {
    status: string;
    amount: string; 
    message: string;
    timestamp: string;
}

export default function PaymentPage() {
    const params = useParams();
    const merchantId = params?.merchantId as string;
    const [amount, setAmount] = useState(0);
    const [qrCode, setQRCode] = useState("");
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectWebSocket = useCallback(() => {
        const socket = new WebSocket("https://6dc9-2401-4900-1cb4-6e83-cc8a-cb4e-cc80-9f03.ngrok-free.app");

        socket.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setPaymentStatus(message);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
            setTimeout(connectWebSocket, 5000);
        };

        return socket;
    }, []);

    useEffect(() => {
        const socket = connectWebSocket();
        return () => socket.close();
    }, [connectWebSocket]);

    const handleGenerateQRCode = async () => {
        const handler = new PaymentHandler(merchantId);
        const code = await handler.generateQRCode(amount, "0x15a5F0CC0eBbD6af48100885BB0c217457B01d14");
        setQRCode(code);
    };

    return (
        <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4] flex flex-col">
            <main className="flex-grow flex items-start justify-center px-4 py-12 mt-2">
                <Card className="bg-[#1a4f3f] border-[#2a5f4f] shadow-xl w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-serif text-[#c9b037]">
                            Payment for Merchant
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                placeholder="Enter amount"
                                className="bg-[#0a2f1f] border-[#2a5f4f] text-[#e0d4b4] placeholder-[#b0a484]"
                            />
                            <Button
                                onClick={handleGenerateQRCode}
                                className="bg-[#c9b037] hover:bg-[#d4bb4c] text-[#0a2f1f]"
                            >
                                Generate QR Code <ArrowRight className="ml-2" size={16} />
                            </Button>
                        </div>

                        {qrCode && (
                            <div className="mt-6 flex justify-center">
                                <img src={qrCode} alt="QR Code" className="max-w-full h-auto" />
                            </div>
                            
                        )}

                        {paymentStatus && (
                            <Card className={`mt-6 ${
                                paymentStatus.status === "success"
                                    ? "bg-[#1a4f3f] border-[#2a5f4f]"
                                    : "bg-[#4f3f1a] border-[#5f4f2a]"
                            }`}>
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-2">
                                        {paymentStatus.status === "success" ? (
                                            <CheckCircle className="text-[#c9b037] mr-2" size={24} />
                                        ) : (
                                            <AlertCircle className="text-[#c9b037] mr-2" size={24} />
                                        )}
                                        <h3 className="text-xl font-semibold text-[#c9b037]">
                                            {paymentStatus.status === "success" ? "Payment Successful!" : "Payment Status"}
                                        </h3>
                                    </div>
                                    <div className="space-y-1 text-[#e0d4b4]">
                                        <p>{paymentStatus.message}</p>
                                        <p className="text-sm opacity-75">Amount: {paymentStatus.amount} USDe</p>
                                        <p className="text-sm opacity-75">
                                            Time: {new Date(paymentStatus.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {!isConnected && (
                            <Card className="mt-6 bg-[#4f1a1a] border-[#5f2a2a]">
                                <CardContent className="p-4">
                                    <div className="flex items-center mb-2">
                                        <WifiOff className="text-[#c9b037] mr-2" size={24} />
                                        <h3 className="text-xl font-semibold text-[#c9b037]">Connection Lost</h3>
                                    </div>
                                    <p className="text-[#e0d4b4]">Attempting to reconnect to payment server...</p>
                                </CardContent>
                            </Card>
                        )}

                        {isConnected && (
                            <div className="flex items-center justify-center text-[#c9b037]">
                                <Wifi size={16} className="mr-2" />
                                <span>Connected to payment server</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

/*
goldsky subgraph webhook create usde-payment-tracking-ethena-testnet/v1 \
--name "USDeTransferWebhook-live" \
--url " https://6dc9-2401-4900-1cb4-6e83-cc8a-cb4e-cc80-9f03.ngrok-free.app" \
--entity "transfer" \
--secret "some-secret"
*/

/*goldsky subgraph webhook create usde-payment-tracking-ethena-testnet/v1 \
--name "USDeTransferWebhook-live2" \
--url " https://6dc9-2401-4900-1cb4-6e83-cc8a-cb4e-cc80-9f03.ngrok-free.app/webhook" \
--entity "transfer" \
--secret "some-secret"
✔ Creating webhook

Webhook 'USDeTransferWebhook-live2' with ID 'webhook_cm4369m6l70l601qcefoi6dyx' created.
Make sure calls to your endpoint have the following value for the 'goldsky-webhook-secret' header: some-secret
*/
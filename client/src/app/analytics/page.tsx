"use client";

import React, { useState, useEffect } from 'react';
import { fetchTransfersFromSubgraph } from './gqlClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transfer {
  id: string;
  from: string;
  to: string;
  value: string;
  timestamp_: number;
  transactionHash_: string;
}

export default function AnalyticsDashboard() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransfersFromSubgraph().then((data) => {
      setTransfers(data);
      setLoading(false);
    });
  }, []);

  const totalValue = transfers.reduce((sum, transfer) => sum + parseFloat(transfer.value), 0);
  const averageValue = totalValue / transfers.length;
  const latestTransfer = transfers[transfers.length - 1];

  const chartData = transfers.map((transfer) => ({
    date: new Date(parseInt(String(transfer.timestamp_)) * 1000).toLocaleDateString(),
    value: parseFloat(transfer.value),
  }));

  const formatAddress = (address: string) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };

  return (
    <div className="min-h-screen bg-[#0a2f1f] text-[#e0d4b4]">
      <main className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Transfer Value</CardTitle>
              <DollarSign />
            </CardHeader>
            <CardContent>
              {loading ? "Loading..." : `${(totalValue / 10**18).toFixed(2)} USDe`}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Transfer Value</CardTitle>
              <TrendingUp />
            </CardHeader>
            <CardContent>
              {loading ? "Loading..." : `${(averageValue / 10**18).toFixed(2)} USDe`}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Latest Transfer</CardTitle>
              <Clock />
            </CardHeader>
            <CardContent>
              {loading ? "Loading..." : `${latestTransfer?.value ? (parseFloat(latestTransfer.value) / 10**18).toFixed(2) : "N/A"} USDe`}
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transfer Value Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              "Loading..."
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.map(data => ({...data, value: data.value / 10**18}))}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Transaction Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              "Loading..."
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Amount (USDe)</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers.map((transfer) => (
                    <TableRow key={transfer.transactionHash_}>
                      <TableCell>{formatAddress(transfer.from)}</TableCell>
                      <TableCell>{formatAddress(transfer.to)}</TableCell>
                      <TableCell>{(parseFloat(transfer.value) / 10**18).toFixed(2)}</TableCell>
                      <TableCell>
                        <a 
                          href={`https://testnet.explorer.ethena.fi/tx/${transfer.transactionHash_}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-400 hover:underline"
                        >
                          {formatAddress(transfer.transactionHash_)}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="mr-2 w-4 h-4" />
                          Paid
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
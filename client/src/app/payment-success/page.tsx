"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    //const amount = searchParams.get("amount");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Payment Successful</h1>
            <p>Thank you for your payment!</p>
            
            <p>We appreciate your business.</p>
        </div>
    );
}

// src/client/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './styles.css';

const initialOptions = {
    "client-id": "YOUR_CLIENT_ID", // Replace with your client ID
    currency: "USD",
    intent: "capture"
};

function App() {
    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtonsComponent />
            </PayPalScriptProvider>
        </div>
    );
}

function PayPalButtonsComponent() {
    const createOrder = (data, actions) => {
        return fetch('/payments/create-order/?amount=10.00') // Replace with the actual amount
            .then(response => response.json())
            .then(order => order.id)
            .catch(error => {
                console.error('Error creating order:', error);
            });
    };

    const onApprove = (data, actions) => {
        return fetch(`/payments/capture-order/${data.orderID}/`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // OPTIONAL: Call your server to save the transaction
        })
        .catch(error => {
            console.error('Error capturing order:', error);
        });
    };

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

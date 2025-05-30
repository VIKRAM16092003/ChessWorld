import React, { useState } from 'react';

function RazorPay() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount === '' || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded');
      return;
    }

    setIsLoading(true);

    const options = {
      key: 'rzp_test_JdptvhQetEqRQv', // Replace with your live key in production
      amount: Number(amount) * 100, // Amount in paise
      currency: 'INR',
      name: 'CHESS-GAME',
      description: 'Tournament Entry Fee',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        setIsLoading(false);
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
        }
      },
      prefill: {
        name: 'haribabu',
        email: 'harirom5444v@gmail.com',
        contact: '7397410796',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#333333',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full border-t-4 border-black">
        <h1 className="text-2xl font-bold text-center text-black mb-6 tracking-wide uppercase">
          Join the Chess Tournament
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="number"
            min="1"
            placeholder="Enter Amount (INR)"
            className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base text-gray-800"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 rounded-lg font-semibold text-base shadow transition duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Processing...' : 'Pay & Join Now'}
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-5">
          Secure payments by <span className="font-medium text-black">Razorpay</span>
        </p>
      </div>
    </div>
  );
}

export default RazorPay;

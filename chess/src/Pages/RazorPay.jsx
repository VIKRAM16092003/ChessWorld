import React, { useState } from 'react';

function RazorPay() {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount === '') {
      alert('Please enter amount');
    } else {
      let options = {
        key: 'rzp_test_JdptvhQetEqRQv',
        amount: amount * 100,
        currency: 'INR',
        name: 'CHESS-GAME',
        description: 'Tournament Entry Fee',
        handler: function (response) {
          alert('Payment ID: ' + response.razorpay_payment_id);
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

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full border-t-4 border-black">
        <h1 className="text-2xl font-bold text-center text-black mb-6 tracking-wide uppercase">Join the Chess Tournament</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="number"
            min="1"
            placeholder="Enter Amount (INR)"
            className="border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-base text-gray-800"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white py-2  rounded-lg font-semibold text-base hover:bg-gray-800 transition duration-300 shadow"
          >
            Pay & Join Now
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

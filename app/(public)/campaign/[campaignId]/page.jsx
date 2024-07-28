"use client"
import { useLazyGetCampaignQuery } from '@/redux/services/campaignApi';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DonationPage = () => {
  const { campaignId } = useParams();
  const [get, { data: campaign, error, isLoading }] = useLazyGetCampaignQuery();
  const [donationAmount, setDonationAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (campaignId) {
      console.log(campaignId);
      get(campaignId);
    }
  }, [campaignId]);

  const handlePresetClick = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount('');
  };

  const displayedAmount = customAmount || donationAmount;

  const handlePayment = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        });

        const data = await res.json();
        console.log(data);
        handlePaymentVerify(data.data)
    } catch (error) {
        console.log(error);
    }
}

  const handlePaymentVerify = async (data) => {
    const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Devknus",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response) => {
            console.log("response", response)
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                })

                const verifyData = await res.json();

                if (verifyData.message) {
                    toast.success(verifyData.message)
                }
            } catch (error) {
                console.log(error);
            }
        },
        theme: {
            color: "#5f63b8"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}

  return (
    <div className="bg-gray-100 py-10">
      <div className="md:container mx-auto py-10 px-4 ">
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={campaign?.data?.campaign?.featured_image_base_url}
            alt={campaign?.data?.campaign?.temple_name}
            className="w-full h-60 object-cover rounded-lg block lg:hidden"
          />
          <div className="lg:w-2/3 order-2 lg:order-1">
            <img
              src={campaign?.data?.campaign?.featured_image_base_url}
              alt={campaign?.data?.campaign?.temple_name}
              className="w-full h-96 object-cover rounded-lg hidden lg:block"
            />
            <div className="flex justify-center my-6 sticky-donation-card ">
              <button className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 hover:via-brown-500 text-white font-bold py-2 px-4 rounded">Seva</button>
              <button className="mx-2 py-2 px-4 rounded bg-white border border-gray-300 text-orange-500 font-bold">Story</button>
              <button className="mx-2 py-2 px-4 rounded bg-white border border-gray-300 text-orange-500 font-bold">Videos</button>
              <button className="mx-2 py-2 px-4 rounded bg-white border border-gray-300 text-orange-500 font-bold">Updates</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

              {campaign?.data?.subdonations?.map((data,i)=>(

              <div className="bg-white rounded-lg shadow-lg p-4" key={i+"dfv"}>
                <img
                  src={data?.featured_image}
                  alt="Donation Item"
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-4 text-xl font-bold">{data?.name}</h3>
                <div className="mt-2 text-gray-700 !h-32 overflow-auto">
                  {data?.description}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-orange-500 font-bold">₹{data?.amount}</span>
                  <button className="py-2 px-4 bg-orange-500 text-white rounded">Add +</button>
                </div>
              </div>
              ))}
             
              {/* Repeat the above block for other donation items */}
            </div>

            <div className="mt-10 border-2 p-3 rounded">
              <h2 className="text-3xl font-bold mb-4">Story</h2>
              <p className="text-gray-700 leading-relaxed">{campaign?.data?.campaign?.about}</p>
              {/* Repeat the above paragraph for other story contents */}
            </div>
          </div>

          <div className="lg:w-1/3 order-1 lg:order-2 bg-white rounded-lg shadow-lg p-6 h-fit sticky-donation-card">
            <h3 className="text-xl font-bold mb-1 capitalize ">{campaign?.data?.campaign?.campaign_name}</h3>
            <p className=''>{campaign?.data?.campaign?.description}</p>
            <div className="text-gray-700 text-xs md:text-sm mb-4"> <span className='font-bold text-red-500'>Trust</span> : {campaign?.data?.campaign?.trust}</div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 text-xs md:text-sm"> <span className='font-bold text-red-500'>Date:</span> <br /> {moment(campaign?.data?.campaign?.created_at).format("DD/MM/yyy")}</span>
              <span className="text-gray-700 capitalize text-xs md:text-sm"><span className='font-bold text-red-500'>Location:</span> <br /> {campaign?.data?.campaign?.location}</span>
              <span className="text-gray-700 capitalize text-xs md:text-sm"><span className='font-bold text-red-500'>Event:</span> <br /> {campaign?.data?.campaign?.event}</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold">{Math.round((Math.round(campaign?.data?.campaign?.donated_amount) / Math.round(campaign?.data?.campaign?.target_amount)) * 100)}% raised</span>
                <span className="text-gray-700">₹{Math.round(campaign?.data?.campaign?.donated_amount)} raised out of ₹{Math.round(campaign?.data?.campaign?.target_amount)}</span>
              </div>
              <input
                type="range"
                value={Math.round((Math.round(campaign?.data?.campaign?.donated_amount) / Math.round(campaign?.data?.campaign?.target_amount)) * 100)}
                className="w-full mt-2"
                readOnly
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <button
                  className={`py-2 px-4 rounded-lg ${donationAmount === 500 ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white' : 'border border-red-500 text-red-500'}`}
                  onClick={() => handlePresetClick(500)}
                >
                  ₹500
                </button>
                <button
                  className={`py-2 px-4 rounded-lg ${donationAmount === 1000 ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white' : 'border border-red-500 text-red-500'}`}
                  onClick={() => handlePresetClick(1000)}
                >
                  ₹1000
                </button>
                <button
                  className={`py-2 px-4 rounded-lg ${donationAmount === 2000 ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white' : 'border border-red-500 text-red-500'}`}
                  onClick={() => handlePresetClick(2000)}
                >
                  ₹2000
                </button>
              </div>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mt-4">
              <button className="w-full bg-orange-500 text-white py-2 rounded">
                I Donate ₹{displayedAmount}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-bold">Donors (70)</h4>
              <div className="flex justify-between mt-2">
                <button className="py-2 px-4 rounded bg-orange-500 text-white font-bold">Recent</button>
                <button className="py-2 px-4 rounded bg-white border border-gray-300 text-orange-500 font-bold">Most Generous</button>
              </div>
              <ul className="mt-4">
                <li className="mb-2 flex justify-between items-center">
                  <span>Nayana M</span>
                  <span>₹1216</span>
                </li>
                <li className="mb-2 flex justify-between items-center">
                  <span>Thalapureddi</span>
                  <span>₹1216</span>
                </li>
                <li className="mb-2 flex justify-between items-center">
                  <span>Bharath D Su</span>
                  <span>₹1216</span>
                </li>
                <li className="mb-2 flex justify-between items-center">
                  <span>Anonymous</span>
                  <span>₹1216</span>
                </li>
                {/* Repeat the above block for other donors */}
              </ul>
              <button className="w-full mt-4 py-2 px-4 rounded bg-orange-500 text-white font-bold">View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;

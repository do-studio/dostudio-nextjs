'use client'
import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'

const GetinTouch = () => {
    const [value, setValue] = useState()
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the message
    const message = `Name: ${formData.name}%0aMobile Number:${value}+${formData.mobileNumber}`;

    // Replace 'YOUR_PHONE_NUMBER' with your phone number including the country code
    const whatsappLink = `https://wa.me/919746155541?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    setFormData({ name: '', mobileNumber: ''});
  };


  return (
    <div className='bg-black text-white w-full h-full'>
        <div className='w-11/12 xl:w-10/12 mx-auto grid grid-cols-1 gap-5 md:grid-cols-6 py-20'>
            <div className='md:col-span-3 lg:col-span-3 xl:col-span-4 flex items-center'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold'>Get in Touch</h1>
            </div>
            <form className='selection:bg-white selection:text-black md:col-span-3 lg:col-span-3 xl:col-span-2  flex flex-col gap-y-3' onSubmit={handleSubmit}>
                    <input className='py-2 border-b-2 duration-150 border-gray-300  outline-none w-full bg-transparent' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' required/>
                    <div className='flex'>
                        <PhoneInput
                        required
                        className="phonecode border-b-2 w-28 "
                        international
                        // defaultCountry="IN"
                        value={value}
                        onChange={setValue}
                        />
                        <input  className='py-2 border-b-2 duration-150 border-gray-300  outline-none w-full bg-transparent [&::-webkit-inner-spin-button]:appearance-none' type="number" inputMode='numeric' name="mobileNumber" value={formData.mobileNumber}  onChange={handleChange} placeholder='Phone Number' required/>
                    </div>

                    <button className='bg-white text-black w-40 h-10 mt-3' type='submit'>Send</button>
            </form>
        </div>
    </div>
  );
};

export default GetinTouch;
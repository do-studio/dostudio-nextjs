import React from 'react'

const Contact = () => {
  return (
    <main className='min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20'>
             <div className='space-y-5'>
                <h1 className='text-5xl font-medium'>Reach Out to Our Team.</h1>
                <p className='text-base xl:text-xl font-light'>You can send us an email or simply fill out the enquiry form and we will get back to you as soon as possible.</p>
             </div>
             {/*  */}
             <div className='grid grid-cols-1 md:grid-cols-2 xl:gap-x-32 gap-y-10 pt-10 xl:pt-32 h-full'>
                {/* address */}
                <div className='flex flex-col gap-5 xl:gap-10 font-light text-base xl:text-2xl'>
                  <div className='flex flex-col'>
                    <a className='hover:underline' href="mailto:info@dostudio.co.in" target='_blank'>info@dostudio.co.in</a>
                    <a className='hover:underline' href="tel:+919995055541" target='_blank'>+91 9995055541</a>
                    <a className='hover:underline' href="tel:+919746155541" target='_blank'>+91 9746155541</a>
                  </div>
                  <div>
                    <p>1st Floor, ramaswami complex,<br/>
                      Cherooty Rd, behind Basics,<br/>
                      Vellayil, Kozhikode, Kerala,<br/>
                      India - 673032</p>
                  </div>
                </div>
                {/* form */}
                <form className='flex flex-col gap-8 w-full'>
                    <div className='w-full'>
                        <input className='py-2 bg-transparent w-full outline-none border-b border-black' type="text" placeholder='Your Name' />
                    </div>
                    <div className='w-full'>
                        <input className='py-2 bg-transparent w-full outline-none border-b border-black' type="text" placeholder='Your Number' />
                    </div>
                    <div className='w-full'>
                        <input className='py-2 bg-transparent w-full outline-none border-b border-black' type="text" placeholder='Your Email' />
                    </div>
                    <div className='w-full'>
                        <textarea rows={3} className='py-2 bg-transparent w-full outline-none border-b border-black' type="text" placeholder='Message' />
                    </div>
                    <div>
                    <button class="contact-form-submit text-center" name="send" value="Submit" type="submit">Submit</button>
                    </div>
                </form>
             </div>
        </div>
    </main>
  )
}

export default Contact
import React from 'react'

const PaymentPage = () => {
  return (
    <div className='flex justify-center items-center my-52 mx-52 text-3xl flex-col'>
        <a className='mb-9 flex justify-center text-blue-800 hover:underline' href="https://mail.google.com/mail/?view=cm&fs=1&to=desaikalpesh2003@gmail.com&su=Project%20Inquiry&body=Hi%20Kalpesh,%0D%0A%0D%0AI'm%20reaching%20out%20regarding%20your%20project.%0D%0A%0D%0AThanks!" target="_blank">Click here to send an email.</a>
        <div>
        
        <h1>
        I've removed the payment gateway to avoid unnecessary transactions and keep the project educational, with AI-generated art for learning. For questions, see my resume for contact details.
            <br/>

        </h1>
        <h1 className='mt-9 border border-black p-5'>
        Thank you for your understanding.
        
        </h1>
        </div>
    </div>
  )
}

export default PaymentPage
import { useEffect, useState } from "react";

const Chat = () => {

    return (
        <div>
            <div>
                <section className='flex justify-between mx-10 mt-3'>
                <p className='text-xl text-center'>Unknown Alien</p>
                <button className='bg-green-500 text-white rounded-full px-6 py-1'>Call</button>
                </section>

                <section className='flex flex-col text-right mt-5 mx-3'>

                    <div className='flex flex-row'>
                        <div
                        className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                        >
                        <p>You're now chatting <span className='font-bold'>Unknown Alien</span>. Say hello!</p>
                    </div>
                    </div>

                {/* Message */}
                <div key={i} className={`flex ${data.id === id ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div
                        className={`mt-1 bg-[#222222] text-white py-2 px-3 w-fit rounded-full`}
                        >
                        <p>{data.message}</p>
                    </div>
                </div>
                </section>

                <section className='w-screen mx-5 fixed bottom-0 mb-5'>
                    <input className='w-9/12 h-10 px-2 border border-[#222222] rounded-md' type="textarea"></input>
                    <button className='ml-3 bg-[#222222] text-white rounded-full px-5 py-1'>Send</button>
                </section>
            </div>
        </div>
    );
}

export default Chat;
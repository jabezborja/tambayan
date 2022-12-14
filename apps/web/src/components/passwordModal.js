import { useState } from "react";
import { useRouter } from "next/router";

const PasswordModal = ({ room, state }) => {

  const router = useRouter();

  const [ password, setPassword ] = useState("");

  const handleRoomEntry = (e) => {
    e.preventDefault();

    if (password === room.password) {
      state(false)
      return;
    }

    alert("Wrong password")
  }

  return (
      <div className="relative z-10">

        <div className="fixed inset-0 bg-[#020202] bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-5 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={handleRoomEntry}>
                <div className="bg-[#1a1a1a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 " id="modal-title">This Chat Room is private.</h3>
                      <div className="mt-2">
                        <p className="text-sm text-[#d4d4d4]">You need to ask the host for password. If you have it, please enter it below:</p>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="1234-4567" className='mt-5 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md'></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium  shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Join</button>
                  <button onClick={() => router.back()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-[#2a2a2a] px-4 py-2 text-base font-medium  shadow-sm hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Return</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PasswordModal;
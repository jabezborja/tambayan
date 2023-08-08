import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const CreateBot = () => {

    const router = useRouter();

    const [ loading, setLoading ] = useState(false);

    const [ displayName, setDisplayName ] = useState('');
    const [ interactionEndpointURL, setinteractionEndpointURL ] = useState('');
    const [ botCommand, setBotCommand ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ botPhotoURL, setBotPhotoURL ] = useState('');

    const user = useSelector(state => state.user.user);

    const handleCreateRoom = async e => {

        e.preventDefault();

        setLoading(true);

        const validURL = new RegExp(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g);
        const validCommand = new RegExp(/\//);

        if (!validURL.test(interactionEndpointURL)) {
            alert("Your Interaction Endpoint URL is not valid.");

            return;
        }

        if (validCommand.test(botCommand)) {
            alert("You don't need to add slash (/) to your bot command, it is automatic.")
        }

        const res = await fetch('/api/rooms/createBot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                displayName: displayName,
                email: email,
                photoURL: botPhotoURL,
                interactionEndpointURL: interactionEndpointURL,
                botCommand: botCommand,
                creatorId: user.uid
            })
        });

        const data = await res.json();

        if (data.success) {
            return
        }
    }

    return (
        <div>
            <form onSubmit={handleCreateRoom}>
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-[#1a1a1a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center">

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg font-medium leading-6 " id="modal-title">Create new tambayan bot.</h3>
                                
                                <div className="mt-2">
                                    <p className="text-sm text-[#d4d4d4]">
                                        There are few things to have before setting up your bot:
                                        <br />
                                        <br />
                                        - An API Endpoint or the Interaction Endpoint URL
                                        <br />
                                        To enable your bot to receive slash command requests, Tambayan needs a public URL to send them.
                                        <br />
                                        <br />
                                        - Bot name & command
                                        <br />
                                        - Wag ka magpapalipas ng gutom
                                        <br />
                                        - Mag ingat ka palage
                                        <br />
                                        - I'll never Leave you no matter what happens, I'll be your best friend until your last breath.
                                    </p>

                                    <div className="mt-7">
                                        <div className='mt-3 '>
                                            <label htmlFor="displayName">Bot Display Name</label><br />
                                            <input required name="displayName" placeholder="Rodulfo" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className='mt-1 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md' type="textarea"></input>
                                        </div>
                                        <div className='mt-3 '>
                                            <label htmlFor="interactionEndpointURL">Bot Interaction Endpoint URL</label>
                                            <br />
                                            <input required name="interactionEndpointURL" placeholder="https://ang-bot-ko.com/interactions" value={interactionEndpointURL} onChange={(e) => setinteractionEndpointURL(e.target.value)} className='mt-1 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md' type="textarea"></input>
                                        </div>
                                        <div className='mt-3 '>
                                            <label htmlFor="botCommand">Bot Slash Command</label>
                                            <br />
                                            <input required name="botCommand" placeholder="/rodulfo (no need to add slash)" value={botCommand} onChange={(e) => setBotCommand(e.target.value)} className='mt-1 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md' type="textarea"></input>
                                        </div>
                                        <div className='mt-3 '>
                                            <label htmlFor="email">Your Email</label>
                                            <br />
                                            <input required name="email" placeholder="juandelacruz@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md' type="textarea"></input>
                                        </div>
                                        <div className='mt-3 '> 
                                            <label htmlFor="photoURL">Bot PhotoURL</label>
                                            <br />
                                            <input required name="photoURL" placeholder="https://ang-bot-ko.com/selfie_ni_idol" value={botPhotoURL} onChange={(e) => setBotPhotoURL (e.target.value)} className='mt-1 bg-[#2a2a2a]  focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 h-10 px-2 rounded-md' type="textarea"></input>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className="w-6/12 text-center italic">
                        <p>A lovely note by the Developer: Not ready to commit for a server yet? We all sometimes do.
                        Push your Tambayan Bot code to <code>apps/web/src/pages/api/bots/tambayan/sinigang/</code> and submit a PR to get a free Bot hosting, just copy the Rodulfo.js template 😃</p>
                        <p className="mt-2 text-sm">Note: Limited to 5 bot slots only.</p>
                    </div>

                    <div className="my-5 bg-[#1a1a1a] px-4 py-3 sm:flex sm:px-6">
                        {!loading
                            ? <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium  shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Create</button>
                            : <div role="status" className="px-4">
                                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        <button onClick={() => router.back()} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-[#2a2a2a] px-4 py-2 text-base font-medium  shadow-sm hover:bg-[#383838] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Exit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateBot;
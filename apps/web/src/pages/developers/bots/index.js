import Link from 'next/link';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getDocumentsByProperty } from '../../../firebase/database';

const Bots = () => {

    const [ bots, setBots ] = useState([]);

    const [ botView, setBotView ] = useState(false);
    const [ currentBot, setCurrentBot ] = useState(null);

    const user = useSelector(state => state.user.user);
    
    useEffect(() => {
        const getBots = async () => {
            const botsData = await getDocumentsByProperty("bots", {
                by: "creatorId",
                prop: user.uid
            });

            setBots(botsData);
        };

        getBots();
    }, []);

    const handleBotView = async (id) => {

        const bot = await getDocumentsByProperty("bots", {
            by: "uid",
            prop: id
        });
        
        setCurrentBot(bot[0])
        setBotView(true);
    }

    if (botView) return <BotView bot={currentBot} />;

    return (
        <div>
            <p className="text-5xl font-bold text-center mt-10">Your Bots</p>

            <div className="mt-5 flex flex-col justify-center items-center">
                { bots.map((item, i) => (
                    <div key={i} onClick={() => handleBotView(item.uid)} className="mt-5 w-10/12 items-center bg-[#222] rounded-sm hover:cursor-pointer" href="developers/bots">
                        <p className="p-5 font-bold">{item.displayName}</p>
                    </div>
                )) }

                <Link className="mt-5 w-10/12 items-center text-center bg-[#ff6464] rounded-sm" href="/developers/bots/create">
                    <p className="p-3">Create A Bot</p>
                </Link>
            </div>
        </div>
    );
}

const BotView = ({ bot }) => {
    return (
        <div className='m-10'>
            <p className='text-3xl font-bold'>Your Tambayan Chat Bot</p>

            <p>Bring your Tambayan Chatroom to life with a Bot user.</p>

            <div>
                <div className='mt-5 flex items-center space-x-4'>
                    <label className='w-1/12' htmlFor="displayname">Display Name</label>
                    <input id="displayname" defaultValue={bot.displayName} className='bg-[#2a2a2a] resize-none overflow-hidden focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 p-3'></input>
                </div>

                <div className='mt-5 flex items-center space-x-4'>
                    <label className='w-1/12' htmlFor="displayname">Access Key</label>
                    <p id="displayname" className='bg-[#2a2a2a] resize-none overflow-hidden focus:border-0 focus:ring-0 focus:outline-0 w-9/12 md:w-11/12 p-3'>{bot.accessKey}</p>
                </div>

                <div className="mt-5 w-full items-center text-center bg-[#ff6464] rounded-sm" href="/developers/bots/create">
                    <p className="p-3">Done</p>
                </div>
            </div>

            

        </div>
    );
}

export default Bots;
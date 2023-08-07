import Link from 'next/link';
import { useSelector } from "react-redux";
import { getDeveloperBotsByUserId } from '../../../firebase/developers';
import { useEffect, useState } from 'react';

const Bots = () => {

    const [ bots, setBots ] = useState([]);

    const user = useSelector(state => state.user.user);
    
    useEffect(() => {
        const getBots = async () => {
            const botsData = await getDeveloperBotsByUserId(user.uid);

            setBots(botsData);
        };

        getBots();
    }, [])

    return (
        <div>
            <p className="text-5xl font-bold text-center mt-10">Your Bots</p>

            <div className="mt-5 flex flex-col justify-center items-center">
                { bots.map((item, i) => (
                    <Link key={i} className="mt-5 w-10/12 items-center bg-[#222] rounded-sm" href="developers/bots">
                        <p className="p-5 font-bold">{item.displayName}</p>
                    </Link>
                )) }

                    <Link className="mt-5 w-10/12 items-center text-center bg-[#ff6464] rounded-sm" href="/developers/bots/create">
                        <p className="p-3">Create A Bot</p>
                    </Link>
            </div>
        </div>
    );
}

export default Bots;
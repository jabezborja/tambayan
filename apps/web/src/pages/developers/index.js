import Link from 'next/link';

const Developers = () => {
    return (
        <div>
            <p className="text-4xl font-bold mt-10 text-center">Welcome to Tambayan Developers Portal</p>

            <div className="mt-8 flex flex-col justify-center items-center">
                <Link className="w-10/12 items-center text-center bg-[#222] rounded-sm" href="developers/bots">
                    <p className="py-5 font-bold">Tambayan Bots 🤖</p>
                </Link>
            </div>
        </div>
    );
}

export default Developers;
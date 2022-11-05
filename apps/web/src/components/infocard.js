
const InfoCard = () => {
    return (
        <div className="mt-5 px-5 md:px-10 h-fit bg-gradient-to-r from-[#DC2424] to-[#4A569D] rounded-md">
            <div className="py-5">
                <p className="text-xl font-bold">Welcome to Tambayan! ✨</p>
                <p className="mt-3 md:mt-1">This app was built by{' '}
                    <span className="font-bold group text-[#8bb9ff] transition-all duration-300 ease-in-out">
                        <a href="https://jabeztorre.ga">
                            <span className="bg-left-bottom bg-gradient-to-r from-[#8bb9ff] to-[#2a7fff] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                Jabez Torre{' '}
                                <span className="inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </span>
                            </span>
                        </a>
                    </span>{' '}
                    using Next.js, React, and Firebase and it's quite inspired by <b>Discord</b> and <b>Clubhouse</b>.
                </p>
                <p className="mt-4 md:mt-2">Go to a tambayan room, talk to people, have fun with user-generated bots, and much more!</p>
            </div>
        </div>
    );
}

export default InfoCard;
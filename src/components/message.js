import timeDate, { completeDate } from "../utils/timeDate";

const Message = ({ data, user }) => {

    const dateSent = timeDate(data.dateSent.seconds);

    return (
        <div className={`flex ${data.user.uid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex flex-col ${data.user.uid === user.uid ? 'items-end' : 'items-start'} mt-3`}>
                <div
                    className={`mt-1 flex flex-col ${data.user.uid === user.uid ? 'items-end' : 'items-start'} bg-[#4d4d4d] text-white py-2 px-3 w-fit rounded-md`}
                >   
                    <div className={`flex ${data.user.uid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}>
                        <img className="h-10 w-10 rounded-full" src={data.user.photoURL}></img>
                        <div className={`flex flex-col ${data.user.uid === user.uid ? 'items-end mr-2' : 'items-start ml-2'}`}>
                            <p className='text-white font-bold text-md'>{data.user.displayName}</p>
                            <p className='text-[0.7rem] hover:cursor-default' title={completeDate(data.dateSent.seconds)}>{dateSent}</p>
                        </div>
                    </div>
                    <p className='mt-2 text-start text-md' dangerouslySetInnerHTML={{ __html: data.message.split(/\n\r?/g).join("<br />") }}></p>
                </div>
            </div>
        </div>
    );
}

export default Message;
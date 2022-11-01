
const Message = ({ data, user }) => {

    return (
        <div className={`flex ${data.senderUid === user.uid ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex flex-col ${data.senderUid === user.uid ? 'items-end' : 'items-start'} mt-3`}>
                <p className='text-white text-sm'>{data.userName}</p>
                <div
                    className={`mt-1 bg-[#4d4d4d] text-white py-2 px-3 w-fit rounded-md`}
                >   
                    <p className='text-start text-md' dangerouslySetInnerHTML={{ __html: data.message.split(/\n\r?/g).join("<br />") }}></p>
                    <p className='text-[0.8rem]'>Nov, 2022</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
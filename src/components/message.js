import timeDate, { completeDate } from "../utils/timeDate";
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useState } from "react";

const Message = (props) => {

    const data = props.data;

    const { selectedMessageIndex, setSelectedMessageIndex } = props.selectedMessageIndex;
    const { replyingTo, setReplyingTo } = props.replyingTo;

    const isOwnChat = data.user.uid === props.user.uid;

    const dateSent = timeDate(data.dateSent.seconds);

    const [ showDropdown, setShowDropdown ] = useState(false);

    const handleDelete = async e => {
        await fetch('/api/messages/deleteMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                roomId: props.roomId,
                messageId: data.messageId
            })
        });
    }

    const handleReply = e => {
        setReplyingTo(props.index);

        props.textInput.current.focus();
    }

    const handleMessageHighlight = e => {
        if (selectedMessageIndex === props.index) return setSelectedMessageIndex(-1);

        setSelectedMessageIndex(props.index);
    }

    const sanitizeMessage = (message) => {
        return DOMPurify.sanitize(marked.parse(message))
    }

    return (
        <div>
            <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'} items-center mt-3`}>
                    <div
                        onClick={handleMessageHighlight}
                        className={`mt-1 max-w-screen-md flex flex-col ${isOwnChat ? 'items-end' : 'items-start'} ${selectedMessageIndex !== props.index ? 'bg-[#4d4d4d]' : 'bg-[#333333]'} text-white py-2 px-3 w-fit rounded-md`}
                    >   
                        {data.repliedTo 
                            && <div className={`mb-3 mt-1 w-full flex flex-col bg-[#3a3a3a] text-white py-2 px-3 rounded-md`}>
                                <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <img className="h-10 w-10 rounded-full" src={data.repliedTo.user.photoURL}></img>
                                    <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                                        <div className={`flex flex-col ${isOwnChat ? 'items-end mr-2' : 'items-start ml-2'}`}>
                                            <p className='text-white font-bold text-md'>{data.repliedTo.user.displayName}</p>
                                            <p className='text-[0.7rem] hover:cursor-default' title={completeDate(data.repliedTo.user.seconds)}>{dateSent}</p>
                                        </div>
                                    </div>
                                </div>
                                {!data.message.includes('img') 
                                    ? <p className={`mt-2 ${isOwnChat ? 'text-end' : 'text-start'} text-md`} dangerouslySetInnerHTML={{ __html: sanitizeMessage(data.repliedTo.message) }} ></p>
                                    : <p>Attachment</p>
                                }
                            </div>
                        }
                        <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'}`}>
                            <img className="h-10 w-10 rounded-full" src={data.user.photoURL}></img>
                            <div className={`flex ${isOwnChat ? 'flex-row-reverse' : 'flex-row'} items-center`}>
                                <div className={`flex flex-col ${isOwnChat ? 'items-end mr-2' : 'items-start ml-2'}`}>
                                    <p className='text-white font-bold text-md'>{data.user.displayName}</p>
                                    <p className='text-[0.7rem] hover:cursor-default' title={completeDate(data.dateSent.seconds)}>{dateSent}</p>
                                </div>

                                {/* User Badges */}
                                <div className={`flex items-center space-x-1 ${isOwnChat ? 'mr-2' : 'ml-2'}`}>
                                    {data.user.moderator
                                        ? <div title="Tambayan Moderator">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        : ''
                                    }

                                    {data.user.verified
                                        ? <div title="Verified">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        : ''
                                    }

                                    {data.user.isBot
                                        ? <div title="Bot">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        : ''
                                    }

                                </div>              
                            </div>
                        </div>
                        <p className='mt-2 text-start text-md' dangerouslySetInnerHTML={{ __html: sanitizeMessage(data.message) }} ></p>
                    </div>

                    {selectedMessageIndex === props.index
                        && <div className="flex flex-col items-center">
                            <button title="Menu" onClick={() => setShowDropdown(v => !v)} className={`${isOwnChat ? 'mr-2' : 'ml-2'} flex flex-col ${isOwnChat ? 'items-end' : 'items-start'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                {showDropdown
                                    && <div class="z-10 w-44 bg-[#555555] text-white rounded">
                                        <ul class="text-sm hover:bg-[#444444]" aria-labelledby="dropdownDefault">
                                            {isOwnChat
                                                ? <li onClick={handleDelete}>
                                                    <a href="#" class="block py-2 px-4">Delete</a>
                                                </li>
                                                : <li>
                                                    <a href="#" class="block py-2 px-4">Report</a>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                                }
                            </button>
                            <button title="Reply" onClick={handleReply} className={`${isOwnChat ? 'mr-2' : 'ml-2'} flex flex-col ${isOwnChat ? 'items-end' : 'items-start'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>    
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Message;
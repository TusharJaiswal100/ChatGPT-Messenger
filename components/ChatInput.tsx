'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {  addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props={ // typescript
    chatId: string;
}

function ChatInput({chatId}: Props) {
    const [prompt, setPrompt] = useState("");
    const {data: session} = useSession();
    
    const { data: model } = useSWR("model", {
        fallbackData: "text-davinci-003",
    })

    // in below line FormEvent<HTMLFormElement> is used because when user types something then we dont know what type he has written , then due to this line it automatically understands its types we dont have to write anything for type
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!prompt) return; // if their is not prompt the return
        const input = prompt.trim(); // if their is any input
        setPrompt("");

        const message: Message = { // here, Message is custom type defintion created in typing.d.ts
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!, // user email
                name: session?.user?.name!, // user name
                avatar: session?.user?.image! ||     // image of the user
                `https://ui-avatars.com/api/?name=${session?.user?.name}`, // if their is no image of user then assign it image like A, BD, etc
            }
        }
        // till above this step we got the message

        // now from below line put the message in database
       await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), // first argument of addDoc // here we are adding to the firebase from client
       message // second argument of addDoc
       );

       // Toast notification to say Loading!
       const notification = toast.loading('ChatGPT is Thinking...'); // shows the notification chatgpt thinking 

       // fetch method is created to communicate with our own api
       await fetch('/api/askQuestion', { // our own api // creating api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: input, 
            chatId, 
            model, 
            session   // these prompt are send to the backend
        }),
       }).then(() => {
        // Toast notification to say successful!
        // when api get successfully executed then show sucessful notification
        toast.success('ChatGPT has responed!', {
            id: notification,
        })
       });
    };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <input 
            className="bg-transparent focus:outline-none flex-1
            disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // when user types it will update the state
            type="text" 
            placeholder="Type your message here..."
            />
            {/* disabled in below line means that when user has not clicked on typing area then the submit button should not work and when he type something then submit button will work*/}
            <button disabled={!prompt || !session} // if their is no prompt or session then button should not submit anything
            type="submit" 
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold
            px-4 py-2 rounded disabled:bg-gray-300 
            disabled:cursor-not-allowed">  
               <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/> 
            </button>
        </form>
        <div className="md:hidden"> {/* when screen width become smaller then it will show model select box at bottom of the page instead of left side bar */}
                <ModelSelection/>
            </div>
    </div>
  )
}

export default ChatInput
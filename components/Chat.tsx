"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props={
    chatId: string;
}

function Chat({chatId}: Props) {
    const { data: session } = useSession();

    const [messages] = useCollection(session && query(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), // first argument
        orderBy("createdAt", "asc") // second argument
    ))

    return ( 
    <div className="flex-1 overflow-y-auto overflow-x-hidden">

    {messages?.empty && ( // if their is no message means user has created new chat then he will see a line written  Type in a prompt below to get started!  with a symbol line 33 to line 35
        <>
        <p className="mt-10 text-center text-white">
            Type in a prompt below to get started! 
        </p>
        <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5
        text-white animate-bounce"/>
        </>
    )}

        {messages?.docs.map((message) => ( // mapping through each messages
            <Message key={message.id} message={message.data()}/>
        ))}
    </div>
    );
}

export default Chat;
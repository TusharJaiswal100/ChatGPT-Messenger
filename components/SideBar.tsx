'use client'

import {  collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection( // making connection to firebase
    session && 
      query(
        collection(db, 'users', session.user?.email!, 
        "chats"), // this lines mean session should be there and way in which data is stored in firebase
        orderBy("createdAt", "asc") // by this line most recent chat at left side in sidebar will come first
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                {/* NewChat */}
                <NewChat/>
                <div className="hidden sm:inline">    {/* ModelSelection */}
                <ModelSelection />
                </div>
                <div className="flex flex-col space-y-2 my-2">
                  {loading && (   // if chat is loading then show Loading Chat...
                    <div className="animate-pulse text-center text-white">
                      <p>Loading Chats...</p>
                    </div>
                  )}
                 {/* Map through the Chatrows */}
                  {chats?.docs.map(chat =>(
                 <ChatRow key={chat.id} id={chat.id}/> // chat row means the chats which are present in left side of the chatgpt
                ))}
                </div>
            </div>
        </div>
        {session && (
        <img  // for profile photo
        onClick={() => signOut()} // log out
        src={session.user?.image!} alt=""
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
        hover: opacity-50"
        />
        )}
    </div>
  )
}

export default SideBar
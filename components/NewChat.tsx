'use client'

import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { db } from "../firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();


  const createNewChat = async() => {
    const doc = await addDoc( // this is the way in which information will be stored in firebase database
      collection(db, "users", session?.user?.email!, "chats"),
      {
        //messages: [], // message will be stored
        userId: session?.user?.email!, // userId will be stored
        createdAt: serverTimestamp() // time will be stored
      }
    );
    router.push(`/chat/${doc.id}`) // redirect the user to chat screen // when a user click on new chat then user should be directed to the new chat
  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
        <PlusIcon className="h-4 w-4 "/>
        <p>New Chat</p>
    </div>
  )
}

export default NewChat
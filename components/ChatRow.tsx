import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = { // typescript
    id: string;
}

function ChatRow({id}: Props) {
   const pathname = usePathname();
   const router = useRouter();
   const {data: session} = useSession();
   const [active, setActive] = useState(false);

   // if chat timing is active then i also need messages
   const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'), 
    );

    useEffect(() => {
        if(!pathname) return; // if pathname is not their
        
        setActive(pathname.includes(id)); // if pathname includes id
    }, [pathname]);

    const removeChat = async() => { // this fucntion is to delete that chat  // this function is called below in <TrashIcon>
        await deleteDoc(doc(db, 'users', session?.user?.email!,'chats', id)) // delete doc is inbuilt function of firebase for deleting a document
        router.replace("/"); // when chat is deleted the user should be directed to home page
    }

  return ( // <Link> this allows us to iterate through URL easily
    <Link 
    href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>  {/* when user click on chatrow then it will change the color to gray and we are knowing this that user has clicked on the chatrow by passing here active, means if active has id then user is at taht particular chat row */}
    <ChatBubbleLeftIcon className="h-5 w-5"/>  
    <p className="flex-1 hidden md:inline-flex truncate">
     {messages?.docs[messages?.docs.length-1]?.data().text || "New Chat"} 
     </p>
    <TrashIcon 
    onClick={removeChat} // when user click delete image then onclick will call remove chat function and chat will get deleted
    className="h-5 w-5 text-gray-700 hover:text-red-700"/>
    </Link>
  )
}
// line 38 means if their is already ongoing chat then it will show that old chat else it will show new chat
export default ChatRow
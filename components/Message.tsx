import { DocumentData } from "firebase/firestore"

type Props = { //typescript
    message: DocumentData
};

function Message({message}: Props) {
  const isChatGPT = message.user.name === "ChatGPT"; // to check if it is user or chatgpt

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}> {/* {isChatGPT && "bg-[#434654]"} this line means the area at which chatgpt written the answer make it color to #434654 color */}
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
            <img src={message.user.avatar} alt="" className="h-8 w-8"/> {/* this line shows the profile photo of user , if user is human it will show their photo and if chatgpt is replyinh then it will show photo of chatgpt */}
            <p className="pt-1 text-sm">
                {message.text} {/* this line show the question asked by user and answer replied by chatgpt */}
            </p>
        </div>
    </div>
  );
}

export default Message;
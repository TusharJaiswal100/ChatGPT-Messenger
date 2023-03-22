// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';
import { collection } from 'firebase/firestore';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, session } = req.body; // taking out all these prompts from backend

      // if prompt is not passed it return 400 status which means error and it diplays please provide prompt
    if(!prompt){
        res.status(400).json({ answer: "Please provide a prompt!" });
        return;
    }

    if(!chatId){
        res.status(400).json({ answer: "Please provide a valid chat ID!" });
        return;
    }

// ChatGPT Query
   const response = await query (prompt, chatId, model)

   const message: Message = { // keep a consistent with previous message
    text: response || "ChatGPT is unable to find an answer for that!", // if text if available then return the response else return the line chatgpt not find
    createdAt: admin.firestore.Timestamp.now(),
    user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "https://links.papareact.com/89k",
    },
   };

    await adminDb // adding to database
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text }); // this line will send back the answer to the user
}

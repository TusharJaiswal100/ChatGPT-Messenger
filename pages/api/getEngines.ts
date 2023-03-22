// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/chatgpt";

type Option = { 
    value: string;
    label: string;
};

type Data = {
    modelOptions: Option[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const models = await openai.listModels().then((res) => res.data.data); // making call to openai and saying list all models and then passing data from it , 

    const modelOptions = models.map((model) => ({ // extracting tha data the gets returned
        value: model.id,
        label: model.id,
    }));

    res.status(200).json({ 
        modelOptions,
    });
}

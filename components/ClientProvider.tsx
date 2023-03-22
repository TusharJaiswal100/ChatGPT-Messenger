'use client'; 

import { Toaster } from "react-hot-toast";

export default function ClientProvider(){
    return (
        <>
        <Toaster position="top-right"/> {/* Toaster is used to show notification in stylish way */}
        </>
    )
}
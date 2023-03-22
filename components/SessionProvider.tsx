'use client'
import { Session } from "next-auth";
import{ SessionProvider as Provider } from "next-auth/react";

type Props = {
    children: React.ReactNode;
    session: Session | null;
}

export function SessionProvider({children, session}: Props){ // same as regular component
    return (
        <Provider>
            {children}
        </Provider>
    );
}
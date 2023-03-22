import { SessionProvider } from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions)
  
  return (
    <html>
      <head/>
      <body>
        <SessionProvider session={session}>
          {!session ? ( // if session is not loged in  , go to login page
            <Login/>
          ): ( // else part // if session is logged in, exexute below lines
        <div className="flex">
          {/* Sidebar */}
          <div className="bg-[#202123] max-w-xs h-screen
           overflow-y-auto md:min-w-[20rem]">
          <SideBar/> 
          </div>
          {/* ClientProvider - Notificattion -> Chatgpt is Thinking */}
          <ClientProvider/> {/* we use this parent to push anything that needs client at the top level */}

          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
        )}
        </SessionProvider>  
      </body>
    </html>
  );
}
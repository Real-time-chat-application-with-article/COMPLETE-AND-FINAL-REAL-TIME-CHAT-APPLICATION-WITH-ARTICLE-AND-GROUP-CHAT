import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import Forgotpassword from "../pages/Forgotpassword";
import Articles from "../pages/Articles";
import ChatFeed from "../components/ChatFeed";
import {ChatEngine} from "react-chat-engine"
import AddArticles from "../pages/AddArticle";
import EditArticles from "../pages/EditArticle";
import PostBody from "../pages/PostBody";
import FulPost from "../pages/FulPost";

const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element : <AuthLayouts><RegisterPage/></AuthLayouts>
        },
        {
            path : 'email',
            element : <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path : 'password',
            element : <AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path : 'articles',
            element : <Articles/>
        },
        {
            path : 'add-article',
            element : <AddArticles/>,
            children : [
                {
                    path : ':postId',
                    element : <FulPost/>
                }
            ]
        },
        {
            path : 'edit-article/:id',
            element : <EditArticles/>
        },
        {
            path : 'forgot-password',
            element : <AuthLayouts><Forgotpassword/></AuthLayouts>
        },
        {  
                 path: "postbody",
                 element: <PostBody/>
        },
        {
            path: "groupchat",
            element: 
            <div className="chatEngine" style={{ background: 'red !important' }}>
            <ChatEngine
             height="100vh"
             background-color="red"
             className="chatEngine"
             projectID="f7e406de-4bb4-42e2-91f2-9698eff1d9b0"
             userName="makirow"
             userSecret="Makiapassword123."
             renderChatFeed={(chatApp) => <ChatFeed {...chatApp} />}
             />
           </div>
        },       
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router
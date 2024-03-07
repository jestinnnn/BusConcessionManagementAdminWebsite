import { createBrowserRouter } from "react-router-dom";
import Request from "../Pages/Transport/Request";
import Transport from "../App/Transport";
import Approved from "../Pages/Transport/Approved";
import Home from "../Pages/Transport/Home";
import Form from "../Component/Transport/Form";
import Institute from "../App/Institute";
import InstHome from "../Pages/Institute/InstHome";
import InstRequest from "../Pages/Institute/InstRequest";
import InstApproved from "../Pages/Institute/InstApproved";
import InstReject from "../Pages/Institute/InstReject";
import Compliant from "../Pages/Transport/Compliant";
import Login from "../Pages/Login";
import InstituteProtect from "../Secure/InstituteProtect";
import TransportProtect from "../Secure/TransportProtect";

const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login/>
  },
  {
    path: "/transport",
    element: <TransportProtect/>,
    children: [
      {
        path:"",
        element:<Transport/>,
        children:[
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "request",
            element: <Request />,
          },
          {
            path: "approved",
            element: <Approved/>,
          },{
            path:"compliants",
            element:<Compliant/>
          }
        ],
      }
    ]
  },
  {
    path:'/institute',
    element:<InstituteProtect/>,
    children:[
      {
        path:"",
        element:<Institute/>,
        children:[
          {
            path:'home',
            element:<InstHome/>
          },
          {
            path:'request',
            element:<InstRequest/>
          },
          {
            path:'approved',
            element:<InstApproved/>
          },
          {
            path:'rejected',
            element:<InstReject/>
          }
        ]
      }
      
    ]
  }
]);

export default router;

import { createBrowserRouter, redirect } from "react-router-dom";
import Request from "../Pages/Transport/Request";
import Transport from "../App/Transport";
import Approved from "../Pages/Transport/Approved";
import Institute from "../App/Institute";
import InstRequest from "../Pages/Institute/InstRequest";
import InstApproved from "../Pages/Institute/InstApproved";
import InstReject from "../Pages/Institute/InstReject";
import Compliant from "../Pages/Transport/Compliant";
import Login from "../Pages/Login";
import InstituteProtect from "../Secure/InstituteProtect";
import TransportProtect from "../Secure/TransportProtect";
import Navigate from "../Component/Navigate";
import Payments from "../Pages/Transport/Payments";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Navigate/>
  },
  {
    path:'login',
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
            path: "request",
            element: <Request />,
          },
          {
            path: "approved",
            element: <Approved/>,
          },{
            path:"compliants",
            element:<Compliant/>
          },{
            path:'payments',
            element:<Payments/>
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

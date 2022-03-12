import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/Home"
import PageNotFound from "./pages/404";
import Orders from "./pages/Orders";
import Trade from "./pages/Trade";
import Transfer from "./pages/Transfer";
export default function Router(){
    return(
        <Routes>
            <Route path="/" >
                <Route index element={ <Home /> } />
                <Route path="home" element={<Home />} />
            </Route>
            <Route path="/trade" >
                <Route index element={<Trade />} />
            </Route>
            <Route path="/orders" >
                <Route index  element={<Orders />} />
            </Route>
            <Route path="/transfers" >
                <Route index  element={<Transfer />} />
            </Route>

            <Route path="*" element={ <PageNotFound />} />
        </Routes>
    )
}
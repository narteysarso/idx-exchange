import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/Home"
import PageNotFound from "./pages/404";
import History from "./pages/History";
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
            <Route path="/history" >
                <Route index  element={<History />} />
            </Route>
            <Route path="/transfers" >
                <Route index  element={<Transfer />} />
            </Route>

            <Route path="*" element={ <PageNotFound />} />
        </Routes>
    )
}
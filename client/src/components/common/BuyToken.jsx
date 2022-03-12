import { Button } from "antd";
import { Link } from "react-router-dom";

export default function BuyToken({size = "large", shape="default"}){
    return (
        <Link to={"/trade"}>

        <Button size={size} shape={shape} type="primary">
             Buy Token
        </Button>
        </Link>
    )
}
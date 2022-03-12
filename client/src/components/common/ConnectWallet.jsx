import { Button } from "antd";

export default function ConnectWallet({size = "large", shape="default"}){
    return (
        <Button size={size} shape={shape} type="primary"> Connect Wallet</Button>
    )
}
import { Col, Row, Tag, Typography } from "antd";
import { useIDXContext } from "../../hooks/useIDX";
import BuyToken from "../common/BuyToken";
import ConnectWallet from "../common/ConnectWallet";

export default function Home() {
    const {wallet} = useIDXContext()
    return (
        <Row justify="center" style={{ textAlign: 'center' }}>
            <Col xs={24}>
                <Row justify="center" style={{padding: "5vw 12vw" }}>
                    <Col xs={24} md={18} >
                    <Tag color={"red"}>This program runs on the Rinkeby Test Newtork!!!</Tag>
                        <Typography.Title level={1} style={{fontSize: '4rem'}}>Trade IDX token and Ethereum. No Registration. No Hassle</Typography.Title>
                    </Col>
                    <Col xs={24} md={18} >
                        <Typography.Title level={3}>Innovation at the frontier of DeFi and pushing boundaries for the betterment of the community. Provide a one-stop for DeFi experience for everyone</Typography.Title>
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                <Typography.Title level={1}>
                    Start Trading Now
                </Typography.Title>
                {!wallet ? <ConnectWallet />  : <BuyToken />}
            </Col>

            <Col xs={24}>
            </Col>
        </Row>
    )
}
import { Button, Card, Col, Dropdown, Menu, Row, Tag, Tooltip, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useIDXContext } from "../hooks/useIDX";


const NotYetSupported = ({ title, color, ...props }) => {
    return (
        <Tooltip title={title || "Coming Soon"} >
            {props.children} 
            <ExclamationCircleOutlined style={{color: color || 'gold'}}/>
        </Tooltip>
    )
}

const PurchaseOptions = () => {
    
    return (
        <Card title="Pay with" style={{ padding: '1vw' }}>

            <Menu>
                <Menu.Item key={0}>
                    Ethereum
                </Menu.Item>
                <Menu.Item key={1}>
                    <NotYetSupported>
                        Credit/Debit Card 
                    </NotYetSupported>
                </Menu.Item>
                <Menu.Item key={2}>
                    <NotYetSupported >
                        Cash Balance
                    </NotYetSupported>
                </Menu.Item>
            </Menu>
        </Card>
    )
}
export function Navbar() {
    const {pathname} = useLocation();
    const {wallet}= useIDXContext();
    return (
        <>
            <div className="logo" />
            <Row>
                <Col xs={0} sm={4}>
                    <Dropdown overlay={PurchaseOptions}>
                        <Button>Buy IDX Tokens</Button>
                    </Dropdown>
                </Col>
                <Col span={16}>
                    <Row justify="center">
                        <Menu theme="dark" selectedKeys={[pathname]} mode="horizontal" style={{minWidth: "100%", textAlign: "center"}}>
                            <Menu.Item key="/home">
                                <Link to="/home">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="/history">
                                <Link to="/history">History</Link>
                            </Menu.Item>
                            <Menu.Item key="/trade">
                                <Link to="/trade">Trade</Link>
                            </Menu.Item>
                            <Menu.Item key="/transfers">
                                <Link to="/transfers">Transfer</Link>
                            </Menu.Item>
                            
                        </Menu>
                    </Row>
                </Col>
                <Col  xs={3} md={4}>
                    {wallet ? <Tag style={{width: '100%'}}><Typography.Text ellipsis>{wallet}</Typography.Text></Tag> :  <Button type="dashed"> Connect Wallet</Button>}
                </Col>
            </Row>
        </>
    )
}

import { DollarCircleOutlined, GlobalOutlined, SafetyOutlined } from "@ant-design/icons";
import { Col, Row, Space, Tag, Typography } from "antd";

export default function MiniBanner({title, ...props}) {

    return (
        <Row>
            <Col span={24} style={{ padding: "5.5vh 4vw" }}>
            <Tag color={"red"}>This program runs on the Rinkeby Test Newtork!!!</Tag>
                <Typography.Title>{title}</Typography.Title>
                <Typography.Paragraph>
                    <Space size="large">
                        <Typography.Text>
                            <DollarCircleOutlined /> Zero fee
                        </Typography.Text>
                        <Typography.Text>
                            <GlobalOutlined /> No slippage
                        </Typography.Text>
                        <Typography.Text>
                            <SafetyOutlined /> Secured
                        </Typography.Text>
                    </Space>
                </Typography.Paragraph>
            </Col>
        </Row>
    )
}


MiniBanner.defaultProps = {
    title: `Convert & OTC Portal`
}
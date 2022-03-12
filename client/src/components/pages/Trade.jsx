
import { Button, Card, Col, Row} from "antd";
import MiniBanner from "../common/MiniBanner";
import TokenOrder from "../forms/TokenOrder";


export default function Trade() {
    return (
        <Row justify="center" align="center">
            <Col span={24} style={{ textAlign: "center" }}>
                <MiniBanner />
            </Col>
            <Col span={24}>
                <Card
                    title=""
                    extra={<Button type="primary">Orders</Button>}
                >
                    <Row justify="center">
                        <Col xs={24} sm={18} md={12}>
                            <TokenOrder />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}
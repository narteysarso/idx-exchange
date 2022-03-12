
import { Button, Card, Col, Row} from "antd";
import MiniBanner from "../common/MiniBanner";
import TransferOrder from "../forms/TransferOrder";


export default function Transfer() {
    return (
        <Row justify="center" align="center">
            <Col span={24} style={{ textAlign: "center" }}>
                <MiniBanner title="Transfer IDX Tokens" />
            </Col>
            <Col span={24}>
                <Card
                    title=""
                    extra={<Button type="primary">Orders</Button>}
                >
                    <Row justify="center">
                        <Col xs={24} sm={18} md={12}>
                            <TransferOrder />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}
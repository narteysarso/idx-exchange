import { Card, Col, Row, Typography } from "antd";
import OrderSearch from "../orders/OrderSearch";
import OrdersTable from "../orders/OrdersTable";
import { useHistory } from "../../hooks/useHistory";

export default function Orders() {

    const {data, setFilter} = useHistory();

    
    return (
        <Row justify="center">
            <Col xs={24} md={18} className="pt3">
                <span>Conversion History</span>
                <Typography.Title level={2}>
                    Order History
                </Typography.Title>
            </Col>
            <Col xs={24} md={18} className="p1">
                <Card
                    title={<OrderSearch setFilter={setFilter}/>}
                >
                    <OrdersTable datasource={data} />
                </Card>
            </Col>

        </Row>
    )
}
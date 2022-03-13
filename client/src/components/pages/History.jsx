import { Card, Col, Row, Tag, Typography } from "antd";
import HistorySearch from "../history/HistorySearch";
import HistoryTable from "../history/HistoryTable";
import { useHistory } from "../../hooks/useHistory";

export default function History() {

    const { data, setFilter } = useHistory();


    return (
        <Row justify="center">
            <Col xs={24} md={18} className="pt3">
                <span>Conversion History</span>
                <Typography.Title level={2}>
                    Order History
                </Typography.Title>
                <Tag color={"red"}>This program runs on the Rinkeby Test Newtork!!!</Tag>
            </Col>
            <Col xs={24} md={18} className="p1">
                <Card
                    title={<HistorySearch setFilter={setFilter} />}
                >
                    <HistoryTable datasource={data} />
                </Card>
            </Col>

        </Row>
    )
}
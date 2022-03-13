import { Button, Col, DatePicker, Form, Row, Select, Space } from "antd";

const {RangePicker} = DatePicker;

export default function HistorySearch({setFilter}){

    const handleSubmit = () => {

    }

    const handleChange = (_, allValues) => {
        setFilter(allValues);
    }

    return (
        <Row>
            <Col span={24}>
                <Form
                onFinish={handleSubmit}
                onValuesChange={handleChange}
                style={{minWidth: '100%'}}
                layout="inline"
                >
                    <Form.Item
                        label="Date"
                        name="date"
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                    >
                        <Select
                        placeholder="Please select"
                         style={{ minWidth: '100px' }}>
                            <Select.Option value="">All</Select.Option>
                            <Select.Option value="transfer">Transfer</Select.Option>
                            <Select.Option value="purchase">Purchase</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space size="large">
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button type="default" htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
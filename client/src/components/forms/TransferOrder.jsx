import { SwapOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Row, Typography } from "antd";
import { useEffect } from "react";
import { useIDXContext } from "../../hooks/useIDX";
import { useTransfer } from "../../hooks/useTransfer";
export default function TransferOrder() {

    const {wallet} = useIDXContext();
    const {formData, setFormData, balance, setAccount, setSubmit, submit} = useTransfer();

    useEffect(()=> {
        if(!wallet){
            return;
        }
        setAccount(wallet);
    }, [wallet]);

    const handleSubmit = (values) => {
        setSubmit(true)
    }

    const handleValuesChange = (_, allValues)=> {
        setFormData(prev => ({...prev, ...allValues}))
    }
    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}>

            <Row justify="end" style={{ textAlign: "center", width: '100%', padding: '0 5px 5px 5px' }}>
                
                <Typography.Text >
                    Available: {balance} IDX
                </Typography.Text>

            </Row>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                      required: true,
                      message: 'Please input amount in IDX tokens',
                    },
                  ]}
                  initialValue={formData.amount}
                >
                <InputNumber size="large" step={0.00000001}  min={0.00000001} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="To"
                name="to"
                rules={[
                    {
                      required: true,
                      message: 'Please input account address',
                    },
                  ]}
                  
            >
                <Input size="large" style={{ width: '100%' }} />
            </Form.Item>
            <Typography.Paragraph style={{ textAlign: 'center' }}>
                <SwapOutlined style={{ fontSize: "16px", transform: "rotate(90deg)" }} />
            </Typography.Paragraph>
            <Form.Item>
                <Button block loading={submit} size="large" type="primary" htmlType="submit">Transfer</Button>
            </Form.Item>
        </Form>
    )
} 
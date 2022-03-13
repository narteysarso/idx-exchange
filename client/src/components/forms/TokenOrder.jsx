import { SwapOutlined } from "@ant-design/icons";
import { Button,Form,InputNumber, Row, Typography } from "antd";
import { useEffect } from "react";
import { useOrder } from "../../hooks/useOrder";
export default function TokenOrder() {
    const {setFormData, formData, setSubmit, submit} = useOrder();
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        if(!form.validateFields()){
            return;
        }
        setSubmit(true);
    }

    const handleValuesChange = (_, allValues) => {
        setFormData(allValues);
    }

    useEffect( () => {
        // dynamically set value of ethereum in IDX tokens
        form.setFieldsValue({
            to: formData.to
        })
    }, [formData.to, form]);

    useEffect( ()=> {
        if(submit){
            return;
        }

        
        form.setFieldsValue({
            to: "",
            from: ""
        });
    }, [submit, form]);

    

    return (
        <Form
            layout="vertical"
            onFinish={handleFinish}
            onValuesChange={handleValuesChange}
            form={form}
            >

            <Row justify="space-between" style={{ textAlign: "center", width: '100%', padding: '0 5px 5px 5px' }}>
                <Typography.Text>
                    From (Amount in Eth)
                </Typography.Text>
                <Typography.Text >
                    Available: --
                </Typography.Text>

            </Row>
            <Form.Item
                name="from"
                initialValue={formData.from}
                rules={[
                    {
                      required: true,
                      message: 'Please input amount in ETH',
                    },
                  ]}
            >
                <InputNumber required size="large" step={0.00000001} min={0.00000001} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="To (IDX Token)"
                name="to"
                initialValue={formData.to}
                
            >
                <InputNumber size="large" disabled style={{ width: '100%' }} />
            </Form.Item>
            <Typography.Paragraph style={{textAlign: 'center'}}>
                <SwapOutlined style={{fontSize: "16px", transform: "rotate(90deg)" }} />
            </Typography.Paragraph>
            <Form.Item>
                <Button block loading={submit} size="large" type="primary" htmlType="submit">Enter an amount</Button>
            </Form.Item>
        </Form>
    )
} 
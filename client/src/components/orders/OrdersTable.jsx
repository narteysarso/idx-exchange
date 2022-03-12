import { Table } from "antd";



export default function OrdersTable({ datasource }) {

    
    const columns = [
        {
            title: "Date",
            dataIndex: "timestamp",
            render(text, record){
                return text?.toNumber ? new Date(text?.toNumber() *1000).toLocaleDateString() : ""
            },
            fixed: 'left'
        },
        {
            title: "From",
            dataIndex: "from"
        },
        {
            title: "To",
            dataIndex: 'to'
        },
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Amount",
            dataIndex: 'amount',
            render(text){
                return text?.toString();
            }
        },
        {
            title: "Tokens",
            dataIndex: 'tokens',
            render(text){
                return text?.toString()
            }
        },
        {
            title: "Status",
            dataIndex: 'status'
        }
    ]
    return (
        <Table
            size="small"
            key={"id"}
            columns={columns}
            scroll={{ x: 1500 }}
            dataSource={datasource}
        />
    )
}
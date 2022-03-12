import { Layout, Typography } from "antd";
import { Navbar } from "../Navbar";

export default function MainLayout(props) {
    return (
        <Layout className="main-layout">
            <Layout.Header>
                <Navbar />
            </Layout.Header>
            <Layout.Content className="site-content">
                {props.children}
            </Layout.Content>
            <Layout.Footer>
                <Typography.Title level={5} style={{textAlign: 'center'}}>IDX &copy; {(new Date()).getFullYear()} | Hire Me: <a target="_blank" href="https://linkedin.com/in/narteykodjosarso" rel="noreferrer">Nartey Kodjo-Sarso</a></Typography.Title>
            </Layout.Footer>
        </Layout>
    )
}
import { Layout } from 'antd';
import styled from '@emotion/styled'

const { Header, Footer, Content } = Layout;


const Logo = styled.p`
    color: white;
    white-space: nowrap;
`

export default function CustomLayout({children}) {
    return (
        <Layout>
        <Header style={{ minWidth: '80%' }}>
            <Logo>연세대학교 도시공학과 소모임 오순도순</Logo>
        </Header>
        <Content className="site-layout" style={{ padding: '0 40px', marginTop: 32 }}>
            <div style={{ padding: '8px 24px', minHeight: 380, backgroundColor: 'white'}}>
                {children}
            </div>
        </Content>
        <Footer>Footer</Footer>
        </Layout>
    )
}
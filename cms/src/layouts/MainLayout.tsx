import { useState, type ReactNode } from "react"
import { Layout, Menu, Typography, Button, Drawer } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { dashboardSection, sections } from "../config/sections"

const { Header, Sider, Content } = Layout
const { Title } = Typography

interface MainLayoutProps {
  selectedSection: string
  onSelectSection: (key: string) => void
  pageTitle: string
  children: ReactNode
}

export default function MainLayout({
  selectedSection,
  onSelectSection,
  pageTitle,
  children,
}: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [dashboardSection, ...sections].map((section) => ({
    key: section.key,
    icon: section.icon,
    label: section.label,
  }))

  const handleSelect = (key: string) => {
    onSelectSection(key)
    setMobileOpen(false)
  }

  const sidebarBrand = (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        color: "white",
        fontSize: 20,
        fontWeight: 600,
      }}
    >
      Travel CMS
    </div>
  )

  const navMenu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedSection]}
      items={menuItems}
      onClick={({ key }) => handleSelect(key)}
    />
  )

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Sider
        width={260}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        className="cms-desktop-sider"
        style={{ display: "none" }}
      >
        {sidebarBrand}
        {navMenu}
      </Sider>

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={260}
        styles={{ body: { padding: 0, background: "#001529" } }}
      >
        {sidebarBrand}
        {navMenu}
      </Drawer>

      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: "1px solid #f0f0f0",
            flexShrink: 0,
          }}
        >
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="cms-mobile-trigger"
            onClick={() => setMobileOpen(true)}
            style={{ display: "none" }}
          />

          <Title level={3} style={{ margin: 0, fontSize: "clamp(18px, 4vw, 24px)" }}>
            {pageTitle}
          </Title>
        </Header>

        <Content
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#f5f7fa",
            padding: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>

      <style>{`
        @media (min-width: 992px) {
          .cms-desktop-sider {
            display: block !important;
          }
        }
        @media (max-width: 991px) {
          .cms-mobile-trigger {
            display: inline-flex !important;
          }
        }
        .ant-layout-content {
          padding: 16px;
        }
        @media (min-width: 768px) {
          .ant-layout-content {
            padding: 24px;
          }
        }
      `}</style>
    </Layout>
  )
}
import { useState } from "react";

import {
  Layout,
  Menu,
  Typography,
  Card,
  Space,
} from "antd";

import {
  DashboardOutlined,
  PictureOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  NotificationOutlined,
  MessageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import HeroPage from "./pages/HeroPage";
import DealsPage from "./pages/DealsPage";
import DestinationsPage from "./pages/DestinationsPage";
import PromosPage from "./pages/PromosPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import InsightsPage from "./pages/InsightsPage";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const [selectedSection, setSelectedSection] =
    useState("dashboard");

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "hero",
      icon: <PictureOutlined />,
      label: "Hero Banner",
    },
    {
      key: "deals",
      icon: <TagsOutlined />,
      label: "Travel Simba Exclusives",
    },
    {
      key: "destinations",
      icon: <EnvironmentOutlined />,
      label: "Popular Destinations",
    },
    {
      key: "promos",
      icon: <NotificationOutlined />,
      label: "Promo Banners",
    },
    {
      key: "testimonials",
      icon: <MessageOutlined />,
      label: "Testimonials",
    },
    {
      key: "insights",
      icon: <FileTextOutlined />,
      label: "Latest Insights",
    },
  ];

  const getPageTitle = () => {
    switch (selectedSection) {
      case "hero":
        return "Hero Banner";

      case "deals":
        return "Travel Simba Exclusives";

      case "destinations":
        return "Popular Destinations";

      case "promos":
        return "Promo Banners";

      case "testimonials":
        return "Testimonials";

      case "insights":
        return "Latest Insights";

      default:
        return "Dashboard";
    }
  };

  const renderPage = () => {
    switch (selectedSection) {
      case "hero":
        return <HeroPage />;

      case "deals":
        return <DealsPage />;

      case "destinations":
        return <DestinationsPage />;

      case "promos":
        return <PromosPage />;

      case "testimonials":
        return <TestimonialsPage />;

      case "insights":
        return <InsightsPage />;

      default:
        return (
          <>
            <Title level={2}>
              Welcome to Travel CMS
            </Title>

            <Text type="secondary">
              Manage the dynamic content of your travel
              website from here.
            </Text>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
                marginTop: 30,
              }}
            >
              <Card title="Hero Banner">
                <Space>
                  <PictureOutlined />
                  <Text>
                    Manage homepage hero
                  </Text>
                </Space>
              </Card>

              <Card title="Travel Simba Exclusives">
                <Space>
                  <TagsOutlined />
                  <Text>Manage deals</Text>
                </Space>
              </Card>

              <Card title="Popular Destinations">
                <Space>
                  <EnvironmentOutlined />
                  <Text>
                    Manage destinations
                  </Text>
                </Space>
              </Card>

              <Card title="Promo Banners">
                <Space>
                  <NotificationOutlined />
                  <Text>
                    Manage promotions
                  </Text>
                </Space>
              </Card>

              <Card title="Testimonials">
                <Space>
                  <MessageOutlined />
                  <Text>
                    Manage testimonials
                  </Text>
                </Space>
              </Card>

              <Card title="Latest Insights">
                <Space>
                  <FileTextOutlined />
                  <Text>
                    Manage blog content
                  </Text>
                </Space>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={260}
        theme="dark"
        breakpoint="lg"
        collapsedWidth="0"
      >
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

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedSection]}
          items={menuItems}
          onClick={({ key }) =>
            setSelectedSection(key)
          }
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            borderBottom:
              "1px solid #f0f0f0",
          }}
        >
          <Title
            level={3}
            style={{ margin: 0 }}
          >
            {getPageTitle()}
          </Title>
        </Header>

        <Content
          style={{
            margin: 24,
          }}
        >
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

import { useEffect, useState } from "react"
import { Typography, Card, Row, Col, Statistic, Skeleton, Space } from "antd"
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { sections } from "../config/sections"
import { getItems } from "../api"

const { Title, Text } = Typography

interface DashboardPageProps {
  onNavigate: (key: string) => void
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [counts, setCounts] = useState<Record<string, number | null>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadCounts() {
      const results = await Promise.all(
        sections.map(async (section) => {
          try {
            const items = await getItems(section.key)
            return [section.key, Array.isArray(items) ? items.length : 0] as const
          } catch {
            return [section.key, null] as const
          }
        })
      )

      if (!cancelled) {
        setCounts(Object.fromEntries(results))
        setLoading(false)
      }
    }

    loadCounts()

    return () => {
      cancelled = true
    }
  }, [])

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const totalItems = Object.values(counts).reduce(
    (sum, count) => sum + (count ?? 0),
    0
  )

  return (
        <div style={{ paddingBottom: 40, flex: 1, display: "flex", flexDirection: "column" }}>

            <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f75bc 100%)",
          borderRadius: 12,
          padding: "32px 32px",
          marginBottom: 32,
          color: "white",
        }}
      >
        <Space direction="vertical" size={4}>
          <Text style={{ color: "rgba(255,255,255,0.75)" }}>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            {today}
          </Text>

          <Title level={2} style={{ color: "white", margin: 0 }}>
            Welcome to Travel CMS
          </Title>

          <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
            Manage the dynamic content of your travel website from here.
          </Text>

          {!loading && (
            <Text style={{ color: "rgba(255,255,255,0.85)", marginTop: 8 }}>
              You're currently managing <strong>{totalItems}</strong> total
              content items across {sections.length} sections.
            </Text>
          )}
        </Space>
      </div>

      <Title level={4} style={{ marginBottom: 16 }}>
        Content Sections
      </Title>
      <Row gutter={[20, 20]}>
        {sections.map((section) => {
          const count = counts[section.key]

          return (
            <Col key={section.key} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                onClick={() => onNavigate(section.key)}
                style={{ height: "100%" }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      color: "#0f75bc",
                      background: "#e6f4ff",
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {section.icon}
                  </div>

                  <ArrowRightOutlined style={{ color: "#bbb" }} />
                </div>

                <Title level={5} style={{ marginTop: 16, marginBottom: 4 }}>
                  {section.label}
                </Title>

                <Text type="secondary" style={{ marginBottom: 16 }}>
                  {section.description}
                </Text>

                <div style={{ marginTop: "auto" }}>
                  {loading ? (
                    <Skeleton.Input active size="small" style={{ width: 60 }} />
                  ) : count === null ? (
                    <Text type="danger">Failed to load</Text>
                  ) : (
                    <Statistic
                      value={count}
                      suffix={count === 1 ? "item" : "items"}
                      valueStyle={{ fontSize: 20 }}
                    />
                  )}
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
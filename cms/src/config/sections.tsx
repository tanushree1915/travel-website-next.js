import type { ComponentType, ReactNode } from "react"

import {
  DashboardOutlined,
  PictureOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  NotificationOutlined,
  MessageOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

import HeroPage from "../pages/HeroPage"
import DealsPage from "../pages/DealsPage"
import DestinationsPage from "../pages/DestinationsPage"
import PromosPage from "../pages/PromosPage"
import TestimonialsPage from "../pages/TestimonialsPage"
import InsightsPage from "../pages/InsightsPage"

export interface Section {
  key: string
  label: string
  icon: ReactNode
  description: string
  component: ComponentType | null
}

export const dashboardSection: Section = {
  key: "dashboard",
  label: "Dashboard",
  icon: <DashboardOutlined />,
  description: "",
  component: null,
}

export const sections: Section[] = [
  {
    key: "hero",
    label: "Hero Banner",
    icon: <PictureOutlined />,
    description: "Manage homepage hero",
    component: HeroPage,
  },
  {
    key: "deals",
    label: "Travel Simba Exclusives",
    icon: <TagsOutlined />,
    description: "Manage deals",
    component: DealsPage,
  },
  {
    key: "destinations",
    label: "Popular Destinations",
    icon: <EnvironmentOutlined />,
    description: "Manage destinations",
    component: DestinationsPage,
  },
  {
    key: "promos",
    label: "Promo Banners",
    icon: <NotificationOutlined />,
    description: "Manage promotions",
    component: PromosPage,
  },
  {
    key: "testimonials",
    label: "Testimonials",
    icon: <MessageOutlined />,
    description: "Manage testimonials",
    component: TestimonialsPage,
  },
  {
    key: "insights",
    label: "Latest Insights",
    icon: <FileTextOutlined />,
    description: "Manage blog content",
    component: InsightsPage,
  },
]

export function getSection(key: string): Section {
  if (key === "dashboard") return dashboardSection
  return sections.find((s) => s.key === key) ?? dashboardSection
}
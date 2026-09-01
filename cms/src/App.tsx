import { useState } from "react"

import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/DashboardPage"
import { getSection } from "./config/sections"

function App() {
  const [selectedSection, setSelectedSection] = useState("dashboard")

  const activeSection = getSection(selectedSection)
  const PageComponent = activeSection.component

  return (
    <MainLayout
      selectedSection={selectedSection}
      onSelectSection={setSelectedSection}
      pageTitle={activeSection.label}
    >
      {PageComponent ? (
        <PageComponent />
      ) : (
        <DashboardPage onNavigate={setSelectedSection} />
      )}
    </MainLayout>
  )
}

export default App
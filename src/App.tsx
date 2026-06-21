import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Overview } from "./pages/Overview";
import { Videos } from "./pages/Videos";
import { Audience } from "./pages/Audience";
import { Traffic } from "./pages/Traffic";
import { Growth } from "./pages/Growth";
import { LiveAnalytics } from "./pages/LiveAnalytics";
import { AiInsights } from "./pages/AiInsights";
import { DataHub } from "./pages/DataHub";
import { Settings } from "./pages/Settings";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "react";

export default function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" theme={theme === 'system' ? 'system' : theme} />
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/live" element={<LiveAnalytics />} />
          <Route path="/ai-insights" element={<AiInsights />} />
          <Route path="/data" element={<DataHub />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

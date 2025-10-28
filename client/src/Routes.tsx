import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom"; // use react-router-dom instead of just react-router
import useCurrentUser from "./hooks/useCurrentUser";
import PageLoader from "./components/PageLoader";
import MainLayout from "./components/layout/MainLayout";

const LoginPage = React.lazy(() => import("./views/loginPage/Login"));
const HomePage = React.lazy(() => import("./views/HomePage"));
const DailyReportTable = React.lazy(
  () => import("./views/dailySales/DailyReportTable")
);
const MaterialRequestTable = React.lazy((
  () => import("./views/material/MaterialRequestTable")
))

const ProtectedRoute = () => {
  const { user, status } = useCurrentUser();

  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

function withLayout(Layout: any, Component: any) {
  return (
    <Layout>
      <Suspense
        fallback={
          <>
            <PageLoader />
          </>
        }
      >
        <Component />
      </Suspense>
    </Layout>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={withLayout(MainLayout, HomePage)} />
        <Route
          path="/sales/report-history"
          element={withLayout(MainLayout, DailyReportTable)}
        />
        <Route
          path="/sales/daily-report"
          element={withLayout(MainLayout, () => (
            <DailyReportTable isDailyReport={true} isMonthlyReport={false} />
          ))}
        />
        <Route
          path="/sales/monthly-report"
          element={withLayout(MainLayout, () => (
            <DailyReportTable isDailyReport={false} isMonthlyReport={true} />
          ))}
        />
        <Route
          path="/material/material-request"
          element={withLayout(MainLayout, MaterialRequestTable)}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

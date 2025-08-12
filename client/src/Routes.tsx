import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom"; // use react-router-dom instead of just react-router
import useCurrentUser from "./hooks/useCurrentUser";
import PageLoader from "./components/PageLoader";
import MainLayout from "./components/layout/MainLayout";

const LoginPage = React.lazy(() => import("./views/loginPage/Login"));
const HomePage = React.lazy(() => import("./views/HomePage"));

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
      </Route>
    </Routes>
  );
};

export default AppRoutes;

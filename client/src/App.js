import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Suspense, useMemo, lazy } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "theme";

import LoadingCircle from "scenes/widgets/LoadingCircle";

const HomePage = lazy(() => import("scenes/homePage"));
const ProfilePage = lazy(() => import("scenes/profilePage"));
const LoginPage = lazy(() => import("scenes/loginPage"));

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LoadingCircle />}>
            <Routes>
              <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <LoginPage />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <LoginPage />}
              />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

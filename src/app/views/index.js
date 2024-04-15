import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "app/services/translate";
import useAuth from "app/Contexts/AuthContext";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleRedirection = (path) => () => {
    navigate(`/home/${path}`);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box flexGrow={1}></Box>
        <Box display="flex" alignItems="center">
          <Button
            onClick={handleRedirection("saleorders")}
            sx={{ mr: 1 }}
            color="secondary"
            variant="contained"
          >
            {t("Sale Order")}
          </Button>
          <Button
            onClick={handleRedirection("fleet")}
            sx={{ mr: 1 }}
            color="secondary"
            variant="contained"
          >
            {t("Vehicle")}
          </Button>

          <Button
            sx={{ mr: 1 }}
            color="error"
            variant="contained"
            onClick={logout}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Content() {
  return (
    <Box component="main" flexGrow={1}>
      <Outlet />
    </Box>
  );
}

function Layout() {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Header />
      <Content />
    </Box>
  );
}

export function Index() {
  return <Layout />;
}

export default Index;

import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Index from "./views";
import SaleOrders from "./views/SaleOrders/SaleOrders";
import Vehicle from "./views/Fleet/Vehicle";
import EditForm from "./views/SaleOrders/EditForm";
import AddProduct from "./views/SaleOrders/AddProduct";
import OrderList from "./views/SaleOrders/OrderList";
import VehicleForm from "./views/Fleet/VehicleForm";
import VehicleGrid from "./views/Fleet/VehicleGrid";
import VehicleEdit from "./views/Fleet/VehicleEdit";
import HomePage from "./components/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Index />,
        children: [
          {
            path: "",
            element: <HomePage />
          },
          {
            path: "saleorders",
            element: <SaleOrders />,
          },
          {
            path: "fleet",
            element: <Vehicle />,
          },
          {
            path: "edit",
            element: <AddProduct />,
          },
          {
            path: "edit/:id/",
            element: <EditForm />,
          },
          {
            path: "list",
            element: <OrderList />
          },
          {
            path: "vehicle-edit",
            element: <VehicleForm />
          },
          {
            path: 'vehicle-edit/:id/',
            element: <VehicleEdit />
          },
          {
            path: "vehicle-list",
            element: <VehicleGrid />
          }
        ],
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import { UIRoutes } from "../../utils";
import NotFound from "../entities/NotFound";
import RootLayout from "../Layout/RootLayout";
import PublicLayout from "../Layout/PublicLayout";
import PrivateLayout from "../Layout/PrivateLayout";
import Home from "../entities/Home";

const router = createBrowserRouter([
  {
    path: UIRoutes.ROOT,
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: UIRoutes.ROOT,
            element: <Home />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

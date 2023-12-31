// All components mapping with path for internal routes

import { lazy } from "react";

const Restaurants = lazy(() => import("../pages/protected/Restaurants"));
const Reviews = lazy(() => import("../pages/protected/Reviews"));
const Users = lazy(() => import("../pages/protected/Users"));

const routes = [
  {
    path: "/restaurants",
    component: Restaurants,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/reviews",
    component: Reviews,
  },
];

export default routes;

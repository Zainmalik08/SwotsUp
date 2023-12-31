/** Icons are imported separatly to reduce build time */
import UserIcons from "@heroicons/react/24/outline/UsersIcon";
import BuildingStorefront from "@heroicons/react/24/outline/BuildingStorefrontIcon";
import ReviewsIcon from "@heroicons/react/24/outline/NewspaperIcon";

const iconClasses = `h-6 w-6`;

const routes = [
  {
    path: "/app/users",
    icon: <UserIcons className={iconClasses} />,
    name: "Users",
  },
  {
    path: "/app/restaurants",
    icon: <BuildingStorefront className={iconClasses} />,
    name: "Restaurants",
  },
  {
    path: "/app/reviews",
    icon: <ReviewsIcon className={iconClasses} />,
    name: "Reviews",
  },
];

export default routes;

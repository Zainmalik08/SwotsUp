import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ReactPaginate from "react-paginate";
import { openModal } from "../common/modalSlice";
import "./style.css";
import { getRestaurantsContent } from "./RestaurantsSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
// import SearchBar from "../../components/Input/SearchBar";

// const TopSideButtons = ({ applySearch }) => {
//   const [searchText, setSearchText] = useState("");

//   const removeAppliedFilter = () => {
//     setSearchText("");
//   };

//   useEffect(() => {
//     if (searchText === "") {
//       removeAppliedFilter();
//     } else {
//       applySearch(searchText);
//     }
//   }, [searchText]);

//   return (
//     <div className="inline-block float-right">
//       <SearchBar
//         searchText={searchText}
//         styleClass="mr-4"
//         setSearchText={setSearchText}
//       />
//     </div>
//   );
// };

function Restaurants() {
  // const { leads } = useSelector((state) => state.lead);
  const { restaurants, totalRestaurants } = useSelector(
    (state) => state.restaurant
  );
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data based on the current page
    dispatch(
      getRestaurantsContent({ page: currentPage + 1, pageSize: itemsPerPage })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Restaurants"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created By</th>
                <th>Rating</th>
                <th>Address</th>
                <th>City</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={restaurant?.image} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{restaurant?.name}</div>
                          <div className="text-sm opacity-50">
                            {restaurant.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{restaurant.createdBy}</td>
                    <td>{restaurant.rating}</td>
                    <td>{restaurant.address}</td>
                    <td>{restaurant.city}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(index)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ float: "right", marginTop: "32px" }}>
          <ReactPaginate
            pageCount={Math.ceil(totalRestaurants / itemsPerPage)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </TitleCard>
    </>
  );
}

export default Restaurants;

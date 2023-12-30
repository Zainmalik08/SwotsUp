import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ReactPaginate from "react-paginate";
import { openModal } from "../common/modalSlice";
import "./style.css";
import { deleteLead, getRestaurantsContent } from "./RestaurantsSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = ({ applySearch }) => {
  const [searchText, setSearchText] = useState("");

  const removeAppliedFilter = () => {
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
    </div>
  );
};

function Restaurants() {
  // const { leads } = useSelector((state) => state.lead);
  const { restaurants } = useSelector((state) => state.restaurant);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const paginatedRestaurants = restaurants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantsContent());
  }, []);

  // const getDummyStatus = (index) => {
  //   if (index % 5 === 0) return <div className="badge">Not Interested</div>;
  //   else if (index % 5 === 1)
  //     return <div className="badge badge-primary">In Progress</div>;
  //   else if (index % 5 === 2)
  //     return <div className="badge badge-secondary">Sold</div>;
  //   else if (index % 5 === 3)
  //     return <div className="badge badge-accent">Need Followup</div>;
  //   else return <div className="badge badge-ghost">Open</div>;
  // };

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

  const [trans, setTrans] = useState(paginatedRestaurants);

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = paginatedRestaurants.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="Restaurants"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
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
              {paginatedRestaurants.map((restaurant, index) => {
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
                    <td>
                      {/* {moment(new Date())
                        .add(-5 * (index + 2), "days")
                        .format("DD MMM YY")} */}
                      {restaurant.rating}
                    </td>
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
            pageCount={Math.ceil(restaurants.length / itemsPerPage)}
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

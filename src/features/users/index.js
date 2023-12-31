import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ReactPaginate from "react-paginate";
import { openModal } from "../common/modalSlice";
import "./style.css";
import { getUsersContent } from "./UsersSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

function Users() {
  const { users, totalUsers } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data based on the current page
    dispatch(
      getUsersContent({ page: currentPage + 1, pageSize: itemsPerPage })
    );
  }, [currentPage, dispatch]);
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
      <TitleCard title="Users" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="avatar"></div>
                      <div>
                        <div className="font-bold">{user.fullName}</div>
                      </div>
                    </td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>{moment(user.createdAt).format("DD MMM YY")}</td>
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
            pageCount={Math.ceil(totalUsers / itemsPerPage)}
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

export default Users;

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ReactPaginate from "react-paginate";
import { openModal } from "../common/modalSlice";
import "./style.css";
import { deleteLead, getReviewsContent, getUsersContent } from "./ReviewsSlice";
import ReactStars from "react-rating-stars-component";

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PreviewImage from "@heroicons/react/24/outline/PhotoIcon";
import { showNotification } from "../common/headerSlice";
import { ModalManager } from "react-dynamic-modal/lib/Modal";
import { MyModal } from "../../components/ImageModal/Modal";

// const TopSideButtons = () => {
//   const dispatch = useDispatch();

//   const openAddNewLeadModal = () => {
//     dispatch(
//       openModal({
//         title: "Add New Lead",
//         bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
//       })
//     );
//   };

//   return (
//     <div className="inline-block float-right">
//       <button
//         className="btn px-6 btn-sm normal-case btn-primary"
//         onClick={() => openAddNewLeadModal()}
//       >
//         Add New
//       </button>
//     </div>
//   );
// };

function Reviews() {
  // const { leads } = useSelector((state) => state.lead);
  const { reviews } = useSelector((state) => state.review);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // console.log(reviews);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const paginationReviews = reviews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsContent());
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

  const showReview = (review) => {
    console.log("review", review);
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          content: (
            <div>
              <image src={review.url} alt={`Review Image ${review}`} />
              <p>{review.text}</p>
              {/* Include other details you want to display */}
            </div>
          ),
          // message: `Are you sure you want to delete this lead?`,
          // type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          // index,
        },
      })
    );
  };
  const openModal = (reviews) => {
    ModalManager.open(
      <MyModal data={reviews} text={"Zain"} onRequestClose={() => true} />
    );
  };

  return (
    <>
      <TitleCard
        title="Reviews"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                {/* <th>Name</th> */}
                <th>Created At</th>
                <th style={{ textAlign: "center" }}>Review</th>
                <th style={{ textAlign: "center" }}>Rating</th>
                <th></th>
                <th style={{ textAlign: "center" }}>Preview</th>
                {/* <th style={{ textAlign: "center" }}></th> */}
              </tr>
            </thead>
            <tbody>
              {paginationReviews.map((reviews, index) => {
                return (
                  <tr key={index}>
                    {/* <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={reviews?.image} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{reviews?.name}</div>
                          <div className="text-sm opacity-50">
                            {reviews.name}
                          </div>
                        </div>
                      </div>
                    </td> */}
                    <td>{moment(reviews.createdAt).format("DD MMM YY")}</td>
                    <td
                      style={{
                        maxWidth: "850px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {reviews.text}
                    </td>

                    {/* <td></td> */}

                    <td style={{ display: "flex", justifyContent: "center" }}>
                      {reviews.rating}/5
                    </td>
                    <td>
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        value={reviews.rating}
                      />
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => openModal(reviews)}
                      >
                        <PreviewImage className="w-5" />
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
            pageCount={Math.ceil(reviews.length / itemsPerPage)}
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

export default Reviews;

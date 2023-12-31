/* eslint-disable jsx-a11y/img-redundant-alt */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import ReactPaginate from "react-paginate";
import "./style.css";
import { getReviewsContent } from "./ReviewsSlice";
import ReactStars from "react-rating-stars-component";
import PreviewImage from "@heroicons/react/24/outline/PhotoIcon";
import CloseIcon from "@heroicons/react/24/outline/XCircleIcon";
import Modal from "react-modal";

function Reviews() {
  const { reviews, totalReviews } = useSelector((state) => state.review);
  // const { isModalOpen, setModalOpen } = useSelector(false);
  const [clickedReview, setClickedReview] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const dispatch = useDispatch();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "auto",
      width: "auto",
      maxWidth: "60%",
      overflow: "auto",
      borderRadius: "16px",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(review) {
    setClickedReview(review);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(
      getReviewsContent({ page: currentPage + 1, pageSize: itemsPerPage })
    );
  }, [currentPage, dispatch]);

  const reviewImage = clickedReview?.reviewImages;

  return (
    <>
      <TitleCard
        title="Reviews"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Created At</th>
                <th style={{ textAlign: "center" }}>Review</th>
                <th style={{ textAlign: "center" }}>Rating</th>
                <th></th>
                <th style={{ textAlign: "center" }}>Preview</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((reviews, index) => {
                return (
                  <tr key={index}>
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
            pageCount={Math.ceil(totalReviews / itemsPerPage)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </TitleCard>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {reviewImage && reviewImage.length > 0 ? (
          <>
            <div className="button">
              <button className="btn btn-square btn-ghost" onClick={closeModal}>
                <CloseIcon className="w-8" />
              </button>
            </div>
            <div className="images">
              {reviewImage.map((image, index) => (
                <div key={index}>
                  <img src={image.url} alt="image" height={209} width={209} />
                </div>
              ))}
            </div>
            <div style={{ padding: 24 }}>{clickedReview.text}</div>
          </>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p color="#000" style={{ fontSize: 24 }}>
              No image found.
            </p>
          </div>
        )}
      </Modal>
      ;
    </>
  );
}

export default Reviews;

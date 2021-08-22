import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "react-js-pagination";

import ExploreRoom from "./room/ExploreRoom";
import RoomItem from "./room/roomItem";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { clearError } from "../redux/actions/roomActions";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { rooms, resPerPage, roomsCount, filteredRoomCount, error } =
    useSelector((state) => state.allRooms);

  useEffect(() => {
    toast.error(error);
    dispatch(clearError());
  }, []);

  let { location, page = 1 } = router.query;

  page = Number(page);

  const handlePagination = (pageNumber) => {
    router.push(`/?page=${pageNumber}`);
  };

  let count = roomsCount;
  if (location) {
    count = filteredRoomCount;
  }

  return (
    <>
      <div>
        <img
          className="main-landing-image"
          src="https://res.cloudinary.com/dxjzhrrw0/image/upload/v1629553557/hoteles/pictures/CoverCartoon_g4d022.webp"
        />
      </div>
      <ExploreRoom />
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Stays in ${location}` : "All Stays"}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No rooms available.</b>
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>

      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};

export default Home;

import React from "react";
import { getSession } from "next-auth/client";

import BookingDetail from "../../components/booking/BookingDetail";
import Layout from "../../components/Layout/Layout";

import { getBookingDetails } from "../../redux/actions/bookingActions";
import { wrapper } from "../../redux/store";

const BookingDetailPage = () => {
  return (
    <Layout title="Update Profile">
      <BookingDetail />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params, store }) => {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id));
  }
);

export default BookingDetailPage;

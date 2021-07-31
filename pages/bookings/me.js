import React from "react";
import { getSession } from "next-auth/client";

import MyBooking from "../../components/booking/MyBooking";
import Layout from "../../components/Layout/Layout";

import { myBookings } from "../../redux/actions/bookingActions";
import { wrapper } from "../../redux/store";

const MyBookingsPage = () => {
  return (
    <Layout title="Update Profile">
      <MyBooking />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, store }) => {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    await store.dispatch(myBookings(req.headers.cookie, req));
  }
);

export default MyBookingsPage;

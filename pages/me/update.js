import React from "react";
import { getSession } from "next-auth/client";

const UpdateUserProfile = () => {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default UpdateUserProfile;

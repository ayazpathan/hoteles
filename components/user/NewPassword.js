import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ButtonLoader from "../Layout/ButtonLoader";
import Loader from "../Layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError } from "../../redux/actions/userActions";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    console.log("ERROR");
    console.log(error);
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      router.push("/login");
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    dispatch(forgotPassword(userData));
  };

  return <div></div>;
};

export default NewPassword;

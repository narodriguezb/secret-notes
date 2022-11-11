import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function Register() {
  const { singUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const customSubmit = async (user) => {
    try {
      await singUp(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }

    console.log(user);
  };

  return (
    <>
      <h2>Form Validation</h2>

      <form onSubmit={handleSubmit(customSubmit)} className="form-react">
        <div className="form-control">
          <label> Name </label>
          <input
            type="text"
            placeholder="Write your name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
        </div>

        <div className="form-control">
          <label> Last Name </label>
          <input
            type="text"
            placeholder="Write your last name"
            {...register("Lastname", { required: true })}
          />
          {errors.Lastname?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
        </div>

        <div className="form-control">
          <label> email </label>
          <input
            type="email"
            placeholder="Write your email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
          {errors.email?.type === "pattern" && (
            <small className="fail"> {errors.email.message} </small>
          )}
        </div>

        <div className="form-control">
          <label> Password </label>
          <input
            type="password"
            {...register("password", { required: true, minLength:6 })}
          />
          {errors.password?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
           {errors.password?.type === "minLength" && (
            <small className="fail"> The min character are six </small>
          )}
        </div>
        <button type="submit"> SEND </button>
      </form>
    </>
  );
}

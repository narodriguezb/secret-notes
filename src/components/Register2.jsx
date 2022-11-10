import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const customSubmit = async (data) => {
    const { singUp } = useAuth();
    const navigate = useNavigate();
    try {
      await singUp(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }

    console.log(data);
  };

  return (
    <>
      <h2>Form Validation</h2>

      <form onSubmit={handleSubmit(customSubmit)} className="form-react">
        <div className="form-control">
          <label> Name </label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
        </div>

        <div className="form-control">
          <label> Last Name </label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
        </div>

        {/* //aqui voy mis perrros */}
        <div className="form-control">
          <label> email </label>
          <input type="email" {...register("email", { required: true })} />
          {errors.age?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
          {errors.age?.type === "max" && (
            <small className="fail"> The maximun number is 100 </small>
          )}
          {errors.age?.type === "min" && (
            <small className="fail"> The minimun number is 5 </small>
          )}
        </div>

        <div className="form-control">
          <label> Country </label>
          <input type="text" {...register("country", { required: true })} />
          {errors.country?.type === "required" && (
            <small className="fail"> The fild is required </small>
          )}
        </div>
        <button type="submit"> SEND </button>
      </form>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function FormValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const customSubmit = (data) => {
    console.log(data);
    alert('validacion exitosa')
    console.log(watch('prueba'))
  };

  const[colorInput, setColorInput]=useState("#fff7f7")
  useEffect(()=>{
    let words=watch('prueba')
    console.log(words)
    if(words==='react'){
        setColorInput('#614ad3')
    } else{
        setColorInput("#fff7f7")
    }
  })

  return (
    <>
      <h2>Form Validation</h2>
    
      <form onSubmit={handleSubmit(customSubmit)} className="form-react">
        <div className="form-control">
          <label> Name </label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 5 })}
          />
          {errors.name?.type ==='required' && (
            <small className="fail"> The fild is required </small>
          )}

        </div>

        <div className="form-control">
          <label> Age </label>
          <input type="number" {...register("age", {required:true, max:100, min:5})} />
          {errors.age?.type ==='required' && (
            <small className="fail"> The fild is required </small>
          )}
          {errors.age?.type ==='max' && (
            <small className="fail"> The maximun number is 100 </small>
          )}
           {errors.age?.type ==='min' && (
            <small className="fail"> The minimun number is 5 </small>
          )}
        </div>

        <div className="form-control">
          <label> Country </label>
          <input type="text" {...register("country", {required:true})} />
          {errors.country?.type ==='required' && (
            <small className="fail"> The fild is required </small>
          )}
        </div>
            <div className="form-control">
                <input {...register('prueba')} style={{backgroundColor:colorInput}}/>

            </div>
        <button type="submit"> SEND </button>
      </form>
    </>
  );
}
import { useForm } from "react-hook-form";
import React from "react";
import { useParams } from "react-router-dom";

const Slot_page = () => {
  const { id, index } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Team Registration Data:", data);
    alert("Team Registered Successfully!");
  };

  const validateText = (value) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value) || "Only text is allowed";
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">BGMI Tournament {index} Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <h3 className="font-semibold">Teammate 1</h3>
          <label className="block mb-1">Leader Name</label>
          <input
            type="text"
            {...register("leader.name", {
              required: "Leader Name is required",
              validate: validateText,
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only text is allowed",
              },
            })}
            className="w-full p-2 rounded bg-gray-700"
          />
          {errors.leader?.name && <p className="text-red-400">{errors.leader.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Leader BGMI ID</label>
          <input
            type="text"
            {...register("leader.bgmiId", {
              required: "Leader BGMI ID is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numeric characters are allowed",
              },
              minLength: {
                value: 15,
                message: "BGMI ID must be exactly 15 characters",
              },
              maxLength: {
                value: 15,
                message: "BGMI ID must be exactly 15 characters",
              },
            })}
            className="w-full p-2 rounded bg-gray-700"
          />
          {errors.leader?.bgmiId && <p className="text-red-400">{errors.leader.bgmiId.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Leader Mobile Number</label>
          <input
            type="tel"
            {...register("leader.mobileNumber", {
              required: "Leader Mobile Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number",
              },
            })}
            className="w-full p-2 rounded bg-gray-700"
          />
          {errors.leader?.mobileNumber && <p className="text-red-400">{errors.leader.mobileNumber.message}</p>}
        </div>

        {/* Teammates */}
        {[2, 3, 4].map((index) => (
          <div key={index} className="border-t pt-4">
            <h3 className="font-semibold">Teammate {index}</h3>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                {...register(`teammates[${index - 1}].name`, {
                  required: "Name is required",
                  validate: validateText,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only text is allowed",
                  },
                })}
                className="w-full p-2 rounded bg-gray-700"
              />
              {errors.teammates?.[index - 1]?.name && (
                <p className="text-red-400">{errors.teammates[index - 1].name.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">BGMI ID</label>
              <input
                type="text"
                {...register(`teammates[${index - 1}].bgmiId`, {
                  required: "BGMI ID is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numeric characters are allowed",
                  },
                  minLength: {
                    value: 15,
                    message: "BGMI ID must be exactly 15 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "BGMI ID must be exactly 15 characters",
                  },
                })}
                className="w-full p-2 rounded bg-gray-700"
              />
              {errors.teammates?.[index - 1]?.bgmiId && (
                <p className="text-red-400">{errors.teammates[index - 1].bgmiId.message}</p>
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
          Register Team
        </button>
      </form>
    </div>
  );
};

export default Slot_page;
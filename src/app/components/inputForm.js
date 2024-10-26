import React from 'react';
import { useForm } from 'react-hook-form';

const InputForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    // Convert string inputs to numbers
    const numericData = {
      jobsApplied: Number(data.jobsApplied),
      interviews: Number(data.interviews),
      offers: Number(data.offers),
      hired: Number(data.hired),
      rejected: Number(data.rejected),
      rejectedOffers: Number(data.rejectedOffers),
    };
    onSubmit(numericData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="mb-8">
      {/* Jobs Applied */}
      <div className="mb-4"> 
        <label htmlFor="jobsApplied" className="block text-gray-700">
          Jobs Applied:
        </label>
        <input
          id="jobsApplied"
          type="number"
          {...register('jobsApplied', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.jobsApplied ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 10"
        />
        {errors.jobsApplied && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>

      {/* Interviews */}
      <div className="mb-4">
        <label htmlFor="interviews" className="block text-gray-700">
          Interviews:
        </label>
        <input
          id="interviews"
          type="number"
          {...register('interviews', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.interviews ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 5"
        />
        {errors.interviews && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>
       {/* Rejected */} 
       <div className="mb-4">
        <label htmlFor="rejected" className="block text-gray-700">
          Rejected:    
        </label>
        <input
          id="rejected"
          type="number"
          {...register('rejected', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.rejected ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 9"
        />
        {errors.rejected && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>

      {/* Offers */}
      <div className="mb-4">
        <label htmlFor="offers" className="block text-gray-700">
          Offers:
        </label>
        <input
          id="offers"
          type="number"
          {...register('offers', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.offers ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 2"
        />
        {errors.offers && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>

      {/* Hired */}
      <div className="mb-4">
        <label htmlFor="hired" className="block text-gray-700">
          Hired:
        </label>
        <input
          id="hired"
          type="number"
          {...register('hired', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.hired ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 1"
        />
        {errors.hired && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>
           {/* Rejected Offers */}
           <div className="mb-4">
        <label htmlFor="rejectedOffers" className="block text-gray-700">
          Rejected Offers: 
        </label>
        <input
          id="rejectedOffers"
          type="number"
          {...register('rejectedOffers', { required: true, min: 0 })}
          className={`mt-1 block w-full p-2 border rounded ${
            errors.rejectedOffers ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 3"
        />
        {errors.rejectedOffers && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid number.</p>
        )}
      </div>
 

     


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { fetchCourseCategories } from '../../../../../services/operation/courseDetailAPI';
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInfo = () => {
  const { register, handleSubmit, setValue, getValues, formState:{errors} } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course)
  const [courseCategories, setCourseCategories] = useState([]);
  const getCategories = async () => {
    const categories = await fetchCourseCategories()
    if (categories.length > 0) {
      // console.log("categories", categories)
      setCourseCategories(categories)
    }
  }
  useEffect(() => {
    if(editCourse){
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()
  }, []);
  const submitHandler = () => {

  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title <sup className="text-pink-200">*</sup></label>
        <input
          name='courseTitle'
          id='courseTitle'
          type='text'
          placeholder='Enter your course title'
          {...register("courseTitle", {required:true})}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        />
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Title is required
            </span>
          )
        }
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">Course Description <sup className="text-pink-200">*</sup></label>
        <input
          name='courseShortDesc'
          id='courseShortDesc'
          type='text'
          placeholder='Enter your course description'
          {...register("courseShortDesc", {required:true})}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        />
        {
          errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )
        }
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"

            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-600 !pl-10 p-[12px] text-richblack-5"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          defaultValue=""
          id="courseCategory"
          {...register("courseCategory",  { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {
            courseCategories.map((category, index) => (
              <option key={index} value={category?.id}>
                {category?.name}
              </option>
            ))
          }
          {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
          )}
        </select>
      </div>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
    </form>
  )
}

export default CourseInfo
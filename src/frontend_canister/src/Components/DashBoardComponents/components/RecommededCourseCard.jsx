import React, { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "../../utils/useAuthClient";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
const RecommededCourseCard = ({ SingleCourseData, index }) => {
  const { t } = useTranslation();
  const { contentActor, actor } = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const sanitizedDescription = SingleCourseData.shortdescription
    ? DOMPurify.sanitize(SingleCourseData.shortdescription)
    : "";

  // Prepare the content based on the length of the description
  const contentHTML =
    sanitizedDescription.length > 80
      ? `${sanitizedDescription.substring(0, 150)}...`
      : sanitizedDescription;
  // F2F4FD
  useEffect(() => {
    if (SingleCourseData) {
      fetchButtonStatus(SingleCourseData.courseId);
    }

    const checkEnrollment = async () => {
      const result = await contentActor.isuserenrolled(
        SingleCourseData.courseId
      );
      console.log(result);
    };
    checkEnrollment();
  }, [SingleCourseData]);

  const fetchButtonStatus = async (courseId) => {
    try {
      setLoading(true);
      const status = await contentActor.isuserenrolled(courseId);
      setEnrolled(status);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      const result = await contentActor.enrollbystudent(courseId);
      const result1 = await actor.updateOngoingCourse(courseId);
      setLoading(false);
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/my-courses/${courseId}`
          : `/student-dashboard/my-courses/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
      );
    } catch (error) {
      const message = error.message;
      const startIndex = message.indexOf("trapped explicitly:");
      const errorMessageSubstring = message.substring(startIndex);
      const endIndex = errorMessageSubstring.indexOf(":");
      const finalErrorMessage = errorMessageSubstring
        .substring(endIndex + 1)
        .trim();
      toast.error(finalErrorMessage);
    } finally {
      setLoading(false);
      navigate(
        process.env.DFX_NETWORK === "ic"
          ? `/student-dashboard/my-courses/${courseId}`
          : `/student-dashboard/my-courses/${courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
      );
    }
  };

  const cardClassName = `my-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center px-4 lg:px-8 py-5 rounded-lg shadow-lg w-full bg-violet-100`;
  const textClassName = `text-violet-600 w-full flex flex-col sm:w-full md:w-full lg:w-2/3 gap-1`;
  const buttonClassName = `px-2 ml-2 py-2 font-bold text-white bg-violet-300 rounded hover:bg-violet-600 duration-300 ease-in-out shadow`;
  // console.log("card class", cardClassName);

  return SingleCourseData ? (
    <div className={cardClassName}>
      <div
        className={`flex items-start justify-start  w-full sm:w-full md:w-full lg:w-1/3 lg:justify-start lg:items-start`}
      >
        <img
          src={SingleCourseData.courseImg}
          alt="card images"
          className="w-[60%] drop-shadow-lg object-contain"
        />
      </div>
      <div className={textClassName}>
        <div>
          <p className="font-bold lightfont">
            {new Date(
              parseInt(SingleCourseData.upload_date) / 1000000
            ).toLocaleDateString()}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold">
            {SingleCourseData.courseTitle &&
            SingleCourseData.courseTitle.length > 80
              ? `${SingleCourseData.courseTitle.substring(0, 80)}...`
              : SingleCourseData.courseTitle}
          </h1>
        </div>
        <div>
          <p
            className="text-md lightfont"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          ></p>
        </div>
        <div className="flex lg:flex-row flex-col md:flex-row items-start md:items-center justify-start md:justify-between my-3">
          <div className="flex items-center justify-start md:justify-center space-x-1">
            <IoIosStar className="text-xl font-bold text-yellow-400" />
            <div className="flex items-center justify-start md:justify-center gap-2 font-bold lightfont">
              <p>{SingleCourseData.rating}</p>
              <p className="flex items-center  justify-start md:justify-center gap-2">
                <GoDotFill className="text-[10px]" />
                {"Beginner"}
              </p>
            </div>
          </div>
          <div>
            <button
              type="button"
              hidden={enrolled}
              className={buttonClassName}
              onClick={() => enrollInCourse(SingleCourseData.courseId)}
            >
              {Loading ? (
                <Loader />
              ) : enrolled ? (
                "Already Enrolled"
              ) : (
                "Enroll Now"
              )}
            </button>
            <button
              type="button"
              hidden={!enrolled}
              className={buttonClassName}
              onClick={() => {
                navigate(
                  process.env.DFX_NETWORK === "ic"
                    ? `/student-dashboard/my-courses/course-content/${SingleCourseData.courseId}`
                    : `/student-dashboard/my-courses/course-content/${SingleCourseData.courseId}?canisterId=${process.env.CANISTER_ID_FRONTEND_CANISTER}`
                );
              }}
            >
             {t('DashboardComponents.Goto')}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default RecommededCourseCard;

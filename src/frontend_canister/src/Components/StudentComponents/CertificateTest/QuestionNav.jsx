import React from 'react'
import { FiEdit } from "react-icons/fi";
import { GoCheckCircleFill } from "react-icons/go";
import { useTranslation } from 'react-i18next';
const QuestionNav = ({ QuesDB, currentQuestion, isTestSubmitted, userResponse, totalPoints, handleSideQuesNav }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full px-2 mt-4 lg:w-5/12 xl:w-4/12 xl:px-6 lg:mt-0">
            <div className="w-full p-2 bg-white rounded-md">
                <h1 className='p-2 mb-3 text-xl font-semibold'>{t('QuestionNav.TestQuestions')}</h1>
                {
                    QuesDB.map((item, index) => (
                        <div key={index} className={`relative w-full flex items-center gap-2 py-4 p-2 border-l-4 hover:bg-[#f3f0ff] cursor-pointer ${currentQuestion === index ? "border-l-[#7B61FF]" : "border-transparent"}`} onClick={() => !isTestSubmitted && handleSideQuesNav(index)}>
                            <FiEdit size={18} />
                            <strong className='flex text-sm whitespace-nowrap'>{t('QuestionNav.Question')} {index + 1}</strong>
                            <span className="text-sm">{item.question.length > 20 ? `${item.question.slice(0, 20)}...` : item.question}</span>
                            {
                                userResponse.find(i => i.question === item.question) && <span className='text-[#7B61FF] absolute top-1/2 -translate-y-1/2 right-0'>
                                    <GoCheckCircleFill size={20} />
                                </span>
                            }
                        </div>
                    ))
                }
                <button type="button" disabled={isTestSubmitted && totalPoints >= 7 ? false : true} className={`w-full mt-4 outline-none ${isTestSubmitted && totalPoints >= 7 ? "bg-[#7B61FF]" : "bg-[#b1a1ff]"} p-2 px-3 rounded-md text-white`}>{t('QuestionNav.MintCertificate')}</button>
            </div>
        </div>
    )
}

export default QuestionNav
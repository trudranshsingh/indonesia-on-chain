import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../../Components/utils/useAuthClient';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Loader from '../../../../../Components/Loader/Loader';

const IntermediateTest = ({ courseId, id }) => {
    console.log(courseId,id,'data of course and id');
    const { contentActor } = useAuth();
    const [Loading, setLoading] = useState(false);
    const [questionsId, setQuestionsId] = useState([]);
    const [questionsData, setQuestionsData] = useState([]);
    const [isTestSubmitted, setisTestSubmitted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [securedresult, setSecuredresult] = useState(0);
    const [Result, setResult] = useState();

    useEffect(() => {
        const AddquestionId = async (questionIds) => {
            const newQuestionData = [];
            let currQues = questionIds;
            let flag = true;
            while (flag) {
                let ques = currQues[0][0];
                newQuestionData.push(ques);
                if (currQues[0][1].length > 0 && currQues[0][1] !== undefined) {
                    currQues = currQues[0][1];
                } else {
                    flag = false;
                }
            }
            setQuestionsId(newQuestionData);
        };

        const fetchCourse = async () => {
            await contentActor.getresult(id).then((data) => {
                setResult(parseInt(data));
                console.log("result", data)
            })
                .catch((err) => {
                    setResult(null)
                })
            const courseData = await contentActor.getquestionlistbytestid(id);
            await AddquestionId(courseData.questionlist);
        }
        setLoading(true);
        fetchCourse().then(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const getAllQuestions = async () => {

            console.log("---inside get all questions function---");
            console.log("Questions ID after processed", questionsId)

            try {
                const questionDataArray = [];

                for (let i = 0; i < questionsId.length - 1; i++) {
                    console.log("checking for-->", questionsId[i])
                    const questionData = await contentActor.getquestion(questionsId[i]);
                    questionDataArray.push(questionData)
                }
                setQuestionsData(questionDataArray);
            } catch (error) {
                console.log(error);
            }
            console.log("---inside get all questions function finished---");
        }

        if (questionsId.length > 0) {
            setAnswers(new Array(questionsData.length).fill(null));
            try {
                setLoading(true);
                getAllQuestions().then(() => {
                    setLoading(false);
                });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }


        }
    }, [questionsId])


    console.log("Questions ID after processed", questionsId);
    console.log("Questions Data processed", questionsData);
    const handleSubmit = async () => {
        const result = await contentActor.calculateresults(id, answers);
        await contentActor.videotracking(courseId, id)
        setisTestSubmitted(true);
        setSecuredresult(parseInt(result));
        console.log(parseInt(result));
    };
    const handleAnswerSelect = (index, value, id) => {
        const updatedAnswers = [...answers];
        const newAns = `${id},${value}`;
        updatedAnswers[index] = newAns;
        setAnswers(updatedAnswers);
    };
    const allQuestionsAnswered = answers.every(answer => answer !== null);
    return (
        <div>
            {Loading ? (
                <Loader />
            ) :
                !Result ?
                    (
                        <div className="flex flex-col w-full p-3 mt-5 md:px-14 lg:flex-row">
                            <div className="w-full pr-8 lg:w-7/12 xl:w-8/12">
                                <div className="w-full">
                                    {
                                        securedresult > 0 ? (
                                            <div>
                                                You Scored marks: {securedresult}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                </div>
                                {
                                    !Loading ? (
                                        questionsData.map((question, key) => {
                                            return (
                                                <div key={key} className='mt-4'>
                                                    <h1 className='text-lg font-semibold'>Ques No:{key + 1} {question.question}    (1 point)</h1>
                                                    <div className='flex flex-col gap-3 mt-3'>
                                                        <RadioGroup
                                                            onChange={(e) => {
                                                                handleAnswerSelect(key, e.target.value, question.questionId)
                                                            }}
                                                        >
                                                            {
                                                                <div>
                                                                    <div className='block'>
                                                                        <FormControlLabel value={question.option1} className='w-fit' control={<Radio size='small' />} label={question.option1} />
                                                                    </div>
                                                                    <div className='block'>
                                                                        <FormControlLabel value={question.option2} className='w-fit' control={<Radio size='small' />} label={question.option2} />
                                                                    </div>
                                                                    <div className='block'>
                                                                        <FormControlLabel value={question.option3} className='w-fit' control={<Radio size='small' />} label={question.option3} />
                                                                    </div>
                                                                    <div className='block'>
                                                                        <FormControlLabel value={question.option4} className='w-fit' control={<Radio size='small' />} label={question.option4} />
                                                                    </div>
                                                                </div>
                                                            }
                                                        </RadioGroup>
                                                    </div>


                                                </div>
                                            );
                                        })
                                    ) : (
                                        <Loader />
                                    )
                                }
                                {allQuestionsAnswered && (
                                    <button onClick={handleSubmit}
                                        className='outline-none bg-[#7B61FF] p-2 px-3 rounded-md text-white'
                                    >Submit</button>
                                )}

                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 text-xl font-medium font-nunitoSans'>
                            <span>You have Already submitted the test and scored: {Result} Out of 5</span>

                            <button className='bg-[#7B61FF] font-poppins rounded-lg text-white py-[13px] px-[26.5px] w-32' onClick={() => {
                                setResult(null)
                            }}>
                                Retake
                            </button>
                        </div>
                    )}
        </div>
    )
}

export default IntermediateTest
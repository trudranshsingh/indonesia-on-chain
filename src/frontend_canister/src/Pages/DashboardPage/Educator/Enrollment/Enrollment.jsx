import * as React from "react";
import EnrollData from "../../../../../assets/enroll-data.json";
import EnrolledStudent from "../../../../Components/EducatorComponents/enrollments/EnrolledStudent";
import CompletedStudent from "../../../../Components/EducatorComponents/enrollments/CompletedStudent";
import { Tab, Tabs } from "@mui/material";

const TabContent = [
    {
        id: 0,
        title: "Enrolled Students"
    }, {
        id: 1,
        title: "Completed by Students"
    }
]

const Enrollment = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    const renderStudents = () => {
        switch (activeTab) {
            case 0:
                return <EnrolledStudent data={EnrollData.students_enrolled} />
            case 1:
                return <CompletedStudent data={EnrollData.students_completed} />
            default:
                return <EnrolledStudent data={EnrollData.students_enrolled} />
        }
    }

    const handleTabs = (e, index) => {
        setActiveTab(index);
    }

    return (
        <div className="w-full p-3 md:px-14">
            <div className="w-full p-3 md:p-8 bg-white rounded-md">
                <div className="w-full border-b flex gap-4 font-medium overflow-auto">
                    {
                        // TabContent.map((item, index) => <span key={index} className={`py-2 text-sm md:text-base border-b ${activeTab === index ? "border-b-[#7B61FF] text-[#7B61FF]" : "border-transparent text-[#373638]"}  cursor-pointer`} onClick={() => setActiveTab(index)}>{item.title}</span>)
                        <Tabs value={activeTab} onChange={handleTabs} sx={{
                            fontSize: '16px',
                            textTransform: "capitalize",
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#7B61FF"
                            }
                        }}>
                            {
                                TabContent.map((item, index) =>
                                    <Tab key={index} label={item.title}
                                        sx={{
                                            textTransform: "capitalize",
                                            color: "#6E7277",
                                            "&.Mui-selected": {
                                                color: "#7B61FF"
                                            }
                                        }} />)
                            }
                        </Tabs>
                    }
                </div>
                <div className="w-full flex gap-8 flex-wrap flex-row mt-4">
                    {
                        renderStudents()
                    }
                </div>
            </div>
        </div>
    )
}

export default Enrollment;

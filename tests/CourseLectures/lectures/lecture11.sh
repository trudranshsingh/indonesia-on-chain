#!/bin/bash

set -e  # Exit immediately if any command fails

# Check for the presence of a course ID argument
if [ -z "$1" ]; then
    echo "Error: No course ID provided."
    echo "Usage: $0 <courseID>"
    exit 1
fi

courseID="$1"

# Adding a video lesson to the course
dfx canister call backend_content_canister addCourseLessons "(
  \"$courseID\",
  variant {
    Video = record {
      videoTitle = \"Session 11: Pitching Your Project\";
      videobucket = \"ioc-data\";
      videofile = \"Session 11 - Pitching Your Project - HIRES-003.mp4\";
      videodescription = \"<ul><li>Steps to take an idea to a Minimum Viable Product (MVP).</li><li>Case study: Real-world examples of blockchain MVPs.</li><li>Key Topics:<ul><li>Crafting a compelling pitch: Structure and delivery</li></ul></li><li>Must Cover:<ul><li>Communicating complex tech in simple terms</li><li>Key elements of a successful pitch deck</li><li>Handling questions and objections effectively</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# Add a test and extract the test ID
output=$(dfx canister call backend_content_canister addCourseLessons "(
  \"$courseID\",
  variant {
    Test = record {
      testTitle = \"AI Test 1\";
      coursename = \"AI Basics\"
    }
  }
)")
test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
original_test_id="test#$test_id"

echo "Extracted Test ID: $test_id"
echo "Original Test ID: $original_test_id"




dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
    option1 = \"TRUE\";
    option2 = \"UNDEFINED\";
    option3 = \"FALSE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Perseverance and Resilience: Not easily giving up; Decisiveness: Firm in making decisions; Curiosity: A strong desire to learn\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"


dfx canister call backend_content_canister addquestiontestid "(
  \"$original_test_id\",
  record {
    question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"FALSE\"
  }
)"
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
dfx canister call backend_content_canister addCourseLessons --network ic "(
  \"$courseID\",
  variant {
    Video = record {
      videoTitle = \"Session 7: AI Fundamentals and Blockchain\";
      videobucket = \"ioc-data\";
      videofile = \"Session 7 - AI Fundamentals and Blockchain.mp4\";
      videodescription = \"<ul><li>Key Topics:<ul><li>Basics of AI and machine learning</li><li>Integrating AI with blockchain technology</li><li>Potential of AI in enhancing blockchain security and efficiency</li></ul></li><li>Must Cover:<ul><li>AI use cases in blockchain: Fraud detection, smart contract optimization</li><li>Ethical considerations and challenges in AI-blockchain integration</li></ul></li></ul>\";
      videoduration = 600;
      viewcount = 100;
    }
  }
)"



# # Add a test and extract the test ID
# output=$(dfx canister call backend_content_canister addCourseLessons --network ic "(
#   \"$courseID\",
#   variant {
#     Test = record {
#       testTitle = \"AI Fundamentals and Blockchain Test\";
#       coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
#     }
#   }
# )")
# test_id=$(echo "$output" | awk -F'test#' '{print $2}' | awk '{print $1}' | tr -d ')"')
# original_test_id="test#$test_id"

# echo "Extracted Test ID: $test_id"
# echo "Original Test ID: $original_test_id"




# dfx canister call backend_content_canister addquestiontestid --network ic "(
#   \"$original_test_id\",
#   record {
#     question = \"Tidak baik memiliki prioritas dalam mengerjakan pekerjaan, karena semua pekerjaan adalah sama pentingnya.\";
#     option1 = \"TRUE\";
#     option2 = \"UNDEFINED\";
#     option3 = \"FALSE\";
#     option4 = \"NONE OF THESE\";
#     correctanswer = \"FALSE\"
#   }
# )"


# dfx canister call backend_content_canister addquestiontestid --network ic "(
#   \"$original_test_id\",
#   record {
#     question = \"Perseverance and Resilience: Not easily giving up; Decisiveness: Firm in making decisions; Curiosity: A strong desire to learn\";
#     option1 = \"UNDEFINED\";
#     option2 = \"FALSE\";
#     option3 = \"TRUE\";
#     option4 = \"NONE OF THESE\";
#     correctanswer = \"TRUE\"
#   }
# )"


# dfx canister call backend_content_canister addquestiontestid --network ic "(
#   \"$original_test_id\",
#   record {
#     question = \"Untuk mengatasi tantangan dan kegagalan yang dihadapi, maka perlu membangun tim yang kuat, menghadapi persaingan, tetap konsisten dan tidak terpengaruh akan perubahan dan ketidakpastian, serta lebih memprioritaskan pekerjaan dibandingkan kehidupan pribadi.\";
#     option1 = \"UNDEFINED\";
#     option2 = \"FALSE\";
#     option3 = \"TRUE\";
#     option4 = \"NONE OF THESE\";
#     correctanswer = \"FALSE\"
#   }
# )"
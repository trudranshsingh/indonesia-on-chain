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
      videoTitle = \"Session 3: Exploring the Internet Computer Protocol (ICP)\";
      videobucket = \"ioc-data\";
      videofile = \"Session 3 - Exploring The ICP - HIRES.mp4\";
      videodescription = \"<ul><li><strong>Key Topics:</strong><ul><li>Unique features and benefits of ICP</li><li>Comparing ICP with other blockchain technologies</li><li>ICP’s role in decentralizing the internet</li></ul></li><li><strong>Must Cover:</strong><ul><li>ICP's consensus mechanism and its advantages</li><li>Use cases specifically enabled by ICP's architecture</li></ul></li></ul>\";
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
      testTitle = \"Exploring the Internet Computer Protocol Test\";
      coursename = \"ICP Academy: A Journey through Entrepreneurship and Innovation\"
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
    question = \"Salah satu fitur utama ICP adalah sovereign network, dengan manfaatnya adalah untuk fleksibilitas dalam pengembangan dan pengelolaan aplikasi dan layanan di lingkungan blockchain.\";
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
    question = \"Non-Interactive Distributed Key Generation (NIDKG) merupakan salah satu mekanisme konsensus ICP yang bermanfaat sebagai sarana bagi pengguna untuk membagikan sandi rahasia di antara mereka tanpa harus berinteraksi satu sama lain.\";
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
    question = \"Peran ICP pada internet terdesentralisasi adalah memungkinkan pengguna untuk membuat situs web, aplikasi, dan layanan berbasis web tanpa harus terintegrasi dengan otoritas terpusat seperti Google, dll.\";
    option1 = \"UNDEFINED\";
    option2 = \"FALSE\";
    option3 = \"TRUE\";
    option4 = \"NONE OF THESE\";
    correctanswer = \"TRUE\"
  }
)"
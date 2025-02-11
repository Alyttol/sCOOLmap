const axios = require('axios');

async function getKey() {
  try {
    const response = await axios.post(
      "https://web.skola24.se/api/get/timetable/render/key",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
        },
      },
    );
    //console.log(response.data.data.key);
    return response.data.data.key;
  } catch (error) {
    console.error("Error in getKey: ", error);
    throw error;
  }
}
module.exports = { getKey };

getKey();


// async function getKey(){
//   try{
//     const response = await fetch(
//       "https://web.skola24.se/api/encrypt/signature",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
//         },
//         body: null,
//       },
//     );
//     console.log("key " + response.data.data.key)
//     return response.data.data.key;
//   }catch(error){
//     console.error("Error in getKey:", error);
//     throw error;
//   }
// }


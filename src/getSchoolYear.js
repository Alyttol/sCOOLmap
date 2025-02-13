async function getSchoolYear(hostName){
  try{
    const response = await fetch(
      "https://web.skola24.se/api/get/active/school/years",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
        },
        body: JSON.stringify({
          hostName: hostName,
          checkSchoolYearsFeatures: false,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    //console.log(data.data.activeSchoolYears[0].guid);
    return data.data.activeSchoolYears[0].guid;
  }catch(error){
    console.error("Error in getSchoolYear: ", error);
  }
}
module.exports = { getSchoolYear };
getSchoolYear("Orebro.skola24.se")
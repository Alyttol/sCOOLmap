const axios = require('axios');
const { getKey } = require('./getKey.js');
const { getSchoolYear } = require('./getSchoolYear.js');
const { getSig } = require('./getSig.js');
const { getUnitGuidFromSchool } = require('./getUnitGuidFromSkola.js');

let fs = require("fs")

// Format dates as "YYYY-MM-DD"
// var curr = new Date();
// var first = curr.getDate() - curr.getDay() + 1; // First day (Monday)
// var last = first + 4; // Last day (Friday)

// var firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
// var lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
  
// const sig = getSig("Teim22");
// const key = getKey();
// const SchoolYear = getSchoolYear("Orebro.skola24.se");
// const Guid = getUnitGuidFromSchool("Orebro", "Tullängsgymnasiet");

async function main() {
  // Format dates as "YYYY-MM-DD"
  var curr = new Date();
  var first = curr.getDate() - curr.getDay() + 1; // First day (Monday)
  var last = first + 4; // Last day (Friday)

  //var firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
  //var lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];

  // **Await the async functions**
  const sig = await getSig("Teim22");
  const key = await getKey();
  const SchoolYear = await getSchoolYear("Orebro.skola24.se");
  const Guid = await getUnitGuidFromSchool("Orebro", "Tullängsgymnasiet");

  async function getTimetable(schoolYear, kommun, signature, key, year, week, dayOfTheWeek, unitGuid) {
    try {
      const response = await fetch("https://web.skola24.se/api/render/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
        },
        body: JSON.stringify({
          renderKey: String(key),
          selection: String(signature),
          scheduleDay: dayOfTheWeek,
          week: week,
          year: year,
          host: `${kommun}.skola24.se`,
          unitGuid: unitGuid,
          schoolYear: schoolYear,
          startDate: null,
          endDate: null,
          blackAndWhite: false,
          width: 125,
          height: 550,
          selectionType: 4,
          showHeader: false,
          periodText: "",
          privateFreeTextMode: false,
          privateSelectionMode: null,
          customerKey: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      const lesson = data.data.lessonInfo || [];
      lesson.forEach((lesson, index) =>{
        console.log(`Sal: ${lesson.texts[2]} Start tid: ${lesson.timeStart} Slut tid: ${lesson.timeEnd}`)
      })
      //let str = JSON.stringify(data, null, 2);
      // fs.writeFile("jsonFile.json", str, function(error) {
        // if (error) {
          // console.log("Error");
        // } else {
          // console.log("Success");
        // }
      // })

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Call function with awaited values
  getTimetable(SchoolYear, "Orebro", sig, key, 2025, 6, 5, Guid);
}

// Run the async function
main();
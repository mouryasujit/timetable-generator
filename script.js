// document.addEventListener("DOMContentLoaded", function () {
//   // Dark Mode Toggle
//   const switchMode = document.getElementById("switch-mode");
//   switchMode.addEventListener("change", function () {
//     document.body.classList.toggle("dark");
//   });

//   // Sidebar Toggle
//   const menuBar = document.querySelector("#content nav .bx.bx-menu");
//   const sidebar = document.getElementById("sidebar");

//   menuBar.addEventListener("click", function () {
//     sidebar.classList.toggle("hide");
//   });

//   let breakAfterPeriod = 9999;
//   // Timetable Form Submission
//   document
//     .getElementById("timetable-form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault(); // Prevent form submission

//       const periods = parseInt(document.getElementById("periods").value);
//       const days = parseInt(document.getElementById("days").value);
//       const breaks = parseInt(document.getElementById("breaks").value);
//       // const breakAfterPeriod = parseInt(document.getElementById('break-after-period').value);
//       const teachersCount = parseInt(document.getElementById("teachers").value);
//       // const subjectsCount = parseInt(document.getElementById('subjects').value);
//       const batches = parseInt(document.getElementById("batches").value);

//       // Store teachers' names and subjects
//       const teachers = [];
//       for (let i = 0; i < teachersCount; i++) {
//         const teacherName = prompt(`Enter the name of teacher ${i + 1}`);
//         const subjectName = prompt(
//           `Enter the subject for teacher ${teacherName}`
//         );
//         teachers.push({ name: teacherName, subject: subjectName });
//       }

//       generateTimetable(periods, days, breaks, teachers, batches);
//     });

//   function generateTimetable(periods, days, breaks, teachers, batches) {
//     const timetableOutput = document.getElementById("timetable-output");
//     timetableOutput.innerHTML = "";

//     for (let batch = 1; batch <= batches; batch++) {
//       const batchHeading = document.createElement("h2");
//       batchHeading.textContent = `Batch ${batch}`;
//       timetableOutput.appendChild(batchHeading);

//       const table = document.createElement("table");
//       table.classList.add("timetable");
//       const thead = document.createElement("thead");
//       const tbody = document.createElement("tbody");

//       // Header row
//       const headerRow = document.createElement("tr");
//       const headerCell = document.createElement("th");
//       headerCell.textContent = "Time";
//       headerRow.appendChild(headerCell);
//       for (let day = 1; day <= days; day++) {
//         const dayHeaderCell = document.createElement("th");
//         dayHeaderCell.style.border = "2px solid black";
//         dayHeaderCell.textContent = `Day ${day}`;
//         headerRow.appendChild(dayHeaderCell);
//       }
//       thead.appendChild(headerRow);

//       // Body rows
//       for (let period = 1; period <= periods; period++) {
//         const row = document.createElement("tr");
//         const timeCell = document.createElement("td");
//         timeCell.textContent = `Period ${period}`;
//         row.appendChild(timeCell);

//         // Insert breaks if applicable
//         if (
//           breaks > 0 &&
//           period % breakAfterPeriod === 0 &&
//           period !== periods
//         ) {
//           const breakCell = document.createElement("td");
//           breakCell.textContent = `Break`;
//           row.appendChild(breakCell);
//         } else {
//           // Insert subjects and teacher names
//           for (let day = 1; day <= days; day++) {
//             const cell = document.createElement("td");
//             cell.style.border = "1px solid black";
//             const teacherIndex = Math.floor(Math.random() * teachers.length);
//             const teacher = teachers[teacherIndex];
//             cell.textContent = `${teacher.subject} (${teacher.name})`;
//             row.appendChild(cell);
//           }
//         }

//         tbody.appendChild(row);
//       }

//       table.appendChild(thead);
//       table.appendChild(tbody);

//       table.style.width = "100%";
//       timetableOutput.appendChild(table);
//       timetableOutput.style.border = "1px solid black";
//       timetableOutput.style.padding = "10px";
//     }
//   }
// });

// const logout = () => {
//   localStorage.getItem("user");
//   if (user) {
//     localStorage.removeItem("user");
//     alert("Logged out successful 👋 ");
//     window.location.replace("http://localhost:5500/login.html");
//   } else {
//     alert("Already logged out 👋 ");
//   }
// };

document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const switchMode = document.getElementById("switch-mode");
  switchMode.addEventListener("change", function () {
    document.body.classList.toggle("dark");
  });

  // Sidebar Toggle
  const menuBar = document.querySelector("#content nav .bx.bx-menu");
  const sidebar = document.getElementById("sidebar");

  menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
  });

  let breakAfterPeriod = 9999;
  // Timetable Form Submission
  document
    .getElementById("timetable-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      const periods = parseInt(document.getElementById("periods").value);
      const days = parseInt(document.getElementById("days").value);
      const breaks = parseInt(document.getElementById("breaks").value);
      const teachersCount = parseInt(document.getElementById("teachers").value);
      const batches = parseInt(document.getElementById("batches").value);

      // Store teachers' names and subjects
      const teachers = [];
      for (let i = 0; i < teachersCount; i++) {
        const teacherName = prompt(`Enter the name of teacher ${i + 1}`);
        const subjectName = prompt(
          `Enter the subject for teacher ${teacherName}`
        );
        teachers.push({
          name: teacherName,
          subject: subjectName,
          lecturesThisWeek: 0,
        });
      }

      generateTimetable(periods, days, breaks, teachers, batches);
    });

  function generateTimetable(periods, days, breaks, teachers, batches) {
    const timetableOutput = document.getElementById("timetable-output");
    timetableOutput.innerHTML = "";

    // Create an array to store teacher schedules
    const teacherSchedules = {};
    for (const teacher of teachers) {
      teacherSchedules[teacher.name] = Array(days)
        .fill(null)
        .map(() => Array(periods).fill(false));
    }

    // Track break periods across batches
    const breakPeriods = Array(days)
      .fill(null)
      .map(() => Array(periods).fill(false));

    for (let batch = 1; batch <= batches; batch++) {
      const batchHeading = document.createElement("h2");
      batchHeading.textContent = `Batch ${batch}`;
      timetableOutput.appendChild(batchHeading);

      const table = document.createElement("table");
      table.classList.add("timetable");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Header row
      const headerRow = document.createElement("tr");
      const headerCell = document.createElement("th");
      headerCell.textContent = "Time";
      headerRow.appendChild(headerCell);
      for (let day = 1; day <= days; day++) {
        const dayHeaderCell = document.createElement("th");
        dayHeaderCell.style.border = "2px solid black";
        dayHeaderCell.textContent = `Day ${day}`;
        headerRow.appendChild(dayHeaderCell);
      }
      thead.appendChild(headerRow);

      // Body rows
      for (let period = 1; period <= periods; period++) {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = `Period ${period}`;
        row.appendChild(timeCell);

        // Check if current period is a break period
        const isBreakPeriod =
          breaks > 0 && period % breakAfterPeriod === 0 && period !== periods;

        // Insert breaks
        if (isBreakPeriod) {
          // Check if more than two batches have breaks at the same time
          let count = 0;
          for (let day = 0; day < days; day++) {
            if (breakPeriods[day][period - 1]) {
              count++;
            }
          }

          // If more than two batches have breaks at this time, skip break
          if (count >= 2) {
            const breakCell = document.createElement("td");
            breakCell.textContent = `No break`;
            row.appendChild(breakCell);
          } else {
            // Mark this period as break period for all batches
            for (let day = 0; day < days; day++) {
              breakPeriods[day][period - 1] = true;
            }

            const breakCell = document.createElement("td");
            breakCell.textContent = `Break`;
            row.appendChild(breakCell);
          }
        } else {
          // Insert subjects and teacher names
          for (let day = 1; day <= days; day++) {
            const cell = document.createElement("td");
            cell.style.border = "1px solid black";

            // Find available teachers for this period and day
            const availableTeachers = teachers.filter(
              (teacher) => !teacherSchedules[teacher.name][day - 1][period - 1]
            );

            // Prioritize teachers with fewer lectures this week
            availableTeachers.sort(
              (a, b) => a.lecturesThisWeek - b.lecturesThisWeek
            );

            if (availableTeachers.length > 0) {
              const teacher = availableTeachers[0];
              teacherSchedules[teacher.name][day - 1][period - 1] = true;
              teacher.lecturesThisWeek++;
              cell.textContent = `${teacher.subject} (${teacher.name})`;
            } else {
              cell.textContent = "No available teacher";
            }
            row.appendChild(cell);
          }
        }

        tbody.appendChild(row);
      }

      table.appendChild(thead);
      table.appendChild(tbody);

      table.style.width = "100%";
      timetableOutput.appendChild(table);
      timetableOutput.style.border = "1px solid black";
      timetableOutput.style.padding = "10px";
    }
  }
});

const logout = () => {
  localStorage.getItem("user");
  if (user) {
    localStorage.removeItem("user");
    alert("Logged out successful 👋 ");
    window.location.replace("http://localhost:5500/login.html");
  } else {
    alert("Already logged out 👋 ");
  }
};

async function login() {

    const memberId = document.getElementById("memberId").value;
    const pin = document.getElementById("pin").value;

    const response = await fetch("https://script.google.com/macros/s/AKfycbwffn4YBEjFjnAnIX35E9nLckiACFs-CQdMgd2r5wRxswbNpAUBjyvaei3iwJBswiOc4A/exec");
   const apiData = await response.json();
const members = apiData.members;
const weights = apiData.weights;
const chartDates = [];
const chartWeights = [];
for (let i = 1; i < members.length; i++) {
const row = members[i];
        const sheetMemberId = String(row[0]);
        const name = row[1];
        const sheetPin = String(row[2]);
        const goalWeight = row[3];
        const goalType = row[4];

        if (sheetMemberId === memberId && sheetPin === pin) {

            let latestWeight = "No weight found";
            let latestDate = "No data";

for (let j = weights.length - 1; j >= 1; j--) {

    const weightRow = weights[j];

    if (String(weightRow[0]) === memberId) {
    latestWeight = Number(weightRow[3]).toFixed(1);
    latestDate = weightRow[1];
    break;
}
}

const remaining =
    Math.abs(Number(goalWeight) - Number(latestWeight)).toFixed(1);
    const progress = Math.round((latestWeight / goalWeight) * 100);
let weightHistory = "\n\nWeight History\n--------------";
for (let j = weights.length - 1; j >= 1; j--) {

    const weightRow = weights[j];

    if (String(weightRow[0]) === memberId) {
        chartDates.push(weightRow[1]);
chartWeights.push(weightRow[3]);

const formattedDate = weightRow[1];

weightHistory +=
    "\n" +
    formattedDate +
    " | " +
    Number(weightRow[3]).toFixed(1) + " kg";
    }
}
document.getElementById("loginContainer").style.display = "none";
document.getElementById("pageTitle").innerText = "Medley Sport Gym";
document.getElementById("result").innerHTML = `
<div class="card">
    <div class="card-title">Member</div>
    بەخێر بێیت ${name}
</div>

<div class="card">
    <div class="card-title">ئەو کێشەی دەتەوێت بگەیت پێی</div>
    ${goalWeight} kg
</div>
<div class="card">
    <div class="card-title">جۆری ئامانج</div>
    ${goalType === "Gain" ? "زیادکردنی کێش" :
  goalType === "Lose" ? "کەمکردنەوەی کێش" :
  "پاراستنی کێش"}
</div>
<div class="card">
    <div class="card-title">کێشی ئێستا</div>
    ${latestWeight} kg
</div>
<div class="card">
    <div class="card-title">دوایین نوێکردنەوە</div>
    ${latestDate}
</div>

<div class="card">
    <div class="card-title">کێشی ماوە بۆ ئامانجەکەت</div>
    ${remaining} kg
</div>

<div class="card">
    <div class="card-title">مێژووی کێش</div>
    ${weightHistory.replace(/\n/g, "<br>")}
</div>
<div class="card">
    <div class="card-title">📈 ئاماری کێش</div>
    <canvas id="weightChart"></canvas>
</div>
`;
const ctx = document.getElementById("weightChart");

new Chart(ctx, {
    type: "line",

    data: {
        labels: chartDates,

        datasets: [{
            label: "Weight (kg)",
            data: chartWeights,

            tension: 0.4,

            fill: true
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                display: false
            }
        }
    }
});
            return;
        }
    }


   document.getElementById("result").innerHTML = `

<div class="error-card">
    <div class="error-title">
        ❌ هەڵە لە زانیاری چوونەژوورەوە
    </div>

    <div class="error-text">
       incorrect Member ID or PIN.
        تکایە دووبارە هەوڵ بدەرەوە.
    </div>
</div>
`;
}

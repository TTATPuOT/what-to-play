const date = new Date();
date.setMonth(1);
date.setDate(1);

const currentYear = date.getFullYear();
const currentYearTimestamp = Math.round(date.getTime() / 1000);

date.setFullYear(currentYear - 2);
const year2 = date.getFullYear();
const year2Timestamp = Math.round(date.getTime() / 1000);

date.setFullYear(currentYear - 3);
const year3 = date.getFullYear();
const year3Timestamp = Math.round(date.getTime() / 1000);

date.setFullYear(currentYear - 5);
const year5 = date.getFullYear();
const year5Timestamp = Math.round(date.getTime() / 1000);

date.setFullYear(currentYear - 10);
const year10 = date.getFullYear();
const year10Timestamp = Math.round(date.getTime() / 1000);

date.setFullYear(currentYear - 20);
const year20 = date.getFullYear();
const year20Timestamp = Math.round(date.getTime() / 1000);

export default [
    { id: currentYearTimestamp, name: "This year", text: currentYear },
    { id: year2Timestamp, name: "2 years ago", text: year2 },
    { id: year3Timestamp, name: "3 years ago", text: year3 },
    { id: year5Timestamp, name: "5 years ago", text: year5 },
    { id: year10Timestamp, name: "10 years ago", text: year10 },
    { id: year20Timestamp, name: "20 years  ago", text: year20 },
];

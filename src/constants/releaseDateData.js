const date = new Date();
const currentYear = date.getFullYear();

date.setFullYear(currentYear - 2);
const year2 = date.getFullYear();

date.setFullYear(currentYear - 3);
const year3 = date.getFullYear();

date.setFullYear(currentYear - 5);
const year5 = date.getFullYear();

date.setFullYear(currentYear - 10);
const year10 = date.getFullYear();

date.setFullYear(currentYear - 20);
const year20 = date.getFullYear();

export default [
    { id: 1, name: "This year", text: currentYear },
    { id: 2, name: "2 years ago", text: year2 },
    { id: 3, name: "3 years ago", text: year3 },
    { id: 5, name: "5 years ago", text: year5 },
    { id: 10, name: "10 years ago", text: year10 },
    { id: 10, name: "20 years  ago", text: year20 },
];

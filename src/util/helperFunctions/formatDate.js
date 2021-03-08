// format Date
module.exports = (d) => {
    // formats the date to follow the December 10, 2020 format
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date(d).toISOString();
    const newDate = date.split("T")[0];
    const arr = newDate.split("-");
    const dateString = `${month[new Date(date).getMonth()]} ${arr[2]}, ${arr[0]}`;
    return dateString;
};

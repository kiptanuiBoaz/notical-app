export const getCurrentDate = () => {
    const currentDate = new Date();

    // Get day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();

    // Format the date
    const formattedDate = `${padZero(day)} ${month} ${year}`;

    return formattedDate;
}

// Helper function to pad a single digit with a leading zero
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}
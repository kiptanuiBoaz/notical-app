
export const formatDate = (dateString) => {
    const date = new Date(dateString * 1000)
    return date.toLocaleString();
};




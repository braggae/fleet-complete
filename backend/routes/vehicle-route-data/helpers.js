function calculateEndDate(startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    return endDate.toISOString().split('T')[0];
}

module.exports = {
    calculateEndDate,
}

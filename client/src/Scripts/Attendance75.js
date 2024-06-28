const daysTo75 = (current, total) => {
    const x = Math.ceil((3*total - 4*current)/8)
    return x
}


const holidays = {
	// "2024-07-17": true,
	// Add more holidays here in the format 'YYYY-MM-DD': true
};

function addDaysExcludingWeekendsAndHolidays(days) {
	let currentDate = new Date();
	while (days > 0) {
		currentDate.setDate(currentDate.getDate() + 1);
		const dateString = currentDate.toISOString().split("T")[0]; // Converts date to 'YYYY-MM-DD' format
		// If the day is Saturday (6), Sunday (0), or a holiday, don't count it
		if (
			currentDate.getDay() !== 0 &&
			currentDate.getDay() !== 6 &&
			!holidays[dateString]
		) {
			days--;
		}
	}
	return currentDate;
}

function formatDate(date) {
	const monthNames = [
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
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return `${day} ${monthNames[monthIndex]} ${year}`;
}

const days = daysTo75(227, 346)

const finalDate = formatDate(addDaysExcludingWeekendsAndHolidays(days))

console.log(finalDate);
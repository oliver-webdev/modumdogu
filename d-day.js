document.getElementById('calculate-btn').addEventListener('click', function() {
    const inputDate = document.getElementById('date-input').value;
    const resultMessage = document.getElementById('result-message');
    const dynamicCountdown = document.getElementById('dynamic-countdown');
    
    // Clear previous countdown
    clearInterval(window.countdownInterval);

    // Check if input date is provided
    if (!inputDate) {
        resultMessage.textContent = "Please select a future date.";
        dynamicCountdown.textContent = ""; // Clear the dynamic countdown
        return;
    }
    
    const today = new Date(); // Current time in local timezone
    const todayKST = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    
    // Convert the selected input date and set the time to midnight in KST
    const selectedDate = new Date(inputDate);
    const selectedDateKST = new Date(selectedDate.setHours(0, 0, 0, 0)); // Set to midnight

    // Compare the selected date in KST to today in KST
    if (selectedDateKST.getTime() === todayKST.setHours(0, 0, 0, 0)) {
        resultMessage.textContent = "D-Day has arrived!";
        dynamicCountdown.textContent = ""; // Clear the dynamic countdown
        return;
    } else if (selectedDateKST < todayKST) {
        resultMessage.textContent = "The selected date is in the past. Please choose a future date.";
        dynamicCountdown.textContent = ""; // Clear the dynamic countdown
        return;
    }
    
    // Calculate the difference in time and convert it to days
    const timeDiff = selectedDateKST - todayKST;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    
    resultMessage.textContent = `D-Day is ${daysLeft} days away.`;
    
    // Start updating the dynamic countdown
    updateDynamicCountdown(selectedDateKST);
});

// Function to update the dynamic countdown every second
function updateDynamicCountdown(selectedDateKST) {
    const dynamicCountdown = document.getElementById('dynamic-countdown');
    
    window.countdownInterval = setInterval(function() {
        const now = new Date(); // Get current time in local timezone
        const nowKST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
        const timeDiff = selectedDateKST - nowKST;

        if (timeDiff <= 0) {
            dynamicCountdown.textContent = "D-Day has arrived!";
            clearInterval(window.countdownInterval); // Stop the countdown
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        dynamicCountdown.textContent = `${days} Days, ${hours} Hours, ${minutes} Minutes, and ${seconds} Seconds remaining.`;
    }, 1000); // Update every second
}

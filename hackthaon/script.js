document.getElementById('genBtn').addEventListener('click', generateOTP);

function generateOTP() {
    const display = document.getElementById('otpText');
    const status = document.getElementById('logicStatus');
    const btn = document.getElementById('genBtn');

    // Disable button during animation
    btn.disabled = true;
    btn.innerText = "CALCULATING...";

    // 1. Core Logic: Proportionality Principle
    // We generate 5 random digits. 
    // The 6th digit (Check-Digit) ensures the total sum follows the 
    // Vedic "Navasesh" (Mod 9) balance.
    let base = Math.floor(10000 + Math.random() * 90000);
    let digits = base.toString().split('').map(Number);
    let currentSum = digits.reduce((a, b) => a + b, 0);
    
    // Anurūpye Śūnyamanyat: Making the "other" (remainder) zero in mod 9
    let checkDigit = (9 - (currentSum % 9)) % 9;
    let finalOTP = base.toString() + checkDigit.toString();

    // 2. Techy Animation
    let iterations = 0;
    const interval = setInterval(() => {
        // Show random numbers while "calculating"
        display.innerText = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
        
        iterations++;
        if (iterations > 15) {
            clearInterval(interval);
            
            // Set final validated OTP
            display.innerText = finalOTP;
            status.innerHTML = "Sutra Balance Achieved. Token Secure.";
            status.style.color = "#00f2ff";
            
            btn.disabled = false;
            btn.innerText = "Generate Secure Token";
        }
    }, 60);
}
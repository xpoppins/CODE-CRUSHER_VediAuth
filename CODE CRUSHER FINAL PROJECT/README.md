Team Name- CODE-CRUSHER
Project Name- VediAuth
Problem Statement 23: Fast OTP/Check-Digit Generator
Track 7: Cybersecurity & Blockchain
Team Member-
Sumit Kumar (Project Manager)
Sonam Yadav (UI UX designer)
Aquib Ahmad Siddiqui (Developer)
Jay Anshul (Developer)



# VediAuth - Stateless Vedic Authentication

VediAuth is a high-speed, zero-database OTP (One-Time Password) generator and verifier built for modern cybersecurity applications. It leverages the ancient Vedic mathematics sutra **Anurūpye Śūnyamanyat** (Proportionality) to achieve 100% stateless authentication.

## 🚀 The USP: Stateless Security

Traditional OTP systems require storing the generated code in a database or cache (like Redis) along with an expiration time. This introduces state, requires database lookups, and creates potential attack vectors.

**VediAuth eliminates the database entirely.**

### How it works:
1. **Generation:** When a user requests an OTP, the server captures the exact `timestamp`. It divides this timestamp by a highly secure, secret prime number (e.g., `982451653`). The fractional remainder of this division is extracted, and the first 6 digits become the OTP. The server sends the `OTP` (to the user's device) and the `timestamp` (to the client application).
2. **Verification:** The client submits the `OTP` they received and the `timestamp`. The server first checks if `Date.now() - timestamp` is within the allowed window (e.g., 5 minutes) to prevent replay attacks. If valid, the server *recalculates* the OTP using the exact same Vedic proportionality logic on the provided `timestamp`.
3. **Validation:** If the recalculated OTP matches the user's input, authentication is successful. 

**Zero storage. Pure math. Infinite scalability.**

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** React, Tailwind CSS, Framer Motion
- **Architecture:** Client-Side SPA with Express API (Vite Middleware)
our secret used in project 982451653 // secret key 

## 🎨 UI/UX Design
The interface is designed for a high-end cybersecurity startup, featuring a dark mode theme with deep slate backgrounds, neon cyber-blue/emerald accents, and glassmorphism cards.
 
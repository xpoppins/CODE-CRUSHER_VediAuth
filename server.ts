import express from "express";
import { createServer as createViteServer } from "vite";

const SECRET_PRIME = 982451653;

function generateVedicOTP(timestamp: number): string {
  const fraction = (timestamp / SECRET_PRIME) % 1;
  return Math.floor(fraction * 1000000).toString().padStart(6, '0');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/generate-otp", (req, res) => {
    const timestamp = Date.now();
    const otp = generateVedicOTP(timestamp);
    res.json({ otp, timestamp });
  });

  app.post("/api/verify-otp", (req, res) => {
    const { userOtp, timestamp } = req.body;
    
    if (!userOtp || !timestamp) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    const now = Date.now();
    if (now - timestamp > 300000) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const expectedOtp = generateVedicOTP(timestamp);
    
    if (expectedOtp === userOtp) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export const mail = (otp: string) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verify Your OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 10px;
        }
        .navbar {
            background-color: #1c1917;
            padding: 15px;
            text-align: center;
            border-radius: 5px;
        }
        .navbar-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .logo {
            max-width: 40px;
        }
        .site-name {
            color: #fff;
            font-size: 1.875rem; 
            font-weight: 800;
            letter-spacing: -0.025em;
            margin: 0;
        }
        .container {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin: 20px auto;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            background: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="navbar">
        <div class="navbar-content">
            <img src="https://lastminprep.vercel.app/logo.svg" alt="LastMinPrep Logo" class="logo">
            <h1 class="site-name">LastMinPrep</h1>
        </div>
    </div>
    <div class="container">
        <h2>Verify Your OTP</h2>
        <p>Your One-Time Password (OTP) for LastMinPrep login is:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <div class="footer">Best regards,<br>LastMinPrep Team</div>
    </div>
</body>
</html>`;

export const mailText = (otp: string) => `LastMinPrep - Verify Your OTP

Your One-Time Password (OTP) for LastMinPrep login is: ${otp}

This OTP is valid for the next 10 minutes. Please do not share it with anyone.

If you didn't request this, please ignore this email.

Best regards,  
LastMinPrep Team
`;

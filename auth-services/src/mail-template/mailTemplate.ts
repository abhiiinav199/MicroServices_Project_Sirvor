
export const sendMailTemplate= (OTP:number) =>{
  return `<body>
  <div class="email-container">

    <!-- Header -->
    <div class="header">
      <h1 class="logo">Servor</h1>
      <p style="margin: 8px 0 0; font-size: 14px;">
        Secure. Simple. Reliable.
      </p>
    </div>

    <!-- Email Content -->
    <div class="content">
      <h2 style="margin-top: 0; font-size: 23px;">
        Verify Your Email Address
      </h2>

      <p>Hello,</p>

      <p>
        Thank you for choosing <strong>Servor</strong>!
        To complete your email verification, please use the
        One-Time Password (OTP) provided below.
      </p>

      <!-- Single OTP Field -->
      <div class="otp-box">
        <p style="margin: 0 0 10px; font-size: 14px; color: #4b5563;">
          Your verification code
        </p>

        <p class="otp-code">${OTP}</p>
      </div>

      <p class="expiry">
        ⏱ This OTP expires in <strong>5 minutes</strong>.
      </p>

      <p>
        Enter this code on the Servor verification page to
        verify your email address.
      </p>

      <p>
        <strong>Security notice:</strong> Never share this code
        with anyone. Servor will never ask you to disclose your
        OTP over a call or message.
      </p>

      <p>
        If you did not request this verification code, you can
        safely ignore this email.
      </p>

      <p style="margin-top: 28px;">
        Best regards,<br />
        <strong>Abhinav Meshram</strong><br />
        Founder, Servor
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 8px;">
        Need help? Contact our support team:
        <br />
        <a href="mailto:meshram.abhinav1998@gmail.com">
          meshram.abhinav1998@gmail.com
        </a>
      </p>

      <p style="margin: 12px 0 0;">
        &copy; Servor. All rights reserved.
      </p>
    </div>

  </div>
</body>`
}
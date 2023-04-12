const welcomeCustomer = `Dear {{customer_name}},

We are thrilled to welcome you to {{company_name}}! Your account has been successfully created and we are excited to have you as a part of our community.

With your new account, you now have access to all of the features and benefits that {{company_name}} has to offer. This includes the ability to book room.

If you have any questions about your account or need any assistance, please don't hesitate to reach out to our customer support team. They are available email contact: scroll0509@gmail.com.

Thank you for choosing {{company_name}} and we look forward to helping you booking room!

Best regards,
{{your_name}}
{{company_name}}`;

const otpCustomer = `Dear {{customer_name}},

Mã OTP của bạn là: {{customer_otp}}
Mã này chỉ có hiệu lực trong vòng 10 phút.

Best regards,
{{your_name}}
{{company_name}}`;

module.exports = {
    welcomeCustomer,
    otpCustomer,
};

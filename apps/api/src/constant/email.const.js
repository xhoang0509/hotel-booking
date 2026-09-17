const welcomeCustomer = `Dear {{customer_name}},

We are thrilled to welcome you to {{company_name}}! Your account has been successfully created and we are excited to have you as a part of our community.

With your new account, you now have access to all of the features and benefits that {{company_name}} has to offer. This includes the ability to book room.

If you have any questions about your account or need any assistance, please don't hesitate to reach out to our customer support team. They are available email contact: info@datphong.com.

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

const resetPassowrdTemplate = `Dear {{customer_name}},

Truy cập vào đây để thay đổi mật khẩu quả bạn {{reset_url}}
Đường dẫn này chỉ có hiệu lực trong vòng 15 phút.

Best regards,
{{company_name}}`;

const bookingSuccessTemplate = `
Kính gửi quý khách hàng,

Chúng tôi xin gửi đến quý khách hàng lời chào trân trọng và cảm ơn quý khách hàng đã lựa chọn Datphong.com là địa chỉ để đặt phòng cho chuyến đi sắp tới.

Chúng tôi xin thông báo rằng quý khách hàng đã đặt thành công phòng tại Datphong.com với thông tin chi tiết như sau:

Ngày check-in: {{check_in_date}}
Ngày check-out: {{check_out_date}}
Số tiền thanh toán: {{price}}
Quý khách hàng vui lòng giữ lại thông tin này để tiện cho việc check-in tại khách sạn. Nếu quý khách hàng có bất kỳ thắc mắc hay yêu cầu hỗ trợ nào, xin vui lòng liên hệ với chúng tôi qua địa chỉ email info@datphong.com hoặc số điện thoại 1800 1234.

Chúng tôi rất mong được đón tiếp quý khách hàng tại Datphong.com và mong muốn rằng quý khách sẽ có một trải nghiệm nghỉ dưỡng tuyệt vời tại khách sạn.

Trân trọng,
Datphong.com.
`;

module.exports = {
    welcomeCustomer,
    otpCustomer,
    resetPassowrdTemplate,
    bookingSuccessTemplate,
};

export const MOCK_RESULT = {
  score: 75,
  summary: "Hợp đồng này có rủi ro pháp lý ở mức trung bình. Cần chú ý kỹ các điều khoản về thanh toán và bồi thường thiệt hại trước khi ký kết.",
  risks: [
    {
      id: "1",
      level: "high", // high | medium | low
      title: "Phạt vi phạm không rõ ràng",
      content: "Điều 5.2 không quy định mức trần phạt (thường là 8% theo luật TM).",
    },
    {
      id: "2",
      level: "medium",
      title: "Thời hạn thanh toán bất lợi",
      content: "Bên B được phép chậm thanh toán 45 ngày là quá dài.",
    },
    {
      id: "3",
      level: "low",
      title: "Thiếu điều khoản Bất khả kháng",
      content: "Chưa quy định rõ về thiên tai, dịch bệnh.",
    },
  ],
};
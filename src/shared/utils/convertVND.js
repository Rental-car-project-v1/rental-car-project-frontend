export default function convertVND(number) {
  console.log(number);
    return Number(number).toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
}
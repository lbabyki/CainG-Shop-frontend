import axios from "axios";
import { APP_API_URL } from "../../assets/config/API";

let banners = [];

async function fetchProducts() {
  try {
    const res = await axios.get(`${APP_API_URL}/api/products`);
    banners = res.data.slice(0, 5); // Lấy 5 sản phẩm đầu tiên
  } catch (err) {
    console.error("Lỗi khi fetch sản phẩm:", err);
  }
}

await fetchProducts();

export { banners };

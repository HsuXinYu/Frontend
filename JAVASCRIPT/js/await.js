async function fetchProduct() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    );
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

fetchProduct();

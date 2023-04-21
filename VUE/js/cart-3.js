const app = Vue.createApp({
  //Create Options Object
  data() {
    //: function
    return {
      product: "Socks",
      image: "images/socks_blue.jpg",
      inventory: 0,
      details: ["50% cotton", "30% woll", "20% polyester"],
      sizes: ["S", "M", "L", "XL"],
      variants: [
        { id: 2234, color: "green" },
        { id: 2235, color: "blue" },
      ],
    };
  },
});

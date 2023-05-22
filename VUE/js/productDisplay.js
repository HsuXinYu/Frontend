app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <!-- v-bind:src, let Html attributes bind with Vue-->
            <img :src="image" />
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>

            <!-- v-else is not necessary, "v-show" like toggle -->
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{shipping}}</p>

            <ul>
            <!-- for loop, detail is alias, details is collection-->
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            
            <!-- v-on:mouseover, set Html event-->
            <div
                class="color-circle"
                v-for="(variant,index) in variants"
                :key="variant.id"
                :style="{ backgroundColor:variant.color }"
                @mouseover="updateVariant(index)"
            ></div>
            
            <!-- :class="{ active(class name):activeClass }" || class="[isActive? activeClass :" "]" -->
            <button
                class="button"
                :class="{ disabledButton:!inStock }"
                :disabled="!inStock"
                @click="addToCart">
                Add to Cart
            </button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["50% cotton", "30% woll", "20% polyester"],
      variants: [
        {
          id: 2235,
          color: "green",
          image: "./images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2234,
          color: "blue",
          image: "./images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      console.log(this.variants[this.selectedVariant].id);
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});

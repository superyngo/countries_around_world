const app = Vue.createApp({
  data() {
    return { map: null };
  },
  methods: {
    fetchData() {
      return fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,flag,latlng"
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error(error);
          alert("something wrong!!");
        });
    },
    loadMap() {
      this.map = L.map("map").setView([25.03, 121.52], 4);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
      this.map.on("click", this.onMapClick);
    },
    //non-required,just to show this feature
    onMapClick(e) {
      let popup = L.popup();
      popup
        .setLatLng(e.latlng)
        .setContent("經緯度：" + e.latlng.toString())
        .openOn(this.map);
    },
    async pingMarker() {
      countries = await this.fetchData();

      countries.forEach((country, i) => {
        // let marker = [];
        let marker = L.marker(country.latlng).addTo(this.map);

        // get the currency symbols
        let currencyObject = [...Object.values(country.currencies)];
        let currency = currencyObject
          .map((currency) => currency.name + "[" + currency.symbol + "]")
          .join(",");

        // bind marker to Popup info to open
        marker
          .bindPopup(
            `
            <img class="flag" src=${country.flags.svg} }"/></br>
            Name:${country.name.official}</br>
            Capital:${country.capital ? country.capital : "unknown"}</br>
            Currency:${currency}
          `
          )
          .openPopup();
      });

      //set map view
      this.map.setView([25.03, 121.52], 4);
    },
  },
  mounted() {
    this.loadMap();
    this.pingMarker();
  },
  watch: {},
  render() {},
});
app.mount("#app");

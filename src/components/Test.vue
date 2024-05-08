<template>
  <div>
    <br /><br /><br />
    <form>
      <div class="col-sm-6">
        <h3>Address Selector - Philippines</h3>
      </div>
      <hr />
      <!-- Region  -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Region *</label>
        <select
          name="region"
          class="form-control form-control-md"
          id="region"
          v-model="selectedRegion"
          @change="fillProvinces"
        >
          <option
            v-for="region in regions"
            :key="region.region_code"
            :value="region.region_code"
          >
            {{ region.region_name }}
          </option>
        </select>
      </div>

      <!-- Province  -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Province *</label>
        <select
          v-model="selectedProvince"
          @change="fillCities"
          class="form-control form-control-md"
        >
          <option
            v-for="province in provinces"
            :key="province.province_code"
            :value="province.province_code"
          >
            {{ province.province_name }}
          </option>
        </select>
      </div>

      <!-- City  -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">City *</label>
        <select
          v-model="selectedCity"
          @change="fillBarangays"
          class="form-control form-control-md"
        >
          <option
            v-for="city in cities"
            :key="city.city_code"
            :value="city.city_code"
          >
            {{ city.city_name }}
          </option>
        </select>
      </div>

      <!-- Barangay  -->
      <div class="col-sm-6 mb-3">
        <label class="form-label">Barangay *</label>
        <select v-model="barangay" class="form-control form-control-md">
          <option
            v-for="barangay in barangays"
            :key="barangay.brgy_code"
            :value="barangay.brgy_name"
          >
            {{ barangay.brgy_name }}
          </option>
        </select>
      </div>

      <div class="col-md-6">
        <input type="submit" class="btn btn-success" name="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import { getAllCategoriesQuery, createCategoryMutation } from "../graphql";
import provinceData from "/province.json"; // Import province.json file
import regionData from "/region.json";
import cityData from "/city.json";
import barangayData from "/barangay.json";
export default {
  data() {
    return {
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
      selectedRegion: "",
      selectedProvince: "",
      selectedCity: "",
      selectedBarangay: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
    };
  },

  watch: {
    selectedBarangay(newVal) {
      const selectedBarangayData = barangayData.find(
        (barangay) => barangay.brgy_code === newVal
      );
      console.log("Selected Barangay: ", selectedBarangayData.brgy_name);
      console.log("Selected Barangay:2", this.barangay);
    },
  },
  methods: {
    fetchRegions() {
      // Fetch regions data (you can implement this based on your actual data source)
      // For now, I'll just hardcode some example data
      this.regions = this.regions = regionData;
    },
    fillProvinces() {
      // Method to fill provinces dropdown based on selected region
      this.provinces = provinceData.filter(
        (province) => province.region_code === this.selectedRegion
      );
      const selectedRegionData = regionData.find(
        (region) => region.region_code === this.selectedRegion
      );
      this.region = selectedRegionData.region_name;
    },
    fillCities() {
      // Method to fill cities dropdown based on selected province
      this.cities = cityData.filter(
        (city) => city.province_code === this.selectedProvince
      );
      // Store the actual province name
      const selectedProvinceData = provinceData.find(
        (province) => province.province_code === this.selectedProvince
      );
      this.province = selectedProvinceData.province_name;
      console.log("Province: ", this.province);
    },
    fillBarangays() {
      // Method to fill barangays dropdown based on selected city
      // You can implement this based on your actual data source
      this.barangays = barangayData.filter(
        (barangay) => barangay.city_code === this.selectedCity
      );
      // Store the actual city name
      const selectedCityData = cityData.find(
        (city) => city.city_code === this.selectedCity
      );
      this.city = selectedCityData.city_name;
      console.log("City: ", this.city);

      console.log("Barangayy: ", this.barangay);
    },
  },
  created() {
    this.fetchRegions(); // Fetch categories when component is created
  },
};
</script>

<style scoped>
/* Add your custom styling here */
</style>

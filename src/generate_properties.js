const fs = require("fs");

const cities = [
  "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida", "Mumbai", "Pune", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh", "Surat", "Nagpur"
];

const tagsPool = [
  "Affordable", "New Construction", "Budget", "Govt Scheme", "Luxury", "Near Metro", "Ready to Move", "Furnished",
  "Park Facing", "Smart Home", "Gated Society", "High ROI", "Near School", "Near Hospital", "Swimming Pool",
  "Gym", "Clubhouse", "Open Green Space", "Kids Play Area", "24x7 Security", "Power Backup", "Corner Flat",
  "Low Maintenance", "Premium Location", "Vaastu Compliant", "Pet Friendly", "EV Charging", "Terrace Access",
  "Private Garden", "Eco-Friendly"
];

const propertyTypes = ["Apartment", "Studio", "Flat", "Villa"];
const bedroomsOptions = ["1BHK", "2BHK", "3BHK", "4BHK", "1RK"]; // You can customize

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomTags = () => [...new Set(Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => getRandom(tagsPool)))];

const properties = [];

for (let i = 1; i <= 10000; i++) {
  const city = getRandom(cities);
  const propType = getRandom(propertyTypes);
  const bedrooms = getRandom(bedroomsOptions);
  const price = Math.floor(Math.random() * 3000000) + 1000000; // price between 10L to 40L approx
  const tags = getRandomTags();
  const imageIndex = (i % 10) + 1;

  properties.push({
    id: i.toString(),
    title: `${bedrooms} ${propType} in ${city}`,
    city,
    price,
    image: `/images/property${imageIndex}.jpg`,
    tags
  });
}

fs.writeFileSync("src/data/properties.json", JSON.stringify(properties, null, 2));
console.log("✅ properties.json generated successfully!");
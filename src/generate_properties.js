// const fs = require("fs");

// const cities = [
//   "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida", "Mumbai", "Pune", "Bangalore", "Hyderabad",
//   "Chennai", "Kolkata", "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh", "Surat", "Nagpur"
// ];

// const tagsPool = [
//   "Affordable", "New Construction", "Budget", "Govt Scheme", "Luxury", "Near Metro", "Ready to Move", "Furnished",
//   "Park Facing", "Smart Home", "Gated Society", "High ROI", "Near School", "Near Hospital", "Swimming Pool",
//   "Gym", "Clubhouse", "Open Green Space", "Kids Play Area", "24x7 Security", "Power Backup", "Corner Flat",
//   "Low Maintenance", "Premium Location", "Vaastu Compliant", "Pet Friendly", "EV Charging", "Terrace Access",
//   "Private Garden", "Eco-Friendly"
// ];

// const propertyTypes = ["Apartment", "Villa", "Studio", "Penthouse", "Row House", "Farmhouse", "Serviced Apartment"];
// const furnishingStatus = ["Furnished", "Semi-Furnished", "Unfurnished"];
// const availabilityStatus = ["Ready to Move", "Under Construction"];

// const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
// const getRandomTags = () => [...new Set(Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => getRandom(tagsPool)))];

// const properties = [];

// for (let i = 1; i <= 100; i++) {
//   const city = getRandom(cities);
//   const propType = getRandom(propertyTypes);
//   const bedrooms = Math.floor(Math.random() * 5) + 1;
//   const bathrooms = Math.floor(Math.random() * bedrooms) + 1;
//   const area = Math.floor(Math.random() * 5500) + 500;
//   const price = area * (Math.floor(Math.random() * 5000) + 2000);
//   const tags = getRandomTags();
//   const yearBuilt = Math.floor(Math.random() * 20) + 2005;
//   const imageIndex = (i % 10) + 1;

//   properties.push({
//     id: i.toString(),
//     title: `${bedrooms}BHK ${propType} in ${city}`,
//     city,
//     price,
//     area_sqft: area,
//     bedrooms,
//     bathrooms,
//     furnishing: getRandom(furnishingStatus),
//     property_type: propType,
//     availability: getRandom(availabilityStatus),
//     year_built: yearBuilt,
//     rating: +(Math.random() * 2.5 + 2.5).toFixed(1),
//     image: `/images/property${imageIndex}.jpg`,
//     tags
//   });
// }

// fs.writeFileSync("src/data/properties.json", JSON.stringify(properties, null, 2));
// console.log("✅ properties.json with diverse data generated successfully!");
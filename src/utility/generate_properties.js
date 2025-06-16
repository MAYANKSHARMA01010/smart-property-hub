import { faker } from '@faker-js/faker';
import fs from 'fs';

const cities = [
  "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida", "Mumbai", "Pune", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh", "Surat", "Nagpur"
];

const featuresPool = [
  "Affordable", "New Construction", "Budget", "Govt Scheme", "Luxury", "Near Metro", "Ready to Move", "Furnished",
  "Park Facing", "Smart Home", "Gated Society", "High ROI", "Near School", "Near Hospital", "Swimming Pool",
  "Gym", "Clubhouse", "Open Green Space", "Kids Play Area", "24x7 Security", "Power Backup", "Corner Flat",
  "Low Maintenance", "Premium Location", "Vaastu Compliant", "Pet Friendly", "EV Charging", "Terrace Access",
  "Private Garden", "Eco-Friendly", "Parking", "Garden", "Balcony", "Fireplace", "Air Conditioning", "Heating",
  "Security System", "Elevator", "Laundry Room", "Storage", "Terrace", "Garage", "Walk-in Closet"
];

const propertyTypes = ["Apartment", "Studio", "Flat", "Villa", "House", "Condo", "Townhouse", "Ranch"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomFeatures = (min = 6, max = 12) =>
  [...new Set(faker.helpers.arrayElements(featuresPool, { min, max }))];

function generateMergedProperty(index = 0) {
  const city = getRandom(cities);
  const propType = getRandom(propertyTypes);
  const bedrooms = faker.number.int({ min: 1, max: 5 });
  const bathrooms = faker.number.int({ min: 1, max: 4 });
  const sizeSqFt = faker.number.int({ min: 500, max: 10000 });
  const price = faker.number.int({ min: 1000000, max: 500000000 });
  const features = getRandomFeatures();

  const mainImage = faker.image.url({ width: 800, height: 600 });
  const additionalImages = Array.from({ length: faker.number.int({ min: 3, max: 7 }) }, () =>
    faker.image.url({ width: 800, height: 600 })
  );

  return {
    id: faker.string.uuid(),
    title: `${bedrooms} ${propType} in ${city}`,
    description: `Beautiful ${propType.toLowerCase()} in ${city} with ${bedrooms} bedrooms, ${bathrooms} bathrooms, and ${sizeSqFt} sqft area.`,
    propertyType: propType,
    price,
    city,
    address: faker.location.streetAddress({ useFullAddress: true }),
    location: {
      address: faker.location.streetAddress(),
      city,
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      country: "India"
    },
    bedrooms,
    bathrooms,
    sizeSqFt,
    amenities: features,
    status: "Available",
    image: mainImage,
    images: additionalImages,
    listedDate: faker.date.past({ years: 1 }).toISOString(),
    agent: {
      name: faker.person.fullName(),
      phone: faker.phone.number('+91-9#########'),
      email: faker.internet.email()
    }
  };
}

function generateMultipleProperties(count = 10000) {
  const properties = [];
  for (let i = 0; i < count; i++) {
    properties.push(generateMergedProperty(i));
  }
  return properties;
}

const properties = generateMultipleProperties(10000);
console.log(`Generated ${properties.length} properties`);
fs.writeFileSync('properties.json', JSON.stringify(properties, null, 2), 'utf-8');
console.log('✅ properties.json has been saved successfully!');
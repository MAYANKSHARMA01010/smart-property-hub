import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import { faker } from '@faker-js/faker';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const CITIES = [
  "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida", "Mumbai", "Pune", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh", "Surat", "Nagpur"
];

const FEATURES = [
  "Affordable", "New Construction", "Budget", "Govt Scheme", "Luxury", "Near Metro", "Ready to Move", "Furnished",
  "Park Facing", "Smart Home", "Gated Society", "High ROI", "Near School", "Near Hospital", "Swimming Pool",
  "Gym", "Clubhouse", "Open Green Space", "Kids Play Area", "24x7 Security", "Power Backup", "Corner Flat",
  "Low Maintenance", "Premium Location", "Vaastu Compliant", "Pet Friendly", "EV Charging", "Terrace Access",
  "Private Garden", "Eco-Friendly", "Parking", "Garden", "Balcony", "Fireplace", "Air Conditioning", "Heating",
  "Security System", "Elevator", "Laundry Room", "Storage", "Terrace", "Garage", "Walk-in Closet"
];

const PROPERTY_TYPES = ["Apartment", "Studio", "Flat", "Villa", "House", "Condo", "Townhouse", "Ranch"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomFeatures = (min = 6, max = 12) => [...new Set(faker.helpers.arrayElements(FEATURES, { min, max }))];

const fetchApartmentImages = async () => {
  const perPage = 80;
  let allImages = [];

  for (let page = 1; page <= 3; page++) {
    const url = `https://api.pexels.com/v1/search?query=apartment&per_page=${perPage}&page=${page}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: PEXELS_API_KEY }
      });

      const pageImages = response.data.photos.map(p => p.src.large);
      allImages = allImages.concat(pageImages);
    } catch (err) {
      console.error(`Error fetching Pexels images (page ${page}):`, err.message);
    }
  }

  console.log(`📸 Total Pexels Images Fetched: ${allImages.length}`);
  return allImages;
};

const generateProperties = async (count = 10000) => {
  const apartmentImages = await fetchApartmentImages();
  if (!apartmentImages.length) return console.error("No images fetched!");

  const properties = [];

  for (let i = 0; i < count; i++) {
    const city = getRandom(CITIES);
    const propType = getRandom(PROPERTY_TYPES);
    const bedrooms = faker.number.int({ min: 1, max: 5 });
    const bathrooms = faker.number.int({ min: 1, max: 4 });
    const sizeSqFt = faker.number.int({ min: 500, max: 10000 });
    const price = faker.number.int({ min: 1000000, max: 500000000 });
    const image = getRandom(apartmentImages);
    const features = getRandomFeatures();

    properties.push({
      id: faker.string.uuid(),
      title: `${propType} in ${city}`,
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
      image,
      images: [image],
      listedDate: faker.date.past({ years: 1 }).toISOString(),
      agent: {
        name: faker.person.fullName(),
        phone: faker.phone.number('+91-9#########'),
        email: faker.internet.email()
      }
    });
  }

  fs.writeFileSync('src/data/properties.json', JSON.stringify(properties, null, 2));
  console.log(`✅ Generated ${properties.length} properties with fresh images!`);
  console.log("📸 Pexels API Key:", process.env.PEXELS_API_KEY);
};

generateProperties();

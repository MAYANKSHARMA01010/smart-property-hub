# 🏡 SmartProperty Hub

SmartProperty Hub is a full-stack real estate platform built to simplify property discovery, buying, renting, and selling. Users can explore verified listings with filters, sort options, badges, dark mode, and more — all while leveraging Firebase for authentication and database services.

---

## 🌐 Live Demo

🚀 [Visit Live Site](#) — *Coming Soon*

---

## 📸 Preview

![SmartProperty Hub Preview](./preview.png)

---

## 📁 Features

### 👤 User Features
- 🔐 Google and Email/Password Authentication (Firebase)
- 🔎 Filter properties by:
  - City
  - Type (Apartment, Villa, Plot, etc.)
  - Price Range
- 🏷️ Tag badges like **"Ready to Move"**, **"New Launch"**
- 🌙 Seamless Dark Mode Support
- 🧾 Pagination with Jump (First, Previous, Next, Last)
- 📊 Property Cards with:
  - Title, Price, Area
  - Amenities, Description
  - Image matching property type

### 🛠️ Admin/Dev Features
- 🧪 Fake data generation using `@faker-js/faker`
- 🗂️ JSON-based or Firebase Firestore property storage
- 🧹 Reset Filters button
- 🧭 Optimized for large datasets (10M+ entries planned)

---

## 🛠️ Tech Stack

| Frontend   | Backend / Auth | Data Storage | Tools            |
|------------|----------------|--------------|------------------|
| React + JSX | Firebase Auth  | Firestore    | Faker.js         |
| Tailwind CSS| Firebase Storage | JSON fallback | Google Maps API (planned) |
| Dark Mode  | Firebase Hosting |              | Responsive Design |

---

## 🧪 Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/MAYANKSHARMA01010/smart-property-hub.git
cd smart-property-hub

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

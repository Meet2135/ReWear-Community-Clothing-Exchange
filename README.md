xx# 🌱 **ReWear - Community Clothing Exchange**

## ♻️ A Sustainable Way to Share and Reuse Clothes

ReWear is a web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

---

## 🖼️ Screenshots

### 🔐 Sign Up
<img width="940" height="449" alt="image" src="https://github.com/user-attachments/assets/0fded9dd-e91f-4705-8ed8-e67e5c5d2c0b" />


### 🔑 Log In Dashboard
<img width="940" height="441" alt="image" src="https://github.com/user-attachments/assets/2835024b-2a76-4efc-a2c9-486cb01720fe" />


### 👕 Browse Items
<img width="940" height="451" alt="image" src="https://github.com/user-attachments/assets/6d920948-ba27-46b6-840a-22046a55239e" />
<img width="940" height="448" alt="image" src="https://github.com/user-attachments/assets/104b3f55-e10e-4400-be4b-ffb04ad35e76" />


### ℹ️ About Us
<img width="940" height="451" alt="image" src="https://github.com/user-attachments/assets/ab341bd5-83a7-4efb-af46-0338d9d9000b" />


### 📊 Dashboard After Login
<img src="https://github.com/user-attachments/assets/d9a28de2-b1f0-4b5f-af62-b7f334cf146e" width="700"/>

### ➕ Add Item
<img src="https://github.com/user-attachments/assets/c8b51702-5473-4c2e-8eee-acf6dd6beeab" width="700"/>
<img src="https://github.com/user-attachments/assets/99b5707e-b556-4449-8c44-ce4c7c8fa3de" width="700"/>

### 📷 Other Screens
<img src="https://github.com/user-attachments/assets/5bf2ddab-76ea-451c-8d55-edddff9fdb23" width="700"/>
<img src="https://github.com/user-attachments/assets/46791b3b-48f6-45b9-ac92-6201a0dd4fcd" width="700"/>
<img src="https://github.com/user-attachments/assets/587000d2-386c-4a5c-9193-6825c1f62fbd" width="700"/>

---

## 🔐 Admin Login Credentials

> Use the following credentials to log in as an admin during testing:

```

📧 Email: admin@123gmail.com
🔑 Password: admin\@123

````

> ⚠️ **Note**: These are default credentials for demo/testing purposes. Replace them in production.

---

## 🔑 Generate Secure JWT Secret

You can generate a secure JWT secret using the following Node.js command:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
````

Copy the output and paste it into your `.env` file like this:

```env
JWT_SECRET=your_generated_secret_here
```

---

## 🎯 Project Overview

ReWear is a sustainable fashion platform built with MERN stack that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Our mission is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

---

## 🌟 Key Features

### 👤 User Authentication

* Email/password signup and login system
* JWT token-based authentication
* Secure user session management
* Profile management

### 🏠 Landing Page

* Platform introduction and mission statement
* Call-to-action buttons: "Start Swapping", "Browse Items", "List an Item"
* Featured items carousel showcasing trending exchanges
* User testimonials and impact statistics

### 📊 User Dashboard

* Profile details and points balance display
* Uploaded items overview with status tracking
* Ongoing and completed swaps list
* Transaction history and points earned/spent

### 👕 Item Detail Page

* Image gallery with multiple photo support
* Comprehensive item description and specifications
* Uploader information and rating
* Action options: "Swap Request" or "Redeem via Points"
* Real-time item availability status

### ➕ Add New Item Page

* Multi-image upload functionality
* Detailed item form: title, description, category, type, size, condition, and tags
* Preview before submission
* Automatic listing approval workflow

### 🔧 Admin Role

* Content moderation and approval/rejection system
* Spam and inappropriate content removal
* Lightweight admin panel for platform oversight
* User management and analytics

---

## 🛠 Technology Stack

### Frontend

* **Framework**: React.js 18
* **State Management**: Redux Toolkit
* **UI Library**: Material-UI (MUI)
* **Routing**: React Router v6
* **HTTP Client**: Axios
* **Image Upload**: Cloudinary

### Backend

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JWT (JSON Web Tokens)
* **File Upload**: Multer + Cloudinary
* **Validation**: Joi
* **Security**: bcryptjs, helmet, cors

### Database

* **Primary**: MongoDB Atlas
* **Caching**: Redis (optional)

---

## 📋 Prerequisites

* Node.js 16+ and npm
* MongoDB (local or Atlas)
* Git
* Modern web browser

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd rewear
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

```bash
# Backend environment variables
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment variables
cd ../frontend
cp .env.example .env
# Edit .env with your configuration
```

### 4. Database Setup

```bash
# If using local MongoDB
mongod

# Or configure MongoDB Atlas connection string in backend/.env
```

### 5. Run the Application

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm start
```

---

## 📁 Project Structure

```
rewear/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── utils/
├── package.json
└── README.md
```

---

## 🎮 Usage

### For Users

1. **Sign Up/Login**: Create an account or log in to your existing profile
2. **Browse Items**: Explore available clothing items in the marketplace
3. **List Items**: Upload your unused clothing with detailed descriptions
4. **Request Swaps**: Initiate swap requests with other users
5. **Earn Points**: Gain points by successful exchanges
6. **Redeem Points**: Use accumulated points to claim items

### For Admins

1. **Access Admin Panel**: Navigate to `/admin`
2. **Moderate Content**: Review and approve/reject item listings
3. **Manage Users**: Monitor user activity and handle disputes
4. **Analytics**: View platform statistics and growth metrics

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

---

## 📊 Features in Detail

### Point System

* Earn points for successful item exchanges
* Redeem points for items without direct swaps
* Transaction history included

### Swap Management

* Direct swap requests and counter-offers
* Status tracking (pending, accepted, completed, cancelled)
* Dispute resolution support

### Image Management

* Multi-image uploads with Cloudinary
* Auto-thumbnail generation and optimization

### Search & Filter

* Search by category, size, tags, location
* Filter by condition, point range, and availability

---

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
cd backend
heroku create rewear-backend
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)

```bash
cd frontend
npm run build
# Upload /dist or /build to Netlify or Vercel
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---


## 👥 Team

* **Developer**: Meet Patel
* **Hackathon**: Odoo Hackathon '25

---

## 📞 Support

* Create an issue in the repo
* Contact the dev team
* Check documentation

---

**Built with ❤️ for sustainable fashion and community building.**
# ReWear-Community-Clothing-Exchange

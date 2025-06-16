'use client';

import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

import { auth, db, storage } from '../lib/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [districts, setDistricts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setPhone(data.phone || '');
          setLocation(data.location || '');
          setBio(data.bio || '');
        } else {
          toast.error("User data not found.");
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    setDistricts([
      "Noida", "Delhi", "Gurugram", "Ghaziabad", "Faridabad", "Greater Noida",
      "Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
      "Lucknow", "Jaipur", "Indore", "Bhopal", "Ahmedabad", "Chandigarh",
      "Surat", "Nagpur"
    ]);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully!");
    router.push('/');
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), {
        photoURL,
      });

      setUserData((prev) => ({ ...prev, photoURL }));
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload error:", error.message);
      toast.error("Failed to upload profile photo.");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        phone,
        location,
        bio,
      });

      setUserData((prev) => ({
        ...prev,
        phone,
        location,
        bio,
      }));

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error.message);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="profile">
      <Navbar />

      <div className="profile-container">
        <h1 className="profile-heading">Welcome to Your Profile</h1>

        <div className="profileInfo">
          <div className="imageWrapper">
            <img
              src={userData.photoURL || "/images/profile.jpg"}
              alt="Profile"
              className="profileImage"
              onClick={() => document.getElementById("photoUpload").click()}
            />
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="profileDetails">
            <h3>{userData?.fullName || "BahuRani"}</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
            <p><strong>Location:</strong> {userData.location || "N/A"}</p>
            <p><strong>Bio:</strong> {userData.bio || "N/A"}</p>
          </div>
        </div>

        <div className="profileActions">
          <button className="editProfile" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Close Editor" : "Edit Profile"}
          </button>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>

        {editMode && (
          <div className="editProfileForm">
            <h3>Edit Your Info</h3>
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select City</option>
              {districts.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="formButtons">
              <button onClick={handleProfileUpdate} className="saveChanges">
                Save Changes
              </button>
              <button onClick={() => setEditMode(false)} className="cancelEdit">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Profile;

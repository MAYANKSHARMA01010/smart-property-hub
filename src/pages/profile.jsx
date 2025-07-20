"use client";

import React, { useState, useEffect } from "react";
import {
  auth,
  db,
  storage,
  RecaptchaVerifier,
} from "../lib/firebase";
import {
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    gender: "",
    phone: "",
    photo: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Get user ID from Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setForm({
            fullName: data.fullName || "",
            bio: data.bio || "",
            gender: data.gender || "",
            phone: data.phone || "",
            photo: data.photo || "",
          });
          setPhotoPreview(data.photo || null);
        }
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadProfilePhoto = async () => {
    if (!photoFile) return form.photo;
    const storageRef = ref(storage, `avatars/${userId}`);
    await uploadBytes(storageRef, photoFile);
    return await getDownloadURL(storageRef);
  };

  const sendOtp = () => {
    if (!form.phone) return toast.error("Phone number required");

    if (!/^\+?[1-9]\d{7,14}$/.test(form.phone)) {
      return toast.error("Enter valid phone number with country code");
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible", callback: () => sendOtp() },
        auth
      );
    }

    setLoading(true);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, form.phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent");
        setOtpSent(true);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to send OTP");
        setLoading(false);
      });
  };

  const verifyOtpAndSave = async () => {
    if (!window.confirmationResult) {
      return toast.error("OTP not requested yet");
    }
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async () => {
        await saveProfile(true);
        setOtp("");
        setOtpSent(false);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Invalid OTP");
        setLoading(false);
      });
  };

  const saveProfile = async (verified = false) => {
    try {
      setLoading(true);
      const photoURL = await uploadProfilePhoto();
      const updatedData = {
        fullName: form.fullName,
        bio: form.bio,
        gender: form.gender,
        photo: photoURL,
      };
      if (verified) {
        updatedData.phone = form.phone;
      }
      await updateDoc(doc(db, "users", userId), updatedData);
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <ToastContainer />
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-photo-section">
          <img
            src={photoPreview || "/default-avatar.png"}
            alt={form.fullName ? `${form.fullName}'s profile` : "Default avatar"}
            className="profile-photo"
          />
          {editMode && (
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          )}
        </div>

        <div className="profile-info">
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={!editMode}
            />
          </label>

          <label>
            Bio:
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editMode}
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!editMode}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editMode}
            />
          </label>

          {editMode && (
            <div className="otp-section">
              <button onClick={sendOtp} disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              {otpSent && (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                  <button onClick={verifyOtpAndSave} disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Save"}
                  </button>
                </>
              )}

              {!otpSent && (
                <button onClick={() => saveProfile(false)} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          )}

          {!editMode && (
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </div>

        <div id="recaptcha-container"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

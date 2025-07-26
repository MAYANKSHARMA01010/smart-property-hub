"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  db,
  storage,
} from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
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
import toast, { Toaster } from "react-hot-toast";
import "../styles/profile.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profile() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    gender: "",
    photo: "",
  });
  const [originalForm, setOriginalForm] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please login first.");
        router.push("/login");
        return;
      }

      if (!navigator.onLine) {
        toast.error("You're offline. Check your internet connection.");
        return;
      }

      setUserId(user.uid);
      setUserEmail(user.email || "");
      setUserCreatedAt(new Date(user.metadata.creationTime).toLocaleString());

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Firestore user data:", data);
          setForm({
            fullName: data.fullName || data.name || "",
            phone: data.phone || "",
            gender: data.gender || "",
            photo: data.photo || "",
          });
          setOriginalForm({
            fullName: data.fullName || data.name || "",
            phone: data.phone || "",
            gender: data.gender || "",
            photo: data.photo || "",
          });
        } else {
          toast.error("No user data found in Firestore.");
        }
      } catch (err) {
        console.error("Firestore fetch failed:", err);
        toast.error("Failed to fetch profile.");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      setPhotoPreview(URL.createObjectURL(file));
      const fileRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      setForm((prev) => ({ ...prev, photo: photoURL }));
      toast.success("Photo uploaded successfully!");
    } 
    catch (err) {
      console.error("Photo upload failed:", err);
      toast.error("Failed to upload photo.");
    }
  };

  const handleSendOTP = async () => {
    if (!form.phone.trim()) {
      toast.error("Enter a valid phone number first.");
      return;
    }

    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = form.phone.startsWith("+") ? form.phone : "+91" + form.phone;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      toast.success("OTP sent!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult) return toast.error("OTP flow not initialized.");

    try {
      await confirmationResult.confirm(otp);
      setPhoneConfirmed(true);
      toast.success("Phone number verified!");
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP");
    }
  };

  const handleUpdate = async () => {
    if (!userId) return toast.error("User not logged in.");

    if (form.phone.trim() && form.phone !== originalForm?.phone && !phoneConfirmed) {
      return toast.error("Please verify your new phone number before saving.");
    }

    try {
      const updateData = {
        fullName: form.fullName || null,
        name: form.fullName || null,
        gender: form.gender || null,
        photo: form.photo || null,
        phone: form.phone.trim() || null,
      };

      await updateDoc(doc(db, "users", userId), updateData);

      toast.success("Profile updated!");
      setIsEditing(false);
      setPhotoPreview("");
      setPhoneConfirmed(false);
      setOtpSent(false);
      setOriginalForm({ ...form });
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    if (originalForm) {
      setForm({ ...originalForm });
    }
    setIsEditing(false);
    setPhotoPreview("");
    setPhoneConfirmed(false);
    setOtpSent(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-title">Your Profile</h2>

        <div className="profile-photo-section">
          <img
            src={photoPreview || form.photo || "/ProfileImg.png"}
            alt="Profile"
            className="profile-photo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/ProfileImg.png";
            }}
          />

          {isEditing && (
            <div className="photo-upload-wrapper">
              <label htmlFor="photoInput" className="upload-button">
                Upload Photo
              </label>
              <input
                type="file"
                id="photoInput"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        <div className="profile-info">
          <label>
            Full Name
            <input
              type="text"
              value={form.fullName}
              readOnly={!isEditing}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              value={form.phone}
              readOnly={!isEditing}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                setPhoneConfirmed(false);
              }}
            />
          </label>

          {!phoneConfirmed && isEditing && (
            <div className="otp-section">
              <div id="recaptcha-container"></div>
              {!otpSent ? (
                <button onClick={handleSendOTP}>Send OTP</button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={handleVerifyOTP}>Verify OTP</button>
                </>
              )}
            </div>
          )}

          <label>
            Gender
            <select
              value={form.gender}
              disabled={!isEditing}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">None</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Email
            <input type="email" value={userEmail} readOnly />
          </label>

          <label>
            Account Created At
            <input type="text" value={userCreatedAt} readOnly />
          </label>

          <div className="button-group">
            <button
              onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
            >
              {isEditing ? "Save Changes" : "Edit"}
            </button>

            {isEditing && (
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            )}

            <button
              className="wishlist-button"
              onClick={() => router.push("/wishlist")}
            >
              Wishlist
            </button>

            <button
              className="logout-button"
              onClick={async () => {
                try {
                  await auth.signOut();
                  toast.success("Logged out successfully.");
                  router.push("/");
                } catch (err) {
                  console.error("Logout failed:", err);
                  toast.error("Logout failed. Try again.");
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

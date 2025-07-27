'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';

import { auth, db, storage } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/profile.css';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    avatar: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneConfirmed, setPhoneConfirmed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setCheckingAuth(false);
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(firebaseUser);
          setForm({
            fullName: docSnap.data().fullName || '',
            phone: docSnap.data().phone || '',
            avatar: docSnap.data().avatar || '',
          });
        }
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setOtpSent(false);
    setOtp('');
    setPhoneConfirmed(false);
    toast('Edit cancelled');
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const updates = {
        fullName: form.fullName,
        updatedAt: serverTimestamp(),
      };

      if (preview) {
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, preview);
        const downloadURL = await getDownloadURL(avatarRef);
        updates.avatar = downloadURL;
        toast.success('🖼️ Profile photo updated');
      }

      await updateDoc(doc(db, 'users', user.uid), updates);
      toast.success('✅ Profile updated successfully!');
      setIsEditing(false);
      setOtpSent(false);
      setOtp('');
      setPhoneConfirmed(false);
    } catch (err) {
      toast.error('❌ Failed to update profile.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && value.length > 10) return;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      toast.success('🖼️ Profile photo selected');
    }
  };

  const handleSendOtp = () => {
    if (!form.phone.trim()) {
      toast.error('📱 Enter phone number first');
      return;
    }
    toast.success('📤 OTP sent (demo only)');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      toast.error('🔒 Enter OTP');
      return;
    }
    toast.success('✅ Phone number verified (demo)');
    setPhoneConfirmed(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('👋 Logged out');
    router.push('/');
  };

  if (checkingAuth) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />

      <main>
        <div className="header-row">
          <h2>Profile</h2>
          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={() => toast('❤️ Wishlist feature coming soon')}
            >
              ❤️ Wishlist
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>

        <div className="profile-avatar-row">
          <div className="avatar-box">
            {form.avatar ? (
              <img
                src={preview ? URL.createObjectURL(preview) : form.avatar}
                alt="avatar"
                className="avatar-img"
              />
            ) : (
              <div className="avatar-placeholder">No Avatar</div>
            )}
          </div>
          {isEditing && (
            <button
              className="btn-text"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Photo
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-control"
            />
          </div>

          <div>
            <label>Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-control"
              placeholder="Enter 10-digit number"
              maxLength={10}
            />
            {isEditing && !phoneConfirmed && (
              <div className="mt-2">
                <button onClick={handleSendOtp} className="btn-text">
                  Send OTP
                </button>
              </div>
            )}
          </div>

          {isEditing && otpSent && !phoneConfirmed && (
            <div>
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control mt-1"
              />
              <button onClick={handleVerifyOtp} className="btn-text mt-2">
                Verify OTP
              </button>
            </div>
          )}

          <div>
            <label>Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="form-control"
            />
          </div>

          <div>
            <label>Account Created</label>
            <input
              type="text"
              value={user?.metadata?.creationTime || ''}
              disabled
              className="form-control"
            />
          </div>
        </div>

        <div className="action-buttons mt-6">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary">
                Save Changes
              </button>
              <button onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="btn-primary">
              Edit Profile
            </button>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

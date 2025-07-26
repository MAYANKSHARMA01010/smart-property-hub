"use client";

import { useEffect } from "react";
import { initAnalytics } from "../lib/firebase";

export default function ClientOnlyInit() {
  useEffect(() => {
    initAnalytics().then((analytics) => {
      if (analytics) {
        console.log("Firebase Analytics initialized");
      }
    });
  }, []);

  return null;
}

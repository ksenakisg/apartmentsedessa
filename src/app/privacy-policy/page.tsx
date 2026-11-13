"use client";

import PrivacyModal from "../components/PrivacyModal";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return <PrivacyModal onClose={() => setOpen(false)} />;
}


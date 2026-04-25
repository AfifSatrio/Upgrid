"use client";

import { use } from "react";
import { PemesananDetailPage } from "@/components/admin/PemesananDetailPage";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <PemesananDetailPage id={id} />;
}

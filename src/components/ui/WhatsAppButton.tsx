"use client";

import { RiWhatsappLine } from "@remixicon/react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890";
const WA_MESSAGE = "Halo, saya ingin bertanya tentang layanan UPGRID DIGITAL.";

export const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
    aria-label="Chat via WhatsApp"
  >
    <RiWhatsappLine className="w-7 h-7" />
  </a>
);

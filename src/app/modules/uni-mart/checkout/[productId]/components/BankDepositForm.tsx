"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, Building2, UserRound, Hash, MapPin } from "lucide-react";
import type { SellerBankDetailsInput } from "../../../services/product.service";

interface BankDepositFormProps {
  onSubmit: (file: File) => Promise<void>;
  isProcessing: boolean;
  sellerBankDetails?: SellerBankDetailsInput | null;
}

export default function BankDepositForm({
  onSubmit,
  isProcessing,
  sellerBankDetails,
}: BankDepositFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a receipt image");
      return;
    }

    try {
      await onSubmit(selectedFile);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload receipt"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
          <Upload size={18} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upload Bank Deposit Receipt</h2>
          <p className="text-sm text-slate-500">Submit your transfer receipt to continue the order.</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 p-4">
        <div className="mb-3 flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-700 shadow-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
          </div>
          <div className="text-blue-900">
            <p className="inline-flex rounded-full border border-blue-200 bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
              Bank Transfer Details
            </p>
            <p className="mt-2 text-sm font-semibold text-blue-950">Seller Bank Details</p>
            <p className="text-xs text-blue-700/80">Use these details exactly when making your transfer.</p>
          </div>
        </div>

        {sellerBankDetails ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-blue-100 bg-white/85 p-3.5 shadow-sm shadow-blue-100/50">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <Building2 size={15} /> Bank
              </div>
              <p className="text-sm font-bold text-blue-950">{sellerBankDetails.bankName}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white/85 p-3.5 shadow-sm shadow-blue-100/50">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <UserRound size={15} /> Account Holder
              </div>
              <p className="text-sm font-bold text-blue-950">{sellerBankDetails.accountHolderName}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white/85 p-3.5 shadow-sm shadow-blue-100/50">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <Hash size={15} /> Account Number
              </div>
              <p className="break-all font-mono text-[15px] font-bold tracking-wide text-blue-950">{sellerBankDetails.accountNumber}</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white/85 p-3.5 shadow-sm shadow-blue-100/50">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                <MapPin size={15} /> Branch
              </div>
              <p className="text-sm font-bold text-blue-950">{sellerBankDetails.branch}</p>
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-blue-100 bg-white/80 p-3 text-sm leading-relaxed text-blue-800">
            Seller bank details are not available yet. Please try another payment method or contact the seller.
          </p>
        )}
      </div>

      <div className="space-y-4">
        {/* File Input */}
        <div>
          <label
            htmlFor="receipt"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Receipt Image
          </label>
          <div
            className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50/50"
            onClick={() => document.getElementById("receipt")?.click()}
          >
            {preview ? (
              <div className="space-y-4">
                <div className="relative inline-block overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                  <img
                    src={preview}
                    alt="Receipt preview"
                    className="max-h-44 rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/10">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedFile?.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {(selectedFile?.size || 0) / 1024 > 1024
                      ? ((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2) +
                        " MB"
                      : ((selectedFile?.size || 0) / 1024).toFixed(2) + " KB"}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Upload size={40} className="mx-auto mb-2 text-slate-400 transition-colors group-hover:text-blue-500" />
                <p className="font-semibold text-slate-700">
                  Click to upload receipt
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>
          <input
            id="receipt"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isProcessing}
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <p className="mb-3 text-xs text-slate-500">
          Upload the receipt after transferring to the seller's bank account.
        </p>
        <button
          type="submit"
          disabled={isProcessing || !selectedFile}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400"
        >
          {isProcessing ? "Processing..." : "Confirm Order & Upload Receipt"}
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Use the seller bank details above when making the transfer.
      </p>
    </form>
  );
}

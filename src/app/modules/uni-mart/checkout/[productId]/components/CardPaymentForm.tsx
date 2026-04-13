"use client";

import { useState } from "react";
import { CreditCard, AlertCircle } from "lucide-react";

interface CardPaymentFormProps {
  onSubmit: (details: CardDetails) => Promise<void>;
  isProcessing: boolean;
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
  phone: string;
}

export default function CardPaymentForm({
  onSubmit,
  isProcessing,
}: CardPaymentFormProps) {
  const [formData, setFormData] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<CardDetails>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CardDetails, boolean>>>({});

  const sanitizeCardNumber = (value: string) => value.replace(/\D/g, "").slice(0, 19);

  const formatCardNumber = (digits: string) =>
    digits.replace(/(.{4})/g, "$1 ").trim();

  const sanitizeExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const isValidExpiryDate = (value: string) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [monthStr, yearStr] = value.split("/");
    const month = Number(monthStr);
    const year = Number(`20${yearStr}`);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const validateForm = () => {
    const newErrors: Partial<CardDetails> = {};

    const cardDigits = sanitizeCardNumber(formData.cardNumber);
    if (!cardDigits) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardDigits.length < 13 || cardDigits.length > 19) {
      newErrors.cardNumber = "Card number must be between 13 and 19 digits";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!isValidExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = "Enter a valid future expiry date (MM/YY)";
    }

    const cvvDigits = formData.cvv.replace(/\D/g, "");
    if (!cvvDigits) {
      newErrors.cvv = "CVV is required";
    } else if (cvvDigits.length < 3 || cvvDigits.length > 4) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextValue = (() => {
      if (name === "cardNumber") {
        return formatCardNumber(sanitizeCardNumber(value));
      }

      if (name === "expiryDate") {
        return sanitizeExpiryDate(value);
      }

      if (name === "cvv") {
        return value.replace(/\D/g, "").slice(0, 4);
      }

      if (name === "phone") {
        return value.replace(/[^\d+]/g, "").slice(0, 15);
      }

      return value;
    })();

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (touched[name as keyof CardDetails]) {
      validateField(name as keyof CardDetails, nextValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name as keyof CardDetails, value);
  };

  const validateField = (field: keyof CardDetails, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "cardNumber": {
        const cardDigits = sanitizeCardNumber(value);
        if (!cardDigits) {
          newErrors.cardNumber = "Card number is required";
        } else if (cardDigits.length < 13 || cardDigits.length > 19) {
          newErrors.cardNumber = "Card number must be between 13 and 19 digits";
        } else {
          delete newErrors.cardNumber;
        }
        break;
      }
      case "expiryDate":
        if (!value.trim()) {
          newErrors.expiryDate = "Expiry date is required";
        } else if (!isValidExpiryDate(value)) {
          newErrors.expiryDate = "Enter a valid future expiry date (MM/YY)";
        } else {
          delete newErrors.expiryDate;
        }
        break;
      case "cvv": {
        const cvvDigits = value.replace(/\D/g, "");
        if (!cvvDigits) {
          newErrors.cvv = "CVV is required";
        } else if (cvvDigits.length < 3 || cvvDigits.length > 4) {
          newErrors.cvv = "CVV must be 3 or 4 digits";
        } else {
          delete newErrors.cvv;
        }
        break;
      }
      case "cardholderName":
        if (!value.trim()) {
          newErrors.cardholderName = "Cardholder name is required";
        } else {
          delete newErrors.cardholderName;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        const phoneDigits = value.replace(/\D/g, "");
        if (!phoneDigits) {
          newErrors.phone = "Phone number is required";
        } else if (phoneDigits.length < 10) {
          newErrors.phone = "Phone number must be at least 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Card Payment Details
      </h2>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 flex gap-3">
        <AlertCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-700">
          <p className="font-semibold mb-1">Billing Details</p>
          <p>
            Enter the billing contact details used for the Stripe checkout flow.
            Your card payment itself is completed securely on Stripe.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Card Number *
          </label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            autoComplete="cc-number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              touched.cardNumber && errors.cardNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isProcessing}
          />
          {touched.cardNumber && errors.cardNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              id="expiryDate"
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                touched.expiryDate && errors.expiryDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={isProcessing}
            />
            {touched.expiryDate && errors.expiryDate && (
              <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              CVV *
            </label>
            <input
              id="cvv"
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                touched.cvv && errors.cvv
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={isProcessing}
            />
            {touched.cvv && errors.cvv && (
              <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name *
          </label>
          <input
            id="cardholderName"
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Name on card"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              touched.cardholderName && errors.cardholderName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isProcessing}
          />
          {touched.cardholderName && errors.cardholderName && (
            <p className="text-red-600 text-sm mt-1">{errors.cardholderName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="billing@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              touched.email && errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isProcessing}
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="07xxxxxxxx"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              touched.phone && errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isProcessing}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <CreditCard size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            Your card details will NOT be stored. You will be securely redirected
            to Stripe for payment processing.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || Object.keys(errors).length > 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <CreditCard size={20} />
          {isProcessing ? "Processing..." : "Continue to Stripe Checkout"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Card data is used only for checkout validation and payment is completed securely on Stripe.
      </p>
    </form>
  );
}

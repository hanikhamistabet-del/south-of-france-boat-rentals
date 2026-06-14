"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleReset(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:3000/reset-password",
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Password reset email sent."
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-6">
          Reset Password
        </h1>

        <form
          onSubmit={handleReset}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-lg"
          >
            Send Reset Link
          </button>

        </form>

      </div>
    </main>
  );
}
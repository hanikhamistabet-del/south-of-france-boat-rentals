"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] =
    useState("");

  async function handleReset(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert(
        "Please use the password reset link from your email."
      );
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Password updated successfully!"
    );

    window.location.href =
      "/login";
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
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-4 rounded-lg bg-white text-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Update Password
          </button>

        </form>

      </div>

    </main>
  );
}
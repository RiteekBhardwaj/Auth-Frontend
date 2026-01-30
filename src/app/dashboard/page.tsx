
import React from "react";

export default function page() {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 space-y-5">
  <div>
    <h1 className="text-xl font-semibold text-white">
      JWT-based Authentication Service
    </h1>
    <p className="mt-1 text-sm text-neutral-400">
      Secure sessions with refresh tokens, Redis tracking, and Spring-powered reliability
    </p>
  </div>

  <ul className="grid gap-3 sm:grid-cols-2 text-sm">
    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      Access & refresh token generation active
    </li>

    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      Refresh token rotation enabled
    </li>

    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      Redis-backed session tracking (JTI)
    </li>

    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      Immediate token revocation supported
    </li>

    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      OTP-based email verification & recovery
    </li>

    <li className="flex items-center gap-2 text-neutral-300">
      <span className="h-2 w-2 rounded-full bg-green-500" />
      Email-based rate limiting enabled
    </li>
  </ul>
</div>

  );
}

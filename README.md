# 🔐 Authentication Service (Next.js + Spring Boot)

A **production-ready JWT authentication system** built with **Next.js (frontend)** and **Spring Boot (backend)**, focusing on **security, scalability, and real-world best practices**.

## 🚀 Features Overview

### Authentication & Sessions
- JWT-based access and refresh token authentication
- Secure HTTP-only cookie handling
- Refresh token rotation with reuse detection
- Redis-backed session tracking using JTI
- Automatic access token expiry handling
- Immediate token revocation on logout or misuse

### Account Security
- OTP-based email verification during signup
- Secure password recovery using email OTP
- Email-based rate limiting to prevent brute-force attacks

## 🛠 Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Secure cookie-based authentication

### Backend
- Spring Boot
- Spring Security
- JWT (Access & Refresh Tokens)
- Redis (Session & Token Tracking)

### Infrastructure
- RESTful APIs
- Redis TTL-based expiration

## 🧠 How It Works (High Level)

1. User logs in with credentials  
2. Backend issues:
   - Short-lived **access token**
   - Long-lived **refresh token** (stored securely)
3. Refresh token JTI is stored in Redis with expiry
4. On token refresh:
   - Old refresh token is invalidated
   - New token pair is issued
5. Any token reuse attempt triggers **immediate revocation**
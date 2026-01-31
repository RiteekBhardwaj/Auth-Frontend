# Authentication Service (Next.js + Spring Boot)

A production-ready JWT authentication system built with **Next.js (Frontend)** and **Spring Boot (Backend)**, focused on **security, scalability, and real-world best practices**. The backend of this application is fully deployed on **AWS EC2** to simulate a real production environment.

🔗 **Live Demo:** https://next-auth-frontend.netlify.app/

🔗 **Backend:** https://github.com/RiteekBhardwaj/Auth-Backend

---

## Features Overview

### Authentication & Sessions
- JWT-based **Access & Refresh Token** authentication
- Secure **HTTP-Only Cookie** handling
- **Refresh Token Rotation** with reuse detection
- **Redis-backed JTI session tracking**
- Automatic access token expiry handling
- Immediate token revocation on logout or misuse

### Account Security
- **OTP-based Email Verification** during signup
- **Secure Password Recovery** via Email OTP
- **Email Rate Limiting** to prevent brute-force and spam attacks

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Secure Cookie-based Authentication

### Backend
- Spring Boot
- Spring Security
- JWT (Access & Refresh Tokens)
- Redis (Session & Token Tracking)


## Deployment
The project is deployed on **AWS EC2**:
- Secure API communication setup

## How It Works (High Level)
1. User logs in with credentials  
2. Backend issues:
   - Short-lived **Access Token**
   - Long-lived **Refresh Token** stored securely  
3. Refresh Token **JTI stored in Redis** with expiry  
4. On token refresh:
   - Old refresh token is invalidated
   - New token pair is issued
   - Any token reuse attempt triggers **immediate revocation**
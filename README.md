# MedScan - Application

MedScan is a **comprehensive healthcare application** that integrates **artificial intelligence** and **human interaction** to provide innovative and quick healthcare services for users. The application centers around **AI-driven medical image analysis**, as well as interactive **medical consultations** that users can access easily through an embedded **Chatbot**.

MedScan aims to simplify the healthcare experience for both patients and doctors through a unified platform offering a variety of medical services. It enables patients to analyze medical images, find doctors, and receive interactive consultations, while doctors can securely and efficiently manage their patients' records.

---

## **Project Idea:**

MedScan is a **comprehensive healthcare application** designed to help patients analyze medical images (such as X-rays) using artificial intelligence, alongside providing **interactive medical consultations** via a **Chatbot**. The app provides an innovative solution for people who need medical advice or have health concerns but don't want to visit a doctor immediately. MedScan offers **instant healthcare solutions** using AI and the option for online consultations.

MedScan allows users to interact with a system based on AI to analyze medical images, as well as provide medical consultations via a **Chatbot** for inquiries about diseases, symptoms, and medications. Users can also search for doctors and book appointments, as well as upload medical images for analysis directly through the app.

### **App Goal:**
- **Analyze medical images** using artificial intelligence instantly.
- Allow patients to receive **interactive consultations** about symptoms, diseases, and medications via a **Chatbot**.
- Provide an easy and efficient **doctor search** based on specialty, location, and ratings.
- Offer a **secure medical record management system** for doctors to store and review patient images and data.
- Deliver a **complete healthcare experience** through a user-friendly interface.

---

## **Main Features:**

### **1. Authentication & Authorization:**
- **User Registration & Login:**
  - Login using **email and password** or **Google/Facebook** login via **OAuth 2.0**.
  - **Email confirmation** and input validation.
  - **Password reset** via email with **OTP** verification.

- **JWT Authentication:**
  - The app uses **JWT** to create authorized tokens that protect all operations within the app.
  - **Token refresh mechanism** ensures long sessions without requiring users to log in again.

- **Role-based Access Control:**
  - Users are categorized as **Patient** or **Doctor**, with different features and permissions for each role.
  - The app displays role-specific interfaces and services, providing a tailored user experience.

### **2. Chatbot:**
- **AI-driven Medical Image Analysis:**
  - The app uses the **Google Gemini API** to analyze medical images and provide instant, detailed medical reports.
  - Users can upload **medical images** and receive a comprehensive analysis report.

- **Interactive Consultations:**
  - The app features an interactive **Chatbot** that answers users' questions about **symptoms, diseases, and medications**.
  - Users can describe their symptoms in detail and get accurate, instant responses based on medical knowledge.
  - **Medication Inquiries:** Users can also ask the **Chatbot** about any medication, including **recommended dosage**, **side effects**, and **usage instructions**.

### **3. Patient Features:**
- **Doctor Search:**
  - Patients can search for doctors using multiple criteria such as **specialty**, **location**, and **ratings**.
  - Details such as **consultation fees**, **doctor ratings**, and **clinic locations** are displayed.

- **Upload Medical Images Directly:**
  - Patients can upload their medical images for analysis and receive the results instantly.
  - If patients prefer not to interact with the Chatbot, they can opt to upload the image and receive direct results.

### **4. Doctor Features:**
- **Patient Record Management:**
  - Doctors can add patients and store their medical images for future reference.
  - Doctors can review and manage their patients' records at any time.

- **Patient Management:**
  - Doctors can register their patients' medical images and track their progress through the app.

### **5. Profile Management:**
- **Manage Personal Information:**
  - Users can edit their personal details such as name, email, profile picture, and password.
  - Users can **delete their account** or change their password if needed.

---

## **How MedScan Works:**

### **For Patients:**
1. The patient selects whether they want to register as a **Patient** or a **Doctor**.
2. They fill out their personal information or register via Google/Facebook.
3. They upload medical images to get an AI-generated report from the **Chatbot**.
4. Patients can search for doctors based on **specialty**, **location**, and **rating**.
5. Instant results are provided after uploading medical images or asking questions through the **Chatbot**.

### **For Doctors:**
1. Doctors register their details and add patients to the system.
2. They upload medical images for their patients to keep records.
3. Doctors can access and review their patients' medical history and images at any time.
4. Doctors can interact with the **Chatbot** to assist with patient queries.

---

## **Tech Stack:**
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT, OAuth (Google/Facebook)
- **AI Integration:** Google Gemini API (via @google/generative-ai)
- **File Storage:** Cloudinary
- **File Upload:** Multer
- **Email Service:** Mailtrap
- **Validation:** Express-validator, Validator
- **Logging:** Morgan (for logging HTTP requests)

---

## Installation & Setup


1. Clone the repository:
   ```
   git clone https://github.com/devnoranhamdy/MedScan-Api.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file and configure the following variables:
   ```
 
   ```
  4. Start the server:
     ```
     npm start
     ```
   For development mode with auto-restart:
     ```
     npm run dev
     ```

---


## Error Handling

The MedScan API implements a consistent and structured error handling strategy to ensure clarity, ease of debugging, and a better developer experience.

```json
{
  "status": "error",
  "message": "Error description",
  "errors": ["Detailed error information"]
}
```

Success responses follow this format:

```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {}
}
```

---

## Security Best Practices Implemented

- Password hashing with bcrypt
- HTTPS enforcement in production
- JWT with expiration times
- HTTP-only cookies for refresh tokens
- CORS protection
- Rate limiting
- Input validation and sanitization
- Protection against common security vulnerabilities (XSS, CSRF, etc.)

---


## Author

Noran Hamdy - [GitHub Profile](https://github.com/devnoranhamdy)

---

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.


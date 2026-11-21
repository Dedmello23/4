# Four Years ♡ Romantic Anniversary Date Invitation Website

An immersive, interactive, cinematic anniversary invitation website created to celebrate our fourth anniversary.

Designed as an interactive digital love letter and cinema ticket experience, featuring custom romantic cursor interactions, particle trails, ambient drifting petals, an unfolding wax-sealed letter, a date-aware vintage cinema ticket, an elusive escaping NO button, and a celebratory confetti finale.

---

## 🌸 How to Add Your Original Adobe Fresco Flower Drawing

Your iPad Adobe Fresco flower drawing is the central visual identity of this website.

1. Export your drawing from Adobe Fresco on your iPad as a **PNG with transparency** (or high-resolution JPG).
2. Save or copy your image file into:
   ```
   public/assets/flower.png
   ```
3. That's it! Every instance across the website (opening envelope, hero, letter corners, movie ticket stub, scrapbook, interactive flower, celebration screen) will automatically display your exact artwork.
4. If you name it something else or prefer SVG/WebP, simply update the path in `src/config/anniversary.ts`:
   ```ts
   flowerAssetPath: "/assets/your-flower-name.png",
   ```

---

## ⚙️ Personal Configuration (`src/config/anniversary.ts`)

Everything you want to personalize is located in one single file: `src/config/anniversary.ts`.

- **`relationshipStartDate`**: Set your anniversary start date in `"YYYY-MM-DD"` format (e.g., `"2022-11-21"`).
  - *If left as `null`, the counter gracefully shows "four years of being us ♡" without displaying incorrect numbers.*
- **`eventDate`**: Set your scheduled movie date in `"YYYY-MM-DD"` format (e.g., `"2026-11-28"`).
  - *When set, activates the date-aware Halifax time calculation (ADT vs. AST) and begins the live countdown timer.*
- **`eventTimeIST`**: Default is `"19:00"` (7:00 PM IST).
- **`eventTitle`**, **`eventLocation`**, **`dressCode`**: Customize your date details.
- **`letterParagraphs`**: Customize any lines of your 4-year love letter.
- **`escapingNoMessages`**: Customize the funny messages that pop up when he tries to catch the NO button.

---

## 🛠️ Local Development & Build

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the website.

### 3. Build for production
```bash
npm run build
```
This builds an optimized production bundle ready for deployment.

---

## 🚀 Free Deployment to Vercel (Step-by-Step)

This website has zero databases, zero backends, and zero paid API keys. It is 100% ready for one-click deployment on Vercel.

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name it (for example: `our-fourth-anniversary`).
4. Set it to **Public** or **Private**, and click **Create repository**.

### Step 2: Push your code to GitHub
Run the following commands in your project terminal:
```bash
git init
git add .
git commit -m "Four years anniversary invitation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/our-fourth-anniversary.git
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (using your GitHub account).
2. Click **Add New...** > **Project**.
3. Under "Import Git Repository", find and select `our-fourth-anniversary`.
4. Leave all default settings (Framework Preset will automatically detect **Next.js**).
5. Click **Deploy**.

Within 60 seconds, Vercel will generate your live production URL:
```
https://our-fourth-anniversary.vercel.app
```

Send this link to your boyfriend and watch him try to click the NO button! ♡

---

## ✨ Design & Interactive Highlights

- **Custom Star Cursor**: 4-point glowing star with real-time canvas particle trails (stars, petals, hearts, dots). Automatically adapts on hover (grows on buttons, sparkles on links, blooms into hearts on YES button, sparks on flower artwork, bursts on click). Completely hidden on touch screens.
- **Envelope Intro Screen**: Vintage wax seal, 3D envelope flap opening, and letter slide-out sequence.
- **Live Relationship Counter**: Years, months, days, and hours calculated dynamically.
- **The Date Invitation Ticket**: Perforated cinema ticket layout, foil stamp, and date-aware timezone conversion for IST and Halifax (ADT / AST).
- **The Escaping NO Button**: Uses real-time pointer proximity detection to leap away before the cursor can touch it. Constrained to safe bounds, never blocks the YES button, and dodges touch events on mobile.
- **Interactive Flower**: Tap to release a petal burst and reveal sweet messages.
- **Celebration Finale**: Confetti cannon explosion, dramatic artwork entrance, and movie confirmation summary.
- **Ambient Romantic Music**: Optional soothing acoustic music box synthesizer via Web Audio API. Completely offline and royalty-free.

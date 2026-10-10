# 🎂 Cinematic Birthday Site (Next.js + Tailwind + Framer Motion)

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```

## Make it yours (everything is in `lib/data.js`)
- Name, your name, age, tagline, letter, friends' wishes
- The 6 duas (Arabic, transliteration, meaning, source). Add or remove freely

## Add your media
```
public/
  photos/  1.jpg … 8.jpg        (portrait photos look best, ~1200px tall)
  videos/  hero.mp4             (looping hero background, short and muted, under 10 MB)
           Video1.mp4 …         (clips shown in "The movie of us")
           song.mp4             (optional birthday song video; its audio plays in the Films section)
  audio/   birthday.mp3         (song that plays when she/he taps "Open your surprise")
```
Missing files are fine: the site shows tasteful placeholders until you add yours.
To change filenames or add more photos/videos, edit the arrays in `lib/data.js`. Videos play with sound; background music pauses while a video is open and resumes when it closes.

## Deploy free
Push to GitHub, import on vercel.com, done. Keep videos compressed (H.264 .mp4).
Use music you have the rights to use.

## Tips
- Browsers block autoplay audio, so the opening "Open your surprise" button is what starts the music.
- Animations respect the device's "reduce motion" setting.

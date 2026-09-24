# MOB_A1_G05 — Musanze Market

A React Native Expo prototype for fictional Musanze market inspections. It supports a market catalog, vendor inspection form, image evidence, review, in-memory records, and inspection details.

## Run the app

```bash
npm install
npx expo start
```

Open Expo Go on a phone connected to the same Wi-Fi network, then scan the QR code shown in the terminal.

Open `/home/gueylo/Documents/Musanze market` in your editor and terminal.
The working app and dependencies are back in this original folder.

Records are session-only: reloading or closing the app resets them to the fictional examples.
For a test inspection use Vendor Alpha, A-001, Fresh Produce, 0781234567,
select a risk, and confirm consent. Add a camera/gallery photo, review, save,
open Records, and tap the saved record.

Camera permissions must be granted on the phone; build checks do not test camera hardware.
The MP4 currently in evidence is a three-second still landscape placeholder,
not a recording of the application. Replace it with a real app demonstration before submission.
The screenshots folder still needs actual device screenshots.

## Project folders

- `src/` — application screens, navigation, types, data, and context
- `assets/` — local market photographs used by the prototype
- `evidence/` — demo clip, AI-use declaration, and testing log
- `screenshots/` — place final lecturer screenshots here

## Testing

Run `npm run typecheck` before submission. Camera testing requires allowing Camera permission for Expo Go on the test device.

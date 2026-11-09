# TripSplit – Universal, mobile-first group trip expense app

## What's new
- Reusable for any trip; no fixed Sarangpur destination or route.
- Create trip fields: trip name, your display name, vehicle/car, starting point, destination, start date, return date and notes.
- Trip details are shared with members through Supabase.
- Route screen removed completely.
- Mobile-first app layout with a compact phone-width interface, hamburger navigation and floating add-expense button.
- Existing expense tracking, budget calculator, participant splits, history, settlement, PDF export, password login and app icons retained.

## Deploy
1. Extract this ZIP.
2. Upload/replace **all files** in the root of your existing GitHub repository.
3. In Supabase SQL Editor, run `trip-details.sql` once. This adds only the `trip_details` table; existing trips, members and expenses are retained.
4. Commit the GitHub changes and wait for GitHub Pages to publish.
5. Open the website on your phone and refresh. If already installed, close and reopen the home-screen app.

## Login and database
- Keep the existing Supabase project URL and public publishable/anon key.
- Continue creating users manually in Supabase Authentication → Users; sign in with email and password.
- Never put a service-role/secret key in this website.
- No need to rerun the existing TripSplit schema. Run only `trip-details.sql` for this version.

## Add to Home Screen
- Android Chrome: menu → Install app / Add to Home screen.
- iPhone Safari: Share → Add to Home Screen.

The interface is designed for phones. An internet connection is required for login and shared expense syncing.

© DK


## Theme update
This build uses the purple night palette: #0E0B1D, #2A1E4D, #5A3B8C, #8B7CC7, #C9C2E3, and #3A3A52. The interface is optimized for portrait mobile screens.


## Updated TripSplit branding
The app icon and browser favicons now use the new group-expense symbol (people, receipts, rupee calculator and shared coins). The full wordmark artwork is included as `tripsplit-logo-full.png`. Replace the files in the repository root and commit to publish the new branding.


## Mobile header and menu update (v4)

This build keeps the logo/name and hamburger button in one non-wrapping row. The navigation is closed on initial load and after automatic login. It opens only from the hamburger button, closes on outside tap, Escape, Android/browser Back, or after selecting a menu action, and contains the Sign out action. The service worker uses network-first loading for HTML so GitHub Pages updates are not hidden behind an old cached page.

### Deploy
1. Extract this ZIP.
2. Upload/replace the files in the repository root (the same folder as `index.html`).
3. Commit the changes.
4. Open the site in Chrome and refresh. If it is installed as an app, close it completely and reopen it.

No Supabase SQL changes are needed for this layout update.

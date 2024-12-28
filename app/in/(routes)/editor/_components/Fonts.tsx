// fonts.ts
import {
  Inter,
  Roboto_Mono,
  Playfair_Display,
  Oswald,
  Dancing_Script,
  Lora,
  Poppins,
  Open_Sans,
  Montserrat,
  Raleway,
  Abril_Fatface,
  Pacifico,
  Bangers,
  Lobster_Two,
  Indie_Flower,
  Caveat,
  Permanent_Marker,
  Amatic_SC,
  Bubblegum_Sans,
  Roboto,
  Noto_Sans,
  Lato,
  Merriweather,
  Source_Code_Pro,
} from "next/font/google";

export const pacifico = Pacifico({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const bangers = Bangers({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const lobsterTwo = Lobster_Two({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const indieFlower = Indie_Flower({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const amaticSC = Amatic_SC({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const bubblegumSans = Bubblegum_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});
export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});
export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});
export const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const notoSans = Noto_Sans({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["400", "700"],
});

export const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const fontOptions = [
  { name: "Pacifico", font: pacifico },
  { name: "Bangers", font: bangers },
  { name: "Lobster Two", font: lobsterTwo },
  { name: "Indie Flower", font: indieFlower },
  { name: "Caveat", font: caveat },
  { name: "Permanent Marker", font: permanentMarker },
  { name: "Amatic SC", font: amaticSC },
  { name: "Bubblegum Sans", font: bubblegumSans },
  { name: "Inter", font: inter },
  { name: "Roboto", font: roboto },
  { name: "Roboto Mono", font: roboto_mono },
  { name: "Playfair Display", font: playfair },
  { name: "Oswald", font: oswald },
  { name: "Dancing Script", font: dancingScript },
  { name: "Lora", font: lora },
  { name: "Poppins", font: poppins },
  { name: "Open Sans", font: openSans },
  { name: "Montserrat", font: montserrat },
  { name: "Raleway", font: raleway },
  { name: "Abril Fatface", font: abrilFatface },
  { name: "Noto Sans", font: notoSans },
  { name: "Lato", font: lato },
  { name: "Merriweather", font: merriweather },
  { name: "Source Code Pro", font: sourceCodePro },
];

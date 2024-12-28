// fonts.ts
import { Inter, Roboto_Mono, Playfair_Display, Oswald, Dancing_Script,Lora, Poppins, Open_Sans, Montserrat, Raleway, Abril_Fatface  } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

export const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
})

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
})

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
  })
  
  export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '700'],
  })
  
  export const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
  })
  
  export const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
  })
  
  export const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
  })
  
  export const abrilFatface = Abril_Fatface({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
  })

export const fontOptions = [
  { name: 'Inter', font: inter },
  { name: 'Roboto Mono', font: roboto_mono },
  { name: 'Playfair Display', font: playfair },
  { name: 'Oswald', font: oswald },
  { name: 'Dancing Script', font: dancingScript },
  { name: 'Lora', font: lora },
  { name: 'Poppins', font: poppins },
  { name: 'Open Sans', font: openSans },
  { name: 'Montserrat', font: montserrat },
  { name: 'Raleway', font: raleway },
  { name: 'Abril Fatface', font: abrilFatface },
]
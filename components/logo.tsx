import { Bagel_Fat_One } from "next/font/google";

const amarante = Bagel_Fat_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-amarante-logo',
});

export function Logo() {
  return (
    <div className={`${amarante.variable} font-logo text-3xl font-normal`}>
      <h1 className="text-primary dark:text-primary-dark dark:bg-background bg-darkBackground px-3 p-2 rounded-3xl w-fit">MEEDIA</h1>
    </div>
  );
}
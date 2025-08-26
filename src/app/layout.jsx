import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    variable: '--font-poppins',
});

export const metadata = {
    title: 'Reward Hive',
    description: 'A loyalty application',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${poppins.variable} h-full`}>
            <body className="font-poppins h-full w-full overflow-hidden antialiased">
                {children}
            </body>
        </html>
    );
}
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./game/globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'ALTAIR',
    description: 'ALTAIR: to the Earth',
    openGraph: {
        siteName: 'altair.ink',
        title: 'ALTAIR',
        description: 'ALTAIR: to the Earth',
        images: [
            {
                url: 'favicon.png',
                alt: 'ALTAIR Logo',
            },
        ],
        type: 'website',
        url: 'https://altair.ink',
    },
    icons: {
        shortcut: 'favicon.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <main className="w-full h-full bg-black text-white">
                {children}
            </main>

        </body>
        </html>
    );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './main.css'; // CSS 파일 가져오기

export default function Main() {
    const router = useRouter();

    useEffect(() => {
        const handleClick = () => {
            router.push('/game');
        };

        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, [router]);

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-black relative">
            <div className="relative flex flex-col items-center">
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold">
                    ALTAIR
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/start.png"
                    alt="Sample Image"
                    className="mt-[calc(100%/6*4)] h-[60vh] w-auto image"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-sans text-bounce">
                    Touch the screen to begin
                </div>
                <div className="absolute inset-0 bg-overlay"></div>
            </div>
        </div>
    );
}

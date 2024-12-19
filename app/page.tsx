'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // app 디렉토리에서는 'next/navigation' 사용
import styles from './main.module.css';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const handleBodyClick = () => {
            router.push('/game'); // 이동할 URL
        };

        document.body.addEventListener('click', handleBodyClick);
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.title}>ALTAIR</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/start.png"
                    alt="Start Background Image"
                    className={styles.image}
                />
                <div className={styles.click}>Touch the screen to begin!</div>
                <div className={styles.overlay}></div>
            </div>
        </div>
    );
}

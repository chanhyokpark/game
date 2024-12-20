'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './main.module.css';

export default function Home() {
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);
    const [showStartMessage, setShowStartMessage] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setScrollY(y);
            setShowStartMessage(y <= 100);
        };

        // 스크롤 이벤트 추가
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = () => {
        if (scrollY <= 100) {
            // 클릭 시 게임 시작
            router.push('/game');
        }
    };

    return (
        <div className={styles.mainContainer} onClick={handleClick}>
            <section className={styles.heroSection}>
                <div className={styles.imageContainer}>
                    <div className={styles.title}>ALTAIR</div>
                    <img
                        src="/start.png"
                        alt="Start Background Image"
                        className={styles.image}
                    />
                    {showStartMessage && (
                        <div className={styles.click}>
                            Click the screen to start the game!<br />
                            Scroll down to see more options!
                        </div>
                    )}
                    <div className={styles.overlay}></div>
                </div>
            </section>

            <section className={`${styles.contentSection} ${scrollY > 300 ? styles.visible : ''}`}>
                <div className={styles.gameIntro}>
                    <h2>게임 소개</h2>
                    <p>알타이르의 세계에 오신 것을 환영합니다!</p>
                    <p>알타이르에서 여러분은 가까운 미래의 월면도시(月面都市)를 배경으로 저항단의 일원이 되어 지배층에 맞서 싸우게 됩니다. 단 한 번의 잘못된 선택으로 죽음을 맞이할지 모르는 복잡한 월면도시에서 살아남아 목표를 완수할 수 있을까요? 행운을 빕니다!</p>
                    <div className={styles.links}>
                        <Link
                            href="https://drive.google.com/file/d/1ylxtDtMHcNWbuiU3BXT2WQTXZBQ2rT1X/view?usp=sharing"
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.button}
                        >
                            설정집
                        </Link>
                        <Link href="/game" className={styles.button}>
                            게임 시작하기
                        </Link>
                        <Link href="/diary" className={styles.button}>
                            개발진 인터뷰
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

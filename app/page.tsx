'use client';

import resets from './_resets.module.css';
import { Ellipse1 } from './Ellipse1/Ellipse1';
import { Heart3_Property1Default } from './Heart3_Property1Default/Heart3_Property1Default';
import classes from './MainDesign.module.css';
import { SpotlightIcon } from './SpotlightIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import { Engine } from '@/lib/engine';
import { ConstantString, VariableString } from '@/lib/interfaces';
import { useMemo, useState } from 'react';
import Image from 'next/image'

interface Props {
    className?: string;
}

const engine = new Engine();

export default function Page() {
    const [hideImage, setHideImage] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Query string에서 데이터 불러옴
    const id = searchParams.get('id') ?? '_begin';
    const rawItems = searchParams.get('item') ?? '';
    const arrayItems = rawItems?.split(',').map((item) => {
        const [key, value] = item.split(':');
        return { key, value };
    })!;
    const items = arrayItems.reduce((acc: { [key: string]: number }, cur) => {
        if (cur.key) acc[cur.key] = parseInt(cur.value);
        return acc;
    }, {});

    // 엔진 초기화
    engine.items = items;
    engine.currentNode = engine.getText(id as VariableString);

    // UI에 표시할 정보들
    const nodeInfo = useMemo(() => engine.getCurrentNodeInfo(), [engine.currentNode]);
    const branchData = nodeInfo.branchData;
    const branchText = branchData.map((data) => engine.getBranchText(data.branch));
    const inventoryItems = engine.getAllItemInfo();
    //인벤토리에 없지만 ui에 표시할 정보들은 직접 가져와야 함, 예시:
    const hp = engine.items.hp ?? 0; //items가 아니라 무조건 engine.items로 가져와야 함
    const dead = !!engine.items.dead;
    //이 분기로 진입한 시점에서 아이템 변화량 가져오기(아이템의 숨김 여부와 무관하게 모든 아이템이 {key: delta} 형태로 반환됨, 아이템 정보는 getItemInfo로 직접 가져와야 함)
    const itemDelta = engine.itemDelta;

    // 인벤토리 상태
    const [isInventoryOpen, setInventoryOpen] = useState(false);

    function toggleInventory() {
        setInventoryOpen(!isInventoryOpen);
    }

    function onClickBranch(idx: number) {
        engine.processBranch(branchData[idx].branch);
        engine.currentNode = '_after_branch' as ConstantString;
        engine.getNode();
        const nextParams = new URLSearchParams();
        nextParams.set('id', engine.currentNode);
        nextParams.set(
            'item',
            Object.entries(engine.items)
                .map(([key, value]) => `${key}:${value}`)
                .join(',')
        );
        window.history.pushState(null, '', `?${nextParams}`);
    }

    console.log(itemDelta);
    return (
        <div className={''}>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 ${resets.clapyResets} ${classes.root} max-w-screen max-h-screen aspect-[430/932]`}>
                <div className={classes.sCREEN}></div>
                <div className={classes.mID}></div>
                <div className={classes.TOP}></div>
                <div className={classes.BOTTOM}></div>
                {/*<Ellipse1 />*/}
                <div className={classes.circle22}></div>
                <div className={classes.bag} onClick={toggleInventory}></div> {/* 가방 클릭으로 인벤토리 열기 */}
                (!hideImage && (
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={nodeInfo.imageSrc ? nodeInfo.imageSrc : "/assets/draw_01.png"}
                    width={2000}
                    height={2000}
                    alt="게임 이미지"
                    className={classes.draw_01}
                    onError={() => {
                        setHideImage(true);
                        console.log("Debug");
                    }}
                />
                ))
                {/*<div className={`${classes.draw_01} bg-[url('assets/draw_01.png')]`}></div>*/}
                <div className={classes.unnamed}>
                    <div className="flex-col">
                        {nodeInfo.text.split('\\n').map((item, idx) => (
                           <p className={classes.textBlock3} key={idx}>
                               {item}
                           </p>
                        ))}
                    </div>

                    {/* Choices Panel */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg mt-6">
                        <div className="flex-col gap-3">
                            {branchData.map((branch, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !branch.disabled && onClickBranch(idx)}
                                    className={`w-full text-left p-3 rounded transition-colors ${
                                        branch.disabled
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-700 hover:bg-gray-600 text-white cursor-pointer'
                                    }`}
                                >
                                {branchText[idx]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/*/!* 게임 화면 내부 작은 인벤토리 창 *!/*/}
                {/*{isInventoryOpen && (*/}
                {/*    <div*/}
                {/*        className="absolute top-[10%] right-[0%] w-[100%] h-[60%] bg-red-400 z-500 overflow-y-auto p-4 rounded-lg shadow-lg border border-gray-300"*/}
                {/*        onClick={(e) => e.stopPropagation()}*/}
                {/*    >*/}
                {/*        /!* 내부를 완전히 가리는 덮개 *!/*/}
                {/*        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-100 z-50"></div>*/}

                {/*        /!* 실제 콘텐츠 *!/*/}
                {/*        <div className="flex flex-col gap-3 relative z-10">*/}
                {/*            <h2 className="col-span-3 text-lg font-bold mb-4 text-black">Inventory</h2>*/}
                {/*            {inventoryItems.map((item, idx) => (*/}
                {/*                <div*/}
                {/*                    key={idx}*/}
                {/*                    className="flex items-center gap-4 p-2 bg-red-300 rounded-md"*/}
                {/*                >*/}
                {/*                    {item.imageSrc && (*/}
                {/*                        <img*/}
                {/*                            src={item.imageSrc}*/}
                {/*                            alt={item.name}*/}
                {/*                            className="w-8 h-8"*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*                    <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-4 items-center">*/}
                {/*                        <h3 className="text-sm font-semibold text-black text-left">*/}
                {/*                            {item.name}*/}
                {/*                        </h3>*/}
                {/*                        <p className="text-xs text-gray-600 text-left">*/}
                {/*                            {item.description ?? 'No description'}*/}
                {/*                        </p>*/}
                {/*                        <div className="text-gray-800 text-sm text-right">*/}
                {/*                            x{item.count}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                    <div className={`absolute ${classes.spotlight}`}>
                        <SpotlightIcon className={classes.icon4} />
                    </div>
                {/*<div className={classes.lines}>*/}
                {/*    <LinesIcon className={classes.icon5} />*/}
                {/*</div>*/}
                <div className={`absolute ${classes.noise}`}></div>
                <div className={classes.setting}></div>
                {/*<div className={classes.inventory_01}></div>*/}
                {/*<div className={classes.inventory_02}></div>*/}
                {/*<div className={classes.inventory_03}></div>*/}
                {/*<div className={classes.icon_01}></div>*/}
                {/*<div className={classes.icon_02}></div>*/}
                {/*<div>*/}
                {/*    {Object.entries(itemDelta)*/}
                {/*        .filter(([item]) => {*/}
                {/*            console.log('Checking item:', item);*/}
                {/*            const result = engine.getItemInfo(item as VariableString);*/}
                {/*            console.log('Result for', item, ':', result);*/}
                {/*            return result !== null;*/}
                {/*        })*/}
                {/*        .map(([item, count], idx) => (*/}
                {/*            <div key={idx} className={classes._6}>*/}
                {/*                {item + " +" + String(count)}*/}
                {/*            </div>*/}
                {/*        ))}*/}

                {/*</div>*/}
                {/*<div className={classes._5}>생수 +5</div>*/}
                {/*<div className={classes._2}>온더락잔 +2</div>*/}
                {/*<div className={classes._1}>비치발리볼 공 +1</div>*/}
                {/*<Heart3_Property1Default*/}
                {/*    className={classes.heart3}*/}
                {/*    classes={{ image3: classes.image3, image4: classes.image4, image5: classes.image5 }}*/}
                {/*/>*/}

            </div>
        </div>
    );
}

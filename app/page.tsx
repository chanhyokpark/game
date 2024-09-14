'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Engine } from '@/lib/engine';
import { ConstantString, VariableString } from '@/lib/interfaces';

const engine = new Engine();
export default function Home() {
    const searchParams = useSearchParams();
    const router = useRouter();

    //query string에서 데이터 불러옴
    const id = searchParams.get('id') ?? '_begin';
    const rawItems = searchParams.get('item') ?? ''; //item1:2,item2:3
    const arrayItems = rawItems?.split(',').map((item) => {
        const [key, value] = item.split(':');
        return { key, value };
    })!;
    const items = arrayItems.reduce((acc: { [key: string]: number }, cur) => {
        if(cur.key) acc[cur.key] = parseInt(cur.value);
        return acc;
    }, {});

    //엔진 초기화
    engine.items = items;
    engine.currentNode = engine.getText(id as VariableString);

    //UI에 표시할 정보들
    const nodeInfo = engine.getCurrentNodeInfo(); //노드 처리하고, 노드 정보 가져옴
    const branchData = nodeInfo.branchData; //분기 목록(숨겨짐 설정된 분기는 미포함)
    const branchText = branchData.map((data) => engine.getBranchText(data.branch)); //분기 텍스트 목록
    const inventoryItems = engine.getAllItemInfo(); //모든(표준 인벤토리에 표시할) 아이템 정보 가져옴 (만약 특정 아이템을 툴팁 등지에 표시하려면 getItemInfo(key as VariableString) 사용)
    //인벤토리에 없지만 ui에 표시할 정보들은 직접 가져와야 함, 예시:
    const hp = engine.items.hp ?? 0; //items가 아니라 무조건 engine.items로 가져와야 함
    const dead = !!engine.items.dead;
    //이 분기로 진입한 시점에서 아이템 변화량 가져오기(아이템의 숨김 여부와 무관하게 모든 아이템이 {key: delta} 형태로 반환됨, 아이템 정보는 getItemInfo로 직접 가져와야 함)
    const itemDelta = engine.itemDelta;


    function onClickBranch(idx: number) { //분기 클릭했을 때 호출
        engine.processBranch(branchData[idx].branch);
        engine.currentNode = '_after_branch' as ConstantString;
        engine.getNode();
        const nextParams = new URLSearchParams();
        nextParams.set('id', engine.currentNode);
        nextParams.set('item', Object.entries(engine.items).map(([key, value]) => `${key}:${value}`).join(','));
        window.history.pushState(null, '', `?${nextParams}`);
    }

    return (
        <div className="p-3">
            <h1 className="text-3xl">Game Interface</h1>
            <h2 className="text-xl">Description</h2>
            <div className="p-4 border-2 border-gray-600">
                <p>{nodeInfo.text}</p>
            </div>
            <h2 className="text-xl">Image</h2>
            <div className="p-4 border-2 border-gray-600">
                <p>
                    {nodeInfo.imageSrc ?  `(Image in ${nodeInfo.imageSrc})`: 'No image'}
                </p>
            </div>
            <h2 className="text-xl">Selection</h2>
            <div className="p-4 border-2 border-gray-600">
                <ul className="ml-3">
                    {branchData.map((branch, idx) => (
                        <li key={idx} className="list-disc">
                            <a className={branch.disabled ? 'text-gray-400' : 'text-blue-500'} role="button"
                               onClick={() => onClickBranch(idx)}>{branchText[idx]}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="text-xl">Items</h2>
            <div className="p-4 border-2 border-gray-600">
                <ul>
                    {Object.entries(items).map(([key, value]) => (
                        <li key={key}>{key}: {value}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-row justify-between">
                <h2 className={'text-xl'}>Logs</h2>
                <a onClick={() => {
                    engine.logs = [];
                    router.refresh();
                }} role="button" className="text-blue-500">Clear</a>
            </div>
            <div className="p-4 border-2 border-gray-600">
                <ul>
                    {engine.logs.map((log, idx) => (
                        <li key={idx}>{log}</li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

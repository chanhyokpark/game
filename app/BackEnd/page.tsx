'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
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
    const nodeInfo =  useMemo(()=>engine.getCurrentNodeInfo(), [engine.currentNode]); //노드 처리하고, 노드 정보 가져옴
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

    /*return (
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
            <h2 className="text-xl">Inventory</h2>
            <div className="p-4 border-2 border-gray-600">
                <ul>
                    {inventoryItems.map((item) => (
                        <li key={item.name}>{item.name}({item.count}): {item.description}</li>
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

    );*/
    const tmp = branchData.map((branch, idx) => (
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
    ))

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
                {/* Left Column - Stats & Inventory */}
                <div className="col-span-1 space-y-4">
                    {/* Stats Panel */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">Character Stats</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>HP</span>
                                <div className="w-32 h-4 bg-gray-700 rounded">
                                    <div
                                        className="h-full bg-red-600 rounded"
                                        style={{width: `${Math.max(0, Math.min(100, hp))}%`}}
                                    />
                                </div>
                            </div>
                            {Object.entries(items).map(([key, value]) => (
                                key !== 'hp' && (
                                    <div key={key} className="flex justify-between items-center">
                                        <span className="capitalize">{key}</span>
                                        <span className="text-yellow-400">{value}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Inventory Panel */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">Inventory</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {inventoryItems.map((item) => (
                                <div
                                    key={item.name}
                                    className="bg-gray-700 p-2 rounded hover:bg-gray-600 cursor-pointer transition-colors"
                                    title={item.description || ''}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="capitalize">{item.name}</span>
                                        <span className="text-yellow-400">{item.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Column - Main Game Content */}
                <div className="col-span-2 space-y-4">
                    {/* Image Panel */}
                    {nodeInfo.imageSrc && (
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-64 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                {nodeInfo.imageSrc ? `(Image: ${nodeInfo.imageSrc})` : 'No image available'}
                            </div>
                        </div>
                    )}

                    {/* Story Text Panel */}
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <p className="text-lg leading-relaxed">{nodeInfo.text}</p>
                    </div>

 {/* Choices Panel */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">What will you do?</h2>
                        <div className="space-y-2">
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

                    {/* Game Log Panel */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-bold text-yellow-400">Game Log</h2>
                            <button
                                onClick={() => {
                                    engine.logs = [];
                                    router.refresh();
                                }}
                                className="text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                                Clear Log
                            </button>
                        </div>
                        <div className="h-32 overflow-y-auto space-y-1">
                            {engine.logs.map((log, idx) => (
                                <p key={idx} className="text-sm text-gray-400">{log}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
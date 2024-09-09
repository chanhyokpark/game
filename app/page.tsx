'use client';
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") ?? '0';
    const items = searchParams.getAll("item");
    useEffect(() => {

    }, []);
    return (
        <div className="p-3">
            <h1 className="text-3xl">Game Interface</h1>
            <h2 className="text-xl">Description</h2>
            <div className="p-4 border-2 border-gray-600">
                <p>hello world</p>
            </div>
            <h2 className="text-xl">Image</h2>
            <div className="p-4 border-2 border-gray-600">
                <p>image</p>
            </div>
            <h2 className="text-xl">Selection</h2>
            <div className="p-4 border-2 border-gray-600">
                <ul className="ml-3">
                    <li className="list-disc">a</li>
                    <li className="list-disc">b</li>
                </ul>
            </div>
            <h2 className="text-xl">Items</h2>
            <div className="p-4 border-2 border-gray-600">
                <ul>
                    <li>item1: 2</li>
                    <li>item2: 3</li>
                </ul>
            </div>
        </div>

    );
}

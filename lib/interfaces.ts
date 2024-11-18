export type Condition = VariableString | boolean | number;
//export type VariableString = string;
export type VariableString = string & { __brand: 'VariableString' }; //동적 문자열, 표시하기 전 반드시 치환해야 함
export type ConstantString = string & { __brand: 'ConstantString' }; //처리된 문자열

export interface Branch {
    text: VariableString;
    id: VariableString;
    cond?: Record<VariableString, Condition>;
    hide?: boolean;
    set?: Record<VariableString, Condition>;
}

export interface ItemData {
    name?: VariableString;
    description?: VariableString;
    image?: VariableString;
    hide?: boolean;
}

export interface ItemInfo {
    name: ConstantString;
    description: ConstantString | null;
    imageSrc: ConstantString | null;
    count: number;
}

export interface Dest {
    cond?: Record<VariableString, Condition>;
    id: VariableString;
    weight?: number;
    set?: Record<VariableString, Condition>;
}

export interface Node {
    text: VariableString;
    image?: VariableString;
    branch?: Branch[];
    random?: boolean;
    dest?: Dest[];
    next?: Branch;
    set?: Record<VariableString, Condition>;
    hide?: boolean;
}

export interface TextSelector {
    cond?: Record<VariableString, Condition>;
    text: VariableString;
}

export interface NodeInfo {
    text: ConstantString;
    imageSrc: string | null;
    branchData: { branch: Branch, disabled: boolean }[];
}

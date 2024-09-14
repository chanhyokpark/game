import {
    Branch,
    Condition,
    ConstantString,
    Dest, ItemData,
    ItemInfo,
    Node,
    TextSelector,
    VariableString,
} from '@/lib/interfaces';
import yaml from 'js-yaml';
import { rawGameData } from '@/config/resources';

export class DataLoader {
    nodes: { [key: string]: Node };
    textSelectors: { [key: string]: TextSelector[] };
    itemData: { [key: string]: ItemData };

    constructor(dataYAML: string) {
        this.nodes = {};
        this.textSelectors = {};
        this.itemData = {};
        const data = yaml.load(dataYAML) as any;
        if (data.nodes) {
            this.nodes = data.nodes;
        }
        if (data.texts) {
            this.textSelectors = data.texts;
        }
        if (data.items) {
            this.itemData = data.items;
        }
        console.log(this.nodes);
    }
}

const loadedData = new DataLoader(rawGameData);

export function weightedRandom(items: any[], weights: number[]) {
    if (items.length !== weights.length) {
        throw new Error('Items and weights must be of the same size');
    }

    if (!items.length) {
        throw new Error('Items must not be empty');
    }

    // Preparing the cumulative weights array.
    // For example:
    // - weights = [1, 4, 3]
    // - cumulativeWeights = [1, 5, 8]
    const cumulativeWeights: any[] = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
    }

    // Getting the random number in a range of [0...sum(weights)]
    // For example:
    // - weights = [1, 4, 3]
    // - maxCumulativeWeight = 8
    // - range for the random number is [0...8]
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
    const randomNumber = maxCumulativeWeight * Math.random();

    // Picking the random item based on its weight.
    // The items with higher weight will be picked more often.
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
            return {
                item: items[itemIndex],
                index: itemIndex,
            };
        }
    }
    throw new Error();
}

export class Engine {
    nodes: { [key: string]: Node };
    textSelectors: { [key: string]: TextSelector[] };
    items: { [key: string]: number };
    itemData: { [key: string]: ItemData };
    currentNode: ConstantString;

    logs: string[] = [];
    itemDelta: { [key: string]: number } = {};


    processDest(random: boolean, dests: Dest[]) {
        const availableDests = dests.filter(d => this.evaluateConditions(d.cond ?? {}));
        if (!availableDests) {
            throw new Error('no available destinations');
        }
        let selectedDest: Dest;
        if (random) {
            const indexes = availableDests.map((_, i) => i);
            const weights = availableDests.map(d => d.weight ?? 1);
            const result = weightedRandom(indexes, weights);
            selectedDest = availableDests[result.item];
        } else {
            selectedDest = availableDests[0];
        }
        this.applyConditions(selectedDest.set ?? {});
        this.currentNode = this.getText(selectedDest.id);
    }

    getBranchText(branch: Branch) {
        let text = this.getText(branch.text ?? '다음');
        return text;
    }

    getNode() {
        let node;
        for(let i = 0; i < 1000; i++) {
            console.log(this.currentNode);
            console.log(this.items);
            if (this.currentNode === '_prev') {
                const prevIdx = this.items['_prev_idx'];
                this.currentNode = Object.keys(this.nodes)[prevIdx] as ConstantString;
                this.items['_prev_idx'] = -1;
            } else if (this.currentNode === '_restart') {
                this.items = {};
                this.currentNode = '_begin' as ConstantString;
            } else {
                node = this.nodes[this.currentNode];
                if(this.currentNode != '_after_branch' && this.logs[this.logs.length - 1] != `Current node: ${this.currentNode}`) {
                    this.logs.push(`Current node: ${this.currentNode}`);
                }
                if (!node) {
                    throw new Error(`Node not found: ${this.currentNode}`);
                }
                if(node.dest) {
                    this.processDest(node.random ?? false, node.dest);
                } else {
                    return node;
                }
            }
        }
        throw new Error('Infinite loop detected');
    }

    getCurrentNodeInfo() {
        const node = this.getNode();
        let text = this.getText(node.text);
        let image = node.image ? this.getText(node.image) : null;
        let imageSrc = image ? `/images/${image}.png` : null;
        this.logs.push('Available branches:');
        let branches = node.branch ?? [node.next!];
        let branchData: { branch: Branch, disabled: boolean }[] = [];
        for (let b of branches) {
            if (this.evaluateConditions(b.cond ?? {})) {
                branchData.push({ branch: b, disabled: false });
                this.logs.push(`- ${b.text ?? '(no text)'} (available)`);
            } else {
                if (!b.hide) {
                    branchData.push({ branch: b, disabled: true });
                    this.logs.push(`- ${b.text ?? '(no text)'} (unavailable)`);
                } else {
                    this.logs.push(`- ${b.text ?? '(no text)'} (unavailable, hidden)`);
                }
            }
        }
        return { text: text, imageSrc: imageSrc, branchData: branchData };
    }

    processBranch(branch: Branch) {
        this.itemDelta = {};
        this.logs.push(`Selected branch: ${branch.text ?? '(no text)'}`);

        this.applyConditions(branch.set ?? {});
        let nextNode = this.getText(branch.id);
        if (this.items['_prev_idx'] === -1) {
            //this.applyConditions({ _prev_idx: Object.keys(this.nodes).findIndex(v => v == nextNode) });
            this.items['_prev_idx'] = Object.keys(this.nodes).findIndex(v => v == nextNode);
        }
    }

    getText(text: VariableString): ConstantString {
        text = text.replace(/\{\{(.*?)}}/g, (match, p1) => {
            return '' + this.items[this.getText(p1)] ?? 0;
        }) as VariableString;
        text = text.replace(/\{\$(.*?)}/g, (match, p1) => {
            return this.getText(('$'+p1) as VariableString);
        }) as VariableString;
        if(!text.startsWith('$')) {
            return `${text}` as ConstantString;
        }
        const textId = text.slice(1);
        const textSelector = this.textSelectors[textId];
        if (!textSelector) {
            this.logs.push(`Processed text: ${textId} -> (not found)`);
            return `알 수 없는 텍스트: ${textId}` as ConstantString;
        }
        const availableTexts = textSelector.filter(d => this.evaluateConditions(d.cond ?? {}));
        let selectedText = availableTexts[0].text ?? `조건에 만족하는 텍스트가 없음: ${textId}`;
        let result = this.getText(selectedText);
        this.logs.push(`Processed text: ${textId} -> ${result}`);
        return result;
    }

    /*constructor(items: { [key: string]: number }, currentNode: string) {
        this.nodes = loadedData.nodes;
        this.items = items;
        this.textSelectors = loadedData.textSelectors;
        this.currentNode = currentNode;
    }*/
    constructor() {
        this.nodes = loadedData.nodes;
        this.items = {};
        this.textSelectors = loadedData.textSelectors;
        this.itemData = loadedData.itemData;
        this.currentNode = '_begin' as ConstantString;
    }


    evaluateCondition(origKey: VariableString, cond: Condition): boolean {
        let key = this.getText(origKey);
        const value = this.items[key];
        if (typeof cond === 'string') {
            if (cond.startsWith('!')) {
                return value !== +this.getText(cond.slice(1) as VariableString);
            }
            if (cond.startsWith('>=')) {
                return +value >= +this.getText(cond.slice(2) as VariableString);
            }
            if (cond.startsWith('<=')) {
                return +value <= +this.getText(cond.slice(2) as VariableString);
            }
            if (cond.startsWith('>')) {
                return +value > +this.getText(cond.slice(1) as VariableString);
            }
            if (cond.startsWith('<')) {
                return +value < +this.getText(cond.slice(1) as VariableString);
            }
            return value === +this.getText(cond);
        } else if (typeof cond === 'boolean') {
            if (cond) {
                return !!value;
            } else {
                return !value;
            }
        } else {
            return value === +cond;
        }

    }

    evaluateConditions(conditions: Record<VariableString, Condition>): boolean {
        for (const key in conditions) {
            if (!this.evaluateCondition(key as VariableString, conditions[key as VariableString])) {
                return false;
            }
        }
        return true;
    }

    applyCondition(origKey: VariableString, cond: Condition) {
        let key = this.getText(origKey);
        if(!this.items[key]) {
            this.items[key] = 0;
        }
        const prevValue = this.items[key];
        if (typeof cond === 'string') {
            if (cond.startsWith('+=')) {
                this.items[key] += +this.getText(cond.slice(2) as VariableString);
                console.log(`${key} += ${cond.slice(2)}`);
                this.logs.push(`${key} += ${cond.slice(2)}`);
            } else if (cond.startsWith('-=')) {
                this.items[key] -= +this.getText(cond.slice(2) as VariableString);
                console.log(`${key} -= ${cond.slice(2)}`);
                this.logs.push(`${key} -= ${cond.slice(2)}`);
            } else if(cond.startsWith('*=')) {
                this.items[key] *= +this.getText(cond.slice(2) as VariableString);
                console.log(`${key} *= ${cond.slice(2)}`);
                this.logs.push(`${key} *= ${cond.slice(2)}`);
            } else if(cond.startsWith('/=')) {
                this.items[key] /= +this.getText(cond.slice(2) as VariableString);
                this.items[key] = Math.floor(this.items[key]);
                console.log(`${key} /= ${cond.slice(2)}`);
                this.logs.push(`${key} /= ${cond.slice(2)}`);
            } else {
                this.items[key] = +this.getText(cond);
            }
        } else if (typeof cond === 'boolean') {
            this.items[key] = +cond;
            console.log(`${key} = ${cond}`);
            this.logs.push(`${key} = ${cond}`);
        } else {
            this.items[key] = +cond;
            console.log(`${key} = ${cond}`);
            this.logs.push(`${key} = ${cond}`);
        }
        this.itemDelta[key] = (this.itemDelta[key] ?? 0) + this.items[key] - prevValue;
    }

    applyConditions(conditions: Record<VariableString, Condition>) {
        if(Object.keys(conditions).length > 0) {
            this.logs.push('Applying conditions:');
        }
        for (const key in conditions) {
            this.applyCondition(key as VariableString, conditions[key as VariableString]);
        }
    }

    getAllItemInfo(): ItemInfo[] {
        //인벤토리에 표시할 모든 아이템 정보를 리턴함
        const itemInfo: ItemInfo[] = [];
        for (const key in this.items) {
            if (this.items[key] > 0) {
                const data = this.itemData[key];
                if(!data) continue;
                if(!data.hide) {
                    itemInfo.push({
                        name: this.getText((data.name ?? key) as VariableString),
                        description: data.description ? this.getText(data.description) : null,
                        imageSrc: data.image ? `/images/${this.getText(data.image)}.png` as ConstantString : null,
                        count: this.items[key],
                    });
                }
            }
        }
        return itemInfo;
    }

    getItemInfo(origKey: VariableString): ItemInfo | null {
        //특정 아이템 정보를 인벤토리에 없어도 리턴함(숨겨진 아이템이면 null, key에는 동적 문자열 사용 가능)
        let key = this.getText(origKey);
        const data = this.itemData[key];
        if(!data) return null;
        if(data.hide) {
            return null;
        }
        return {
            name: this.getText((data.name ?? key) as VariableString),
            description: data.description ? this.getText(data.description) : null,
            imageSrc: data.image ? `/images/${this.getText(data.image)}.png` as ConstantString : null,
            count: this.items[key] ?? 0,
        };
    }


}
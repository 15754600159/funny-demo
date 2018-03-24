// 自己实现react virtualDOM diff算法

/* @jsx h */
function h(type, props, ...children) {
    return {type, props, children};
};

function creatElement(node) {
    // 如果只是个字符串
    if(typeof node === 'string') {
        return document.createTextNode(node);
    };

    // 如果是html节点的形式
    const $el = document.createElement(node.type);
    node.children.map(creatElement)
        .forEach($el.appendChild.bind($el));
    return $el;
};

// diff算法
function changed(nodeNew, nodeOld) {
    return typeof nodeNew !== typeof nodeOld || 
        typeof nodeNew === 'string' && nodeNew !== nodeOld ||
        nodeNew.type !== nodeOld.type;
};

// 更新算法
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) { // 原本的节点没有，那么插入新的节点
        $parent.appendChild(
            creatElement(newNode)
        );
    } else if (!newNode) { // 新的节点没有内容，旧的节点就应该移除
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) { // 比较两个新旧节点是否有变
        $parent.replaceChild(
            creatElement(newNode), // 新节点
            $parent.childNodes[index] // 旧节点
        );
    } else if (newNode.type) { // 递归处理自身的子节点
        const newNodeLength = newNode.children.length,
            oldNodeLength = oldNode.children.length;
        for (let i = 0; i < newNodeLength || i < oldNodeLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
};

const list = (
    <ul>
        <li>苹果</li>
        <li>西瓜</li>
    </ul>
);
const newList = (
    <ul>
        <li>苹果</li>
        <li>荔枝</li>
    </ul>
);

const $root = document.getElementById('root');
updateElement($root, list);

const $reload = document.getElementById('reload');
$reload.addEventListener('click', () => {
    updateElement($root, newList, list);
});
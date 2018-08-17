// 散列表：将key转化为数字，然后将value存储到数组中，数组取值更快速；
function HashTable() {
    let table = [];
    const loseloseHashCode = function(key) {
        let hash = 0;
        key.split('').forEach((elem, index) => hash += key.charCodeAt(index));
        return hash % 37;
    };
    this.put = function(key, value) {
        const position = loseloseHashCode(key);
        table[position] = value;
    };
    this.get = function(key) {
        return table[loseloseHashCode(key)];
    };
    this.remove = function(key) {
        table[loseloseHashCode(key)] = undefined;
    };
}

const djb2HashCode = function(key) {
    let hash = 5381;
    key.split('').forEach((elem, index) => hash = hash * 33 + key.charCodeAt(index));
    return hash % 1013;
}
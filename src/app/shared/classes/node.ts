import * as _ from 'lodash';

export class Node {
  name: string;
  value: string;
  parent: Node;
  level: number;
  type: string;
  index: number;
  path = [];
  children: Array<Node> = [];

  private isDirty = false;

  constructor(name, value, parent, level) {
    this.name = name;
    this.value = value;
    this.parent = parent;
    this.level = level;

  }

  addChild(child: Node) {
    this.children.push(child);
  }

  cloneNode(): Node {
    let _node =  new Node(this.name, this.value, this.parent, this.level);
    _node.index = this.index;
    _node.path = this.path;
    _node.type = this.type;
    _node.children = this.children.map(child => {
      return child.cloneNode();
    });
    return _node;
  }

  toJS(obj={}): Object {
    if (this.type === 'array') {
      obj[this.name] = [].concat(this.children.map(child => {
        return child.toJS()[this.name];
      }));
    } else if (this.type === 'object') {
      obj[this.name] = this.children.map(child => {
        return child.toJS();
      }).reduce((pre, cur) => {
        return Object.assign(pre, cur);
      }, {});
    } else {
      return {[this.name]: this.value}
    }
    return obj['root'] ? obj['root'] : obj;
  }

  trimNode() {
    if (this.clearNulls()) {
      this.trimNode();
    }
  }

  clearNulls() {
    for (let i = 0; i < this.children.length; ++i) {
      let child = this.children[i];
      if (child.children.length  === 0 && child.type) {
        this.children.splice(i, 1);
        return true;
      } else {
        let res = child.clearNulls();
        if(res) {
          return res;
        }
      }
    }
    return false;
  }
}

export class Tree {
  tree: Node;

  constructor(tree: Node) {
    this.tree = tree;
  }
}
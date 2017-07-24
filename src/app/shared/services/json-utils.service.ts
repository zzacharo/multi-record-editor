import { Injectable } from '@angular/core';
import { SchemaKeysStoreService } from './schema-keys-store.service';
import * as _ from 'lodash';
import { Node } from '../classes/node';

@Injectable()
export class JsonUtilsService {

  constructor(public schemaKeysStoreService:SchemaKeysStoreService) { }

  filterJson(json: {}, tags: Array<Array<string>>) {
    let tree = this.buildTreeForJson(json);
    return this.bfsTraverse(tree, this.tagFilter(tags));
  }

  buildTreeForJson(json, currentNode?: Node, level=0) {
    if (!currentNode) {
      currentNode = new Node('root', json, null, level);
      currentNode.type = 'object';
    }

    if (Array.isArray(json)) {
      currentNode.type = 'array';
      json.forEach((value, index) => {
        let childNode = new Node(currentNode.name, value, currentNode, level);
        childNode.index = index;
        childNode.path = currentNode.path.concat([index]);
        currentNode.addChild(childNode);
        this.buildTreeForJson(value, childNode, level)
      })
    } else if (typeof json === 'object') {
      currentNode.type = 'object';
      Object.keys(json).forEach(key => {
        let childNode = new Node(key, json[key], currentNode, level);
        childNode.path = currentNode.path.concat([key]);
        currentNode.addChild(childNode);
        this.buildTreeForJson(json[key], childNode, level+1);
      })
    }
    return currentNode;
  }

  bfsTraverse(tree, callback) {
    let queue = [tree.cloneNode()];
    while (queue.length > 0) {
      let current = queue.shift();
      let filteredChildren = [];
      current.children.forEach(child => {
        if (child.index !== undefined) {
          filteredChildren.push(child);
        } else {
          let [pushChild, notPrune] = callback(child.name, child.level);
          if (notPrune) {
            if (pushChild) {
              filteredChildren.push(child);
            }
          } else {
            this.pruneTreePathRecursively(tree, child.path);
          }
        }
      });
      queue = queue.concat(filteredChildren);
    }
    tree.trimNode();
    return tree.toJS();
  }

  pruneTreePathRecursively(currentNode, path) {
    for (let i = 0; i < currentNode.children.length; ++i) {
      let child = currentNode.children[i];
      if (`${child.path}` === `${path}`) {
        currentNode.children.splice(i, 1);
        return true;
      } else {
        this.pruneTreePathRecursively(child, path);
      }
    };
    return false;
  }

  tagFilter = (tags) => {
    return (name, level) => {
      let _tags = tags.filter(tag => { return tag.length > level});
      if (_.isEmpty(_tags)) {
        return [false, true]
      } else {
        return [true, _tags.some(tag => {
          return name === tag[level];
        })];
      }
    }
  };

}

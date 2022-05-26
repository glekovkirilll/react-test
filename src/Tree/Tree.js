import React, { useCallback, useState } from "react";
import TreeItem from "./TreeItem";

export default function Tree(){
    const [treeChildren, setChildren] = useState([]);
    const [newId, setNewId] = useState(0);

    const deleteChild = useCallback(id=>{
        const newChildren = treeChildren.filter(elemnt => elemnt.id !== id)
        setChildren(newChildren)
    }, [treeChildren])

    const addChild = () => {
        const id = newId;
        setNewId(newId + 1)
        let newChild={id: id }
        setChildren([...treeChildren, newChild])
    }

    return(
        <div>
            <div style={{marginBottom: '20px'}}>
                <button onClick={addChild}>Add</button>
                <button onClick={() => setChildren([])}>Reset</button>
            </div>
            {treeChildren.map(child => (<TreeItem key={child.id} deleteSelf={() => deleteChild(child.id)} parentId={child.id} />))}
        </div>
    )
}
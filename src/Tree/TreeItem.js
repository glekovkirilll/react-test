import React, { useCallback, useState } from "react";

export default function TreeItem({deleteSelf, parentId}){
    const [treeChildren, setChildren] = useState([]);
    const [treeName, setName] = useState('New item');
    const [isShowCildren, setIsShowChildren] = useState(true);
    const [isEditingName, setEditingName] = useState(false);
    const [newId, setNewId] = useState(0);

    const deleteChild = useCallback(id=>{
        const newChildren = treeChildren.filter(elemnt => elemnt.id !== id)
        setChildren(newChildren)
    }, [treeChildren])

    const addChild = () => {
        const id = newId;
        setNewId(newId + 1)
        let newChild={id: parentId + '_' + id }
        setChildren([...treeChildren, newChild])
    }

    return(
        <div style={{ paddingLeft: "10px"}}>
            { isEditingName ? 
                <input type="text" value={treeName} onChange={(e)=>setName(e.target.value)}></input> :                
                <span className="Name" onClick={() => setIsShowChildren(!isShowCildren)}>{treeName}</span>
            }

            {
                isEditingName?
                    <button onClick={() => setEditingName(!isEditingName)}>Apply </button>: 
                    <button onClick={() => setEditingName(!isEditingName)}>Edit </button>
            }

            <button onClick={addChild}>Add</button>
            
            <button onClick={deleteSelf}>Delete</button>
            {/* {isShowCildren ? treeChildren.map(child => child.element) : null} */}
            {isShowCildren ? treeChildren.map(child => (<TreeItem key={child.id} deleteSelf={() => deleteChild(child.id)} parentId={child.id} />)) : null}
        </div>
    )
}
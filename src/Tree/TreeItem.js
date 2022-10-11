import React, { useCallback, useState } from "react";

export default function TreeItem({deleteSelf, parentId, selectItem}){
    const [treeChildren, setChildren] = useState([]);
    const [treeName, setName] = useState('New item');
    const [isShowCildren, setIsShowChildren] = useState(true);
    const [isEditingName, setEditingName] = useState(false);
    const [newId, setNewId] = useState(0);
    const [isSelected, setIsSelected] = useState(false)

    const deleteChild = useCallback(id=>{
        const newChildren = treeChildren.filter(elemnt => elemnt.id !== id)
        setChildren(newChildren)
    }, [treeChildren])

    const addChild = useCallback(() => {
        const id = newId;
        setNewId(newId + 1)
        let newChild={id: parentId + '_' + id }
        setChildren([...treeChildren, newChild])
    },[])

    const handleSelect = () => {
        // setIsSelected(true)
        selectItem(() => addChild(), deleteSelf, setEditingName, setIsSelected)
    }

    return(
        <div style={{ paddingLeft: "10px"}}>
            <span className="Name" style={{backgroundColor: isSelected ? '#F08080' : 'transparent'}} onClick={() => handleSelect(true)}>{treeName}</span>

            {/* {
                isEditingName?
                    <button onClick={() => setEditingName(!isEditingName)}>Apply </button>: 
                    <button onClick={() => setEditingName(!isEditingName)}>Edit </button>
            } */}

            {isShowCildren ?
                <button onClick={() => setIsShowChildren(!isShowCildren)}>Hide </button>: 
                <button onClick={() => setIsShowChildren(!isShowCildren)}>Show </button>
            }


            <button onClick={addChild}>Add</button>
            
            <button onClick={deleteSelf}>Delete</button>
            {/* {isShowCildren ? treeChildren.map(child => child.element) : null} */}
            {isShowCildren ? treeChildren.map(child => (
                <TreeItem  
                    key={child.id} 
                    deleteSelf={() => deleteChild(child.id)} 
                    parentId={child.id} 
                    selectItem={selectItem} />
                )) : null}
        </div>
    )
}
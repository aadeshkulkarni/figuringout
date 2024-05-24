interface PillProps{
    id: string,
    tagName: string
}
export function Pill({id,tagName}:PillProps){
    return(
        <div className="p-2" key={id}> 
            <div className="bg-gray-200 p-3 rounded-3xl flex items-center justify-center text-sm">
                {tagName}
            </div>
        </div>
    )
}
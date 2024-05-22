import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"

export function Tags(){
    const { id } = useParams();
    const {blog} = useBlog({
		id: id || "",
	});

    return(
        <div className="md:flex">
            {blog.tagsOnPost.map((tagWrapper) => {
				return (
                    <div className="p-2" key={tagWrapper.tag.id}> 
                        <div className="bg-gray-200 p-3 rounded-3xl flex items-center justify-center">
                            {tagWrapper.tag.tagName}
                        </div>
                    </div>
                )
			})}
        </div>
    )
}
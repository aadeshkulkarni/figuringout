import Appbar from '../components/Appbar';
import { BACKEND_URL } from '../config';
import { useState } from 'react';
import axios from 'axios';

export const Thought = ()=>{
    const [title, setTitle] = useState<string | null>(null)
    const [content, setContent] = useState<string | null>(null)
    const [fetchedThoughts, setFetchedThoughts] = useState<{id : string, content : string}[] | null>(null)
    return (
        <div>
            <Appbar skipAuthCheck />
            <div className = "flex justify-center">
                <div>
                    <div>
                        <input type="text" placeholder="Enter your title" onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input type="text" placeholder="Enter your thought" onChange={(e)=>{setContent(e.target.value)}}/>
                    </div>
                    <div>
                        <button onChange = {async ()=>{
                            const res = await axios.post(`${BACKEND_URL}/api/v1/thought/`, {
                                content,
                                title
                            })
                            console.log(res)
                        }}>Create thought</button>
                    </div>
                    <div>
                        <button onClick = {async ()=>{
                            const thoughts = await axios.get(`${BACKEND_URL}/api/v1/thought/bulk`)
                            setFetchedThoughts(thoughts.data)
                        }}>Show all thoughts</button>
                    </div>
                    <div>
                        <button onClick = {async ()=>{
                            const res = await axios.delete(`${BACKEND_URL}/api/v1/thought/paste_id_here`)
                            console.log(res);
                        }}>Delete Thought(Paste id in axios url to delete particular)</button>
                    </div>
                    <div>
                        <button onClick = {async ()=>{
                            const res = await axios.put(`${BACKEND_URL}/api/v1/thought/`, {
                                content,
                                title
                            })
                            console.log(res);
                        }}>Update</button>
                    </div>
                    <div>
                        {fetchedThoughts?.map((t : any)=>{
                            return <div className = "py-3">
                                {/* <div>{t.title}</div> */}
                                <div>{t.content}</div>
                            </div>
                        })}
                    </div>
                </div>


            </div>
        </div>
    )
}
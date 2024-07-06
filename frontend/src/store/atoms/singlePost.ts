import { BACKEND_URL } from "@/config";
import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const SinglePost = atomFamily({
    key:"SinglePostAtom",
    default:selectorFamily({
        key:"SinglePostSelector",
        get:(id)=>async()=>{
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${String(id)}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            return res.data.post;
        }
    })
})
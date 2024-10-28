interface User {
    _id: string
    name: string

}
interface PostProps {
    _id: string
    user: User
    content: string
    likes: Array<unknown>
    comments: Array<unknown>
    createdAt: string
}
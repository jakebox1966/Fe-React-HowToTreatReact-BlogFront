import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { listPosts } from '../../modules/posts'
import PostList from '../../components/posts/PostList'

export default function PostListContainer() {
    const { username } = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()

    const posts = useSelector((state) => state.posts.posts)
    const error = useSelector((state) => state.posts.error)
    const loading = useSelector((state) => state.loading['posts/LIST_POSTS'])
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        const tag = searchParams.get('tag')
        // page가 없으면 1을 기본값으로 사용
        const page = parseInt(searchParams.get('page', 10) || 1)
        dispatch(listPosts({ tag, username, page }))
    }, [dispatch, searchParams, username])

    return <PostList loading={loading} error={error} posts={posts} showWriteButton={user} />
}

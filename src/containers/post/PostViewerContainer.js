import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readPost, unloadPost } from '../../modules/post'
import PostViewer from '../../components/post/PostViewer'
import { useParams } from 'react-router-dom'

export default function PostViewerContainer() {
    // 처음 마운트 될 때 포스트 읽기 API 요청
    const { postId } = useParams()
    const dispatch = useDispatch()
    const post = useSelector((state) => state.post.post)
    const error = useSelector((state) => state.post.error)
    const loading = useSelector((state) => state.loading['post/READ_POST'])

    useEffect(() => {
        dispatch(readPost(postId))
        // 언마운트될 때 리덕스 스토어에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost())
        }
    }, [dispatch, postId])
    return <PostViewer post={post} loading={loading} error={error}></PostViewer>
}

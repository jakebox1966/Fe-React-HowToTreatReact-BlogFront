import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readPost, unloadPost } from '../../modules/post'
import PostViewer from '../../components/post/PostViewer'
import { useNavigate, useParams } from 'react-router-dom'
import PostActionButtons from '../../components/post/PostActionButtons'
import { setOriginalPost } from '../../modules/write'
import { removePost } from '../../lib/api/posts'

export default function PostViewerContainer() {
    // 처음 마운트 될 때 포스트 읽기 API 요청
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = useSelector((state) => state.post.post)
    const error = useSelector((state) => state.post.error)
    const loading = useSelector((state) => state.loading['post/READ_POST'])
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        dispatch(readPost(postId))
        // 언마운트될 때 리덕스 스토어에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost())
        }
    }, [dispatch, postId])

    const onEdit = () => {
        dispatch(setOriginalPost(post))
        navigate('/write')
    }

    const ownPost = (user && user._id) === (post && post.user._id)

    const onRemove = async () => {
        try {
            await removePost(postId)
            navigate('/') // 홈으로 이동
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
        />
    )
}

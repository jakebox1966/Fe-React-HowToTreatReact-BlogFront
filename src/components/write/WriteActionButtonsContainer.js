import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { writePost } from '../../modules/write'
import { useEffect } from 'react'
import WriteActionButtons from './WriteActionButtons'

const WriteActionButtonsContainer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const title = useSelector((state) => state.write.title)
    const body = useSelector((state) => state.write.body)
    const tags = useSelector((state) => state.write.tags)
    const post = useSelector((state) => state.write.post)
    const postError = useSelector((state) => state.write.postError)

    //포스트 등록
    const onPublish = () => {
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        )
    }
    const onCancel = () => {
        navigate(-1)
    }

    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        if (post) {
            const { _id, user } = post
            navigate(`/@${user.username}/${_id}`)
        }
        if (postError) {
            console.log(postError)
        }
    }, [navigate, post, postError])
    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
}

export default WriteActionButtonsContainer

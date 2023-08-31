import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, login } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { useNavigate } from 'react-router-dom'
import { check } from '../../modules/user'

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    //     form: auth.login,
    //     auth: auth.auth,
    //     authError: auth.authError,
    //     user: user.user,
    // }))

    const form = useSelector((state) => state.auth.login)
    const auth = useSelector((state) => state.auth.auth)
    const authError = useSelector((state) => state.auth.authError)
    const user = useSelector((state) => state.user.user)
    // const form = useSelector(({ auth }) => ({
    //     form: auth.login,
    // }))
    // const auth = useSelector(({ auth }) => ({
    //     auth: auth.auth,
    // }))
    // const authError = useSelector(({ auth }) => ({
    //     authError: auth.authError,
    // }))
    // const user = useSelector(({ user }) => ({
    //     user: user.user,
    // }))
    const [error, setError] = useState(null)

    // 인풋 변경 이벤트 핸들러
    const onChange = (e) => {
        const { value, name } = e.target

        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        )
    }

    // 폼 등록 이벤트 핸들러
    const onSubmit = (e) => {
        e.preventDefault()
        const { username, password } = form
        dispatch(login({ username, password }))
    }

    useEffect(() => {
        console.log(authError)
    }, [authError])

    // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
    useEffect(() => {
        return () => {
            console.log(1)
            dispatch(initializeForm('login'))
        }
    }, [dispatch])

    useEffect(() => {
        if (authError) {
            console.log('오류 발생')
            console.log(authError)
            setError('로그인 실패')
            return
        }
        if (auth) {
            console.log('로그인 성공')
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    return (
        <AuthForm type="login" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    )
}

export default LoginForm

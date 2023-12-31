import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, initializeForm, register } from '../../modules/auth'
import AuthForm from '../../components/auth/AuthForm'
import { check } from '../../modules/user'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    //     form: auth.register,
    //     auth: auth.auth,
    //     authError: auth.authError,
    //     user: user.user,
    // }))

    const form = useSelector((state) => state.auth.register)
    const auth = useSelector((state) => state.auth.auth)
    const authError = useSelector((state) => state.auth.authError)
    const user = useSelector((state) => state.user.user)
    // const form = useSelector(({ auth }) => ({
    //     form: auth.register,
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

    // 컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(() => {
        return () => {
            dispatch(initializeForm('register'))
        }
    }, [dispatch])

    // useEffect(() => {
    //     console.log(error)
    // }, [error])
    // 인풋 변경 이벤트 핸들러
    const onChange = (e) => {
        const { value, name } = e.target

        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        )
    }

    // 폼 등록 이벤트 핸들러
    const onSubmit = (e) => {
        e.preventDefault()
        const { username, password, passwordConfirm } = form

        // 하나라도 비어 있다면
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요')
            return
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.')
            dispatch(changeField({ form: 'register', key: 'password', value: '' }))
            return
        }
        dispatch(register({ username, password }))
    }

    useEffect(() => {
        console.log(2)
        console.log('authError', authError)
        if (authError) {
            // 계정명이 이미 존재할 때
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정명입니다.')
                return
            }
            // 기타 이유
            setError('회원가입 실패')
            return
        }
        if (auth) {
            console.log('회원가입 성공')
            console.log(auth)
            dispatch(check())
        }
    }, [auth, authError, dispatch])

    // user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if (user) {
            console.log('check API 성공')
            console.log(user)
            navigate('/')
            try {
                localStorage.setItem('user', JSON.stringify(user))
            } catch (e) {
                console.log('localStorage is not working`')
            }
        }
    }, [navigate, user])

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    )
}

export default RegisterForm

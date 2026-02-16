import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { supabase } from '../../../lib/supabaseClient'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('right')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [fullNameError, setFullNameError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = (value) => {
    if (value !== isLogin) {
      setDirection(value ? 'left' : 'right')
      setIsAnimating(true)
      setTimeout(() => {
        setIsLogin(value)
        setIsAnimating(false)
      }, 400)
    }
  }

  const validateLoginForm = () => {
    let isValid = true
    setEmailError('')
    setPasswordError('')

    if (!email.trim()) {
      setEmailError('Please enter your email')
      isValid = false
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password')
      isValid = false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.trim() && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      isValid = false
    }
    return isValid
  }

  const validateSignUpForm = () => {
    let isValid = true
    setFullNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if (!fullName.trim()) {
      setFullNameError('Please enter your full name')
      isValid = false
    }
    if (!email.trim()) {
      setEmailError('Please enter your email')
      isValid = false
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password')
      isValid = false
    }
    if (password.trim() && password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
      isValid = false
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password')
      isValid = false
    }
    if (password.trim() && confirmPassword.trim() && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      isValid = false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.trim() && !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      isValid = false
    }
    return isValid
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const isValid = validateLoginForm()
    if (!isValid) {
      setIsLoading(false)
      return
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (authError) {
        console.error('Error signing in:', authError.message)
        alert('Email or password is incorrect')
        return
      }

      const userId = authData?.user?.id
      if (!userId) {
        console.error('User ID not found')
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (profileError || !profileData) {
        console.error('Error fetching user profile:', profileError?.message)
        alert('User profile not found')
        return
      }

      if (profileData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Unexpected login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const isValid = validateSignUpForm()
    if (!isValid) {
      setIsLoading(false)
      return
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.error('Error signing up:', authError.message)
        return
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: authData.user.id, full_name: fullName, email: email, role: 'user' },
          ])

        if (profileError) {
          console.error('Error creating user profile:', profileError.message)
          return
        }
        
        console.log('Sign up successful!')
      }
    } catch (error) {
      console.error('Unexpected sign-up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='login'>
        <div className={`login_container ${isAnimating ? `slide-out-${direction}` : `slide-in-${direction === 'left' ? 'right' : 'left'}`}`}>
          <div className='login_toggle'>
            <button
              className={`toggle_btn ${isLogin ? 'active' : ''}`}
              onClick={() => handleToggle(true)}
            >
              Sign In
            </button>
            <button
              className={`toggle_btn ${!isLogin ? 'active' : ''}`}
              onClick={() => handleToggle(false)}
            >
              Sign Up
            </button>
          </div>

          <form className='login_form' onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <div className='form_group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  type='text'
                  id='fullName'
                  placeholder='Your full name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={fullNameError ? 'input-error' : ''}
                />
                {fullNameError && <span className='error-message'>{fullNameError}</span>}
                <span className='input_border'></span>
              </div>
            )}
            <div className='form_group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='example@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? 'input-error' : ''}
              />
              {emailError && <span className='error-message'>{emailError}</span>}
              <span className='input_border'></span>
            </div>

            <div className='form_group'>
              <label htmlFor='password'>Password</label>
              <div className='password_input_wrapper'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='At least 8 characters'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? 'input-error' : ''}
                />
                <button
                  type='button'
                  className='password_toggle'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={26} /> : <AiOutlineEye size={26} />}
                </button>
              </div>
              {passwordError && <span className='error-message'>{passwordError}</span>}
              <span className='input_border'></span>
            </div>

            {!isLogin && (
              <div className='form_group'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <div className='password_input_wrapper'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    placeholder='Repeat your password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={confirmPasswordError ? 'input-error' : ''}
                  />
                  <button
                    type='button'
                    className='password_toggle'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
                {confirmPasswordError && <span className='error-message'>{confirmPasswordError}</span>}
                <span className='input_border'></span>
              </div>
            )}

            {isLogin && (
              <a href='#' className='forgot_password'>Forgot password?</a>
            )}

            {isLogin ? <button type='submit' className='submit_btn' disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                  Signing In...
                </>
              ) : 'Sign In'}
            </button> :
              <button type='submit' className='submit_btn' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                    Signing Up...
                  </>
                ) : 'Sign Up'}
              </button>}
          </form>

          <div className='login_divider'>
            <span>OR</span>
          </div>

          <div className='social_login'>
            <button className='social_btn google'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path d='M23 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12z' />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

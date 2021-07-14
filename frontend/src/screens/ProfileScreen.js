import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile
  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false
      }
    }

    return JSON.stringify(obj) === JSON.stringify({})
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (isEmpty(user)) {
        console.log('dispatch details fired ')
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, userInfo, dispatch, user])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId='name'>
            <Form.Label>Name</Form.Label>
            <FormControl
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <FormControl
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='password'>
            <Form.Label>Password</Form.Label>
            <FormControl
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <FormControl
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen

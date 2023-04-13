import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import LoadingBox from '../components/LoadingBox'
import { useUpdateProfileMutation } from '../hooks/userHooks'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function ProfilePage() {
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const [name, setName] = useState(userInfo!.name)
  const [email, setEmail] = useState(userInfo!.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      const data = await updateProfile({
        name,
        email,
        password,
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('User updated successfully')
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Update
          </Button>
          {isLoading && <LoadingBox></LoadingBox>}
        </div>
      </form>
    </div>
  )
}

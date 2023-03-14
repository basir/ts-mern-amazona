# Video-21-Create-Signin-Page

1. userHooks.ts

   ```js

    export const useSigninMutation = () =>
      useMutation({
        mutationFn: async ({
          email,
          password,
        }: {
          email: string
          password: string
        }) =>
          (
            await apiClient.post<UserInfo>(`api/users/signin`, {
              email,
              password,
            })
          ).data,
      })

   ```

2. SigninPage.ts

   ```js
      export default function SigninPage() {
        const navigate = useNavigate()
        const { search } = useLocation()
        const redirectInUrl = new URLSearchParams(search).get('redirect')
        const redirect = redirectInUrl ? redirectInUrl : '/'

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const { state, dispatch } = useContext(Store)
        const { userInfo } = state

        const { mutateAsync: signin, isLoading } = useSigninMutation()

        const submitHandler = async (e: React.SyntheticEvent) => {
          e.preventDefault()
          try {
            const data = await signin({
              email,
              password,
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        }

        useEffect(() => {
          if (userInfo) {
            navigate(redirect)
          }
        }, [navigate, redirect, userInfo])

        return (
          <Container className="small-container">
            <Helmet>
              <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <Button disabled={isLoading} type="submit">
                  Sign In
                </Button>
                {isLoading && <LoadingBox />}
              </div>
              <div className="mb-3">
                New customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </div>
            </Form>
          </Container>
        )
      }


   ```

3. main.tsx

   ```js
   <Route path="/signin" element={<SigninPage />} />
   ```

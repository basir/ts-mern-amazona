# Video-33-Add-Sidebar-SearchBox

1. productRouter.ts

   ```js
   productRouter.get(
     '/categories',
     asyncHandler(async (req: Request, res: Response) => {
       const categories = await ProductModel.find().distinct('category')
       res.send(categories)
     })
   )
   ```

2. productHooks.ts

   ```js
   export const useGetCategoriesQuery = () =>
     useQuery({
       queryKey: ['categories'],
       queryFn: async () =>
         ((await apiClient.get) < [] > `/api/products/categories`).data,
     })
   ```

3. App.tsx

   ```js
   <Link
     to="#"
     className="nav-link header-link p-1"
     onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
   >
     <i className="fas fa-bars"></i> All
   </Link>

   ...
   </header>
   {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}
      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={userInfo ? `/profile` : `/signin`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
              </span>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              {' '}
              <strong>Categories</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
   ```

4. index.css

   ```css
   /* Sidebar */
   .side-navbar-backdrop {
     position: fixed; /* Stay in place */
     z-index: 1; /* Sit on top */
     left: 0;
     top: 0;
     width: 100%; /* Full width */
     height: 100%; /* Full height */
     overflow: auto; /* Enable scroll if needed */
     background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
   }
   .side-navbar {
     width: 340px;
     height: 100%;
     position: absolute;
     left: -350px;
     background-color: #f5f5f5;
     transition: 0.5s;
     z-index: 2;
   }
   .active-cont {
     margin-left: 340px;
   }
   .active-nav {
     left: 0;
   }

   .side-navbar-user {
     background-color: #232f3e !important;
     color: white;
     font-weight: bold;
   }

   button.side-navbar-user:hover {
     color: white;
   }
   ```

5. SearchBox.tsx

   ```js
   export default function SearchBox() {
     const navigate = useNavigate()
     const [query, setQuery] = useState('')
     const submitHandler = (e: { preventDefault: () => void }) => {
       e.preventDefault()
       navigate(query ? `/search/?query=${query}` : '/search')
     }

     return (
       <Form className="flex-grow-1 d-flex me-auto" onSubmit={submitHandler}>
         <InputGroup>
           <FormControl
             type="text"
             name="q"
             id="q"
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search Amazona"
             aria-label="Search Amazona"
             aria-describedby="button-search"
           ></FormControl>
           <Button variant="outline-primary" type="submit" id="button-search">
             <i className="fas fa-search"></i>
           </Button>
         </InputGroup>
       </Form>
     )
   }
   ```

6. App.tsx

   ```js
   replace
   <Form className="flex-grow-1 d-flex me-auto">...
   with
    <SearchBox />
   ```

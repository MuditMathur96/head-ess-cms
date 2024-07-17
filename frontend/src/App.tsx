
import { Provider } from "react-redux"
import Layout from "./components/shared/layout"
import Router from "./routes/router"
import { store } from "./store/store"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"

function App() {

  const client = new QueryClient();

  return (
    <>
    <QueryClientProvider client={client}>
      <Provider store={store}>
    <Layout>
      <Router />
    </Layout>
      </Provider>
    </QueryClientProvider>
    </>
  )
}

export default App

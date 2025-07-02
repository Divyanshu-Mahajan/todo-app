import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layout/Layout';
import AllTodos from './components/pages/AllTodos';
import AddTodo from './components/pages/AddTodo';
import CompletedTodos from './components/pages/CompletedTodos';
import PendingTodos from './components/pages/PendingTodos';
import Stats from './components/pages/Stats';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import TodoDetails from './components/pages/TodoDetails';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<AllTodos />} />
        <Route path='all-todos' element={<AllTodos />} />
        <Route path='all-todos/:id' element={<TodoDetails />} />
        <Route path='add-todo' element={<AddTodo />} />
        <Route path='completed' element={<CompletedTodos />} />
        <Route path='pending' element={<PendingTodos />} />
        <Route path='stats' element={<Stats />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

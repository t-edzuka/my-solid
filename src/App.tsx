import { Component, Show, createSignal } from "solid-js"

import { AddBook } from "./AddBook"
import { Book, BookList, initialBooks } from "./BookList"

interface BookShelfProps {
  name: string
}

const BookShelf = (props: BookShelfProps) => {
  const [books, setBooks] = createSignal<Book[]>(initialBooks)
  // show form using boolean signal
  const [showForm, setShowForm] = createSignal<boolean>(false)
  const toggleForm = () => setShowForm(!showForm())
  return (
    <>
      <h1>{props.name} Book Shelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add Book</button>}
      >
        <AddBook setBooks={(bs) => setBooks(bs)} />
        <button onClick={toggleForm}>Hide Form</button>
      </Show>
    </>
  )
}

const App: Component = () => {
  return (
    <>
      <BookShelf name="Solidjs" />
    </>
  )
}

export default App

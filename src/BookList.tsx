// import solidjs
import { createSignal, Component, For } from "solid-js"
import { render } from "solid-js/web"

export type Book = {
  title: string
  author: string
}

export const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
]

export interface BookListProps {
  books: Book[]
}

export function BookList(props: BookListProps) {
  const totalBooks = () => props.books.length
  return (
    <>
    <h2>Total Books: {totalBooks()}</h2>
      <ul>
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title}{" "}
                <span style={{ "font-style": "italic" }}>{book.author}</span>
              </li>
            )
          }}
        </For>
      </ul>
    </>
  )
}

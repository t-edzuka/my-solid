import { createSignal, Setter, JSX, createResource, For, Show } from "solid-js"
import { Book } from "./BookList"
import { searchBooks } from "./searchBooks"

export interface AddBookProps {
  setBooks: Setter<Book[]>
}


export function AddBook(props: AddBookProps) {
  //create input signal
  const [input, setInput] = createSignal<string>("")
  // create query signal
  const [query, setQuery] = createSignal<string>("")
  const execSearch: JSX.EventHandler<HTMLElement, MouseEvent> = (event) => {
    event.preventDefault()
    console.log(query())
    setQuery(input())
  }

  const [data] = createResource<Book[], string>(query, searchBooks)

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
          />
        </div>
        <button
          type="submit"
          onClick={execSearch}
        >
          Search
        </button>
      </form>
      <Show
        when={!data.loading}
        fallback={<p>Searching ...</p>}
      >
        <ul>
          <For each={data()}>
            {(b: Book) => (
              <li>
                {b.title} by {b.author}{" "}
                <button
                  aria-label={`Add ${b.title} by ${b.author} to your book list`}
                  onClick={(e) => {
                    e.preventDefault()
                    props.setBooks((books) => [...books, b])
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  )
}

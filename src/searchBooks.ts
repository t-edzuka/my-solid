type ResultItem = {
  title: string
  author_name: string[]
}

interface Results {
  docs: ResultItem[]
}

type ResultItemView = {
    title: string
    author: string // 複数のauthorをカンマ区切りで表示する
}

export const searchBooks = async (query: string): Promise<ResultItemView[]> => {
  if (query.trim() === "") return []
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURI(query)}`
  )

  const results: Results = await response.json()
  const docs = results.docs
  console.log(docs)
  return docs.slice(0, 10).map(({ title, author_name }) => {
    return { title, author: author_name?.join(", ") }
  })
}

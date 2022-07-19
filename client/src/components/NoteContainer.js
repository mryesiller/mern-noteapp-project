import React, { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import Loading from "./Loading"
import Wrapper from "../assets/wrappers/NoteContainer"

const NoteContainer = () => {
  const { getAllNotes, notes, totalNotes, page, isLoading } = useAppContext()
  useEffect(() => {
    getAllNotes()
  }, [])

  if (isLoading) {
    return <Loading />
  }
  if (notes.length === 0) {
    return (
      <Wrapper>
        <h2>No Notes to display</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalNotes} note{notes.length > 1 && "s"} found
      </h5>
    </Wrapper>
  )
}

export default NoteContainer

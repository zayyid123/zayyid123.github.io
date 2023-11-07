import React from 'react'
import { useParams } from 'react-router-dom'

const DetailPortfolio = ({ params }) => {
  const { id } = useParams()

  console.log(id)
  return (
    <div>DetailPortfolio</div>
  )
}

export default DetailPortfolio
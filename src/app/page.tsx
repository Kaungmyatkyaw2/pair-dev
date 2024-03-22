import { db } from '@/db'
import React from 'react'

const Home = async () => {

  const items = await db.query.testing.findMany();


  return (
    <div>
      {
        items.map(el => <div key={el.id}>
          {el.name}
        </div>)
      }
    </div>
  )
}

export default Home
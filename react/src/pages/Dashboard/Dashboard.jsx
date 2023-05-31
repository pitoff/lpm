import React from 'react'
import CardOne from '../../components/CardOne'
import CardTwo from '../../components/CardTwo'
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour'

const Dashboard = () => {
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
    </div>
  )
}

export default Dashboard
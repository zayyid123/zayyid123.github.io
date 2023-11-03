import BreadCrumbUser from '@/app/components/BreadCrumbUser'
import DetailPortfolioPage from '@/app/components/DetailPortfolioPage'
import React from 'react'

const PageDetail = ({ params }) => {
  const { id } = params

  return (
    <div
      className='bg-bg-200 w-full'
    >
      <div
        className='max-w-6xl m-auto py-28 px-5'
      >
        {/* breadcrumb */}
        <BreadCrumbUser 
          dataLink={[
            {
              name: 'Portfolio',
              link: '/portfolio'
            },
            {
              name: 'Detail',
              link: '-'
            },
          ]}
        />

        {/* detail info */}
        <div
          className='mt-8'
        >
          <DetailPortfolioPage id={id}/>
        </div>
      </div>
    </div>
  )
}

export default PageDetail
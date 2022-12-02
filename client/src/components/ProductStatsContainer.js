import { useAppContext } from '../context/appContext'
import { GiMountaintop, GiBookCover } from 'react-icons/gi'
import { FaMagic, FaHistory } from 'react-icons/fa'
import { HiOutlinePuzzle } from 'react-icons/hi'
import { RiKnifeBloodLine } from 'react-icons/ri'
import { IoMdRocket } from 'react-icons/io'
import StatItem from './StatItem'
const ProductStatsContainer = () => {
  const { productStats } = useAppContext()

  const defaultValue = [
    {
      category: 'Adventure',
      count: productStats.adventure || 0,
      icon: <GiMountaintop />,
      color: '#a2f2dd',
    },
    {
      category: 'Classic',
      count: productStats.classic || 0,
      icon: <GiBookCover />,
      color: '#e8d18d',
    },
    {
      category: 'Mystery',
      count: productStats.mystery || 0,
      icon: <HiOutlinePuzzle />,
      color: '#8795ed',
    },
    {
      category: 'Fantasy',
      count: productStats.fantasy || 0,
      icon: <FaMagic />,
      color: '#c9c6f5',
    },
    {
      category: 'Historical',
      count: productStats.historical || 0,
      icon: <FaHistory />,
      color: '#facf70',
    },
    {
      category: 'Horror',
      count: productStats.horror || 0,
      icon: <RiKnifeBloodLine />,
      color: '#f58769',
    },
    {
      category: 'Sci-fi',
      count: productStats['sci-fi'] || 0,
      icon: <IoMdRocket />,
      color: '#b3eafc',
    },
  ]

  return (
    <div className='container'>
      <h3 className='text-center fw-bold mb-3'>Total Product Categories</h3>
      <div className='category-all-products-admin'>
        {defaultValue.map((category, index) => {
          return <StatItem key={index} {...category}/>
        })}
      </div>
    </div>
  )
}
export default ProductStatsContainer

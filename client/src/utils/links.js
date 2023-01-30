import { RiDashboardFill } from 'react-icons/ri'
import { MdLibraryAdd } from 'react-icons/md'
import { FcStatistics } from 'react-icons/fc'
import { FiPackage } from 'react-icons/fi'

const links = [
  { id: 1, text: 'Home', path: '/' },
  { id: 2, text: 'About', path: 'about' },
  { id: 3, text: 'Products', path: 'products' },
]

const linksAdmin = [
  {
    id: 1,
    text: 'Statistics',
    path: '/admin',
    icon: <FcStatistics />,
  },
  {
    id: 2,
    text: 'All Products',
    path: 'products',
    icon: <RiDashboardFill />,
  },
  {
    id: 3,
    text: 'Create Product',
    path: 'create-product',
    icon: <MdLibraryAdd />,
  },
  {
    id: 4,
    text: 'All Orders',
    path: 'orders',
    icon: <FiPackage />,
  },
]
export { links, linksAdmin }

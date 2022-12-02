import { RiDashboardFill } from 'react-icons/ri'
import { MdLibraryAdd } from 'react-icons/md'
import { FcStatistics } from 'react-icons/fc'
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
]
export { links, linksAdmin }

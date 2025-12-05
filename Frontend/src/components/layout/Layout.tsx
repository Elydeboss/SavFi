/* import Sidebar from './Sidebar';
import Navbar from '../Navbar';
import { sidebarItems } from '../../data/sidebar';
import  { useState } from 'react';

const Layout: React.FC = () => {
  const [title, setTitle] = useState('Dashboard');
  const [currentPage, setCurrentPage] = useState('');
  return (
    <div>
      <Sidebar
        items={sidebarItems}
        onTitleChange={setTitle}
        onPageChange={setCurrentPage}
      />

      <div className=" md:ml-65 lg:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title={title} />
      </div>
    </div>
  );
};

export default Layout;
 */
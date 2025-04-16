import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

import './loader.scss';

const Loader = () => {
  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ClipLoader
        color="#ff7f00"
        size={50}
      />
    </motion.div>
  );
};

export default Loader;

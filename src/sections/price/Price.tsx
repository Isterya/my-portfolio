import { useTranslation } from 'react-i18next';

import { m, type Variants } from 'motion/react';

import PriceCard from '@/components/priceCard/PriceCard';
import { priceData } from '@/data/priceData';

import firstAbstract from '@/assets/img/skills/abstract-figure-1.webp';
import thirdAbstract from '@/assets/img/skills/abstract-figure-3.webp';

import './price.scss';

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Price = () => {
  const { t } = useTranslation();

  return (
    <section id="price" className="price" aria-labelledby="price-title">
      <div className="container">
        <div className="price-header">
          <h2 id="price-title" className="price-header__title">
            {t('price.title.before')} <span>{t('price.title.highlight')}</span>
          </h2>
          <p className="price-header__descr">{t('price.description')}</p>
        </div>

        <m.ul
          className="price-list"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {priceData.map((price) => (
            <m.li key={price.id} className="price-list__item" variants={itemVariants}>
              <PriceCard
                title={t(price.title)}
                icon={price.icon}
                price={price.price}
                description={t(price.description)}
              />
            </m.li>
          ))}
        </m.ul>
      </div>

      <img
        className="price__first-abstract"
        src={firstAbstract}
        alt=""
        width={594}
        height={601}
        loading="lazy"
        decoding="async"
      />
      <img
        className="price__third-abstract"
        src={thirdAbstract}
        alt=""
        width={873}
        height={828}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};

export default Price;

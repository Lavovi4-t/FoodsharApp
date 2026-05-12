import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Техническая документация фудшеринг приложения FoodsharingApp"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className="hero__title">FoodsharingApp</h1>
          <p className="hero__subtitle">Техническая документация фудшеринг приложения</p>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className={styles.card}>
                  <h3>📋 Требования</h3>
                  <p>Функциональные и нефункциональные требования к системе</p>
                  <Link
                    className="button button--primary button--lg"
                    to="/docs/requirements/functional"
                  >
                    Перейти →
                  </Link>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.card}>
                  <h3>🗄️ Модель данных</h3>
                  <p>ERD диаграмма и описание сущностей базы данных</p>
                  <Link
                    className="button button--primary button--lg"
                    to="/docs/data-model/erd-diagram"
                  >
                    Перейти →
                  </Link>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.card}>
                  <h3>🔌 API</h3>
                  <p>Документация API с примерами запросов и ответов</p>
                  <Link
                    className="button button--primary button--lg"
                    to="/api/"
                  >
                    Перейти →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
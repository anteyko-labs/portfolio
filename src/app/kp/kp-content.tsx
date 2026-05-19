'use client';

import { useEffect, useMemo, useRef } from 'react';
import styles from './kp.module.css';
import {
  WHY_ITEMS,
  formatPrice,
  docId,
  type Currency,
  type KPTemplate,
} from '@/lib/kp-templates';

const TELEGRAM_LINK = 'https://t.me/anteyko';

export type KPContentProps = {
  client: string;
  currency: Currency;
  template: KPTemplate;
  validUntil?: string;
  slug?: string;
};

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function KPContent({
  client,
  currency,
  template,
  validUntil,
  slug,
}: KPContentProps) {
  const documentId = useMemo(() => docId(client), [client]);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    []
  );

  const validUntilFormatted = useMemo(() => formatDate(validUntil), [validUntil]);

  const trackedRef = useRef(false);
  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    if (!client) return;
    fetch('/api/kp/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: slug ?? null,
        client,
        documentId,
        template: template.id,
        currency,
        url: window.location.href,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // silent — tracking failure shouldn't bother the client
    });
  }, [client, currency, documentId, slug, template.id]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={`${styles.toolbar} ${styles.noPrint}`}>
          <button
            type="button"
            onClick={handlePrint}
            className={styles.pdfBtn}
            aria-label="Скачать PDF"
          >
            ⬇ Скачать PDF
          </button>
        </div>

        <div className={styles.header}>
          <div className={styles.headerAccent} />
          <div className={styles.logoRow}>
            <div className={styles.logo}>ANTEYKO · DEVELOPMENT STUDIO</div>
            <div className={styles.docMeta}>{documentId} · {today}</div>
          </div>
          {client && (
            <div className={styles.clientLine}>Подготовлено для: {client}</div>
          )}
          <h1 className={styles.title}>
            {template.title}
            {template.titleLine2 ? <><br />{template.titleLine2}</> : null}
          </h1>
          <p className={styles.subtitle}>{template.subtitle}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Что вы получаете</div>
          <div className={styles.featuresGrid}>
            {template.features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureSub}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionLabel} style={{ marginBottom: '1rem' }}>
          Выберите пакет
        </div>
        <div className={styles.plansGrid}>
          {template.plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.plan} ${plan.featured ? styles.planFeatured : ''}`}
            >
              {plan.badge && (
                <div className={styles.planBadge}>{plan.badge}</div>
              )}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.planPrice}>{formatPrice(plan.priceSom, currency)}</div>
              <div className={styles.planTime}>⏱ {plan.time}</div>
              <hr className={styles.planDivider} />
              <ul className={styles.planFeatures}>
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className={`${styles.planFeatureItem} ${
                      !f.included ? styles.planFeatureMuted : ''
                    }`}
                  >
                    <span className={styles.planFeatureIcon}>
                      {f.included ? '✓' : '—'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.planBtn} ${
                  plan.featured ? styles.planBtnPrimary : styles.planBtnSecondary
                }`}
              >
                Выбрать →
              </a>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Почему Anteyko</div>
          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className={styles.whyItem}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <div>
                  <div className={styles.whyTitle}>{item.title}</div>
                  <div className={styles.whyDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Как работаем</div>
          <div className={styles.timeline}>
            {template.timeline.map((row, i) => (
              <div
                key={row.step}
                className={`${styles.tlRow} ${
                  i === template.timeline.length - 1 ? styles.tlRowLast : ''
                }`}
              >
                <div className={styles.tlStep}>{row.step}</div>
                <div className={styles.tlDesc}>
                  <strong>{row.desc}</strong> — {row.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <div>
            <div className={styles.footerTitle}>Готовы стартовать на этой неделе.</div>
            <div className={styles.footerSub}>
              Напишите — за 30 минут разберём детали и выберем пакет.
            </div>
          </div>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerBtn}
          >
            Обсудить проект →
          </a>
        </div>

        <div className={styles.verify}>
          <div className={styles.verifyLeft}>
            Документ <strong>{documentId}</strong> подготовлен{' '}
            <a href="https://anteyko.com" className={styles.verifyLink}>
              Anteyko Labs
            </a>
            {client ? <> для <strong>{client}</strong></> : null}.
            <br />
            {validUntilFormatted
              ? <>Срок действия предложения — до <strong>{validUntilFormatted.replace(/ г\.?$/, '')}</strong>.</>
              : <>Срок действия предложения — 14 дней с момента отправки.</>}
          </div>
          <div>
            <a href="https://anteyko.com/contact" className={styles.verifyLink}>
              anteyko.com/contact
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

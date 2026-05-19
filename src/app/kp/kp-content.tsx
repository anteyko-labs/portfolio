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
import {
  TESTIMONIALS,
  PAYMENT_TERMS,
  INCLUDED,
  NOT_INCLUDED,
  FROM_CLIENT,
  FAQ_ITEMS,
  GUARANTEE_TITLE,
  GUARANTEE_TEXT,
  LEGAL_INFO,
  CONTACT_INFO,
  SHOWCASE_CASES,
} from '@/lib/kp-data';
import {
  Icon,
  DownloadIcon,
  MessageIcon,
  CreditCardIcon,
  ClipboardIcon,
  ShieldIcon,
  ClockIcon,
} from './icons';

const TELEGRAM_LINK = 'https://t.me/Anteyko_labs';

function tgLink(message: string): string {
  return `${TELEGRAM_LINK}?text=${encodeURIComponent(message)}`;
}

export type KPContentProps = {
  client: string;
  currency: Currency;
  template: KPTemplate;
  validUntil?: string;
  slug?: string;
  intro?: string;
  brief?: string;
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
  intro,
  brief,
}: KPContentProps) {
  const showcaseCase = SHOWCASE_CASES[template.id];
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
        event: 'open',
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

  const trackClick = (
    target: 'plan' | 'footer' | 'sticky',
    planId?: string,
    planName?: string
  ) => {
    fetch('/api/kp/track', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'click',
        target,
        planId: planId ?? null,
        planName: planName ?? null,
        slug: slug ?? null,
        client,
        documentId,
        template: template.id,
        currency,
      }),
    }).catch(() => {
      // silent
    });
  };

  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    document.querySelectorAll<HTMLDetailsElement>('details').forEach((d) => {
      d.open = true;
    });
    window.print();
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
            <DownloadIcon size={14} /> Скачать PDF
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

        {intro && (
          <div className={styles.intro}>
            <div className={styles.introLabel}>Персонально для вас</div>
            <p className={styles.introText}>{intro}</p>
          </div>
        )}

        {brief && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Что мы поняли из вашей задачи</div>
            <p className={styles.briefText}>{brief}</p>
          </div>
        )}

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Что вы получаете</div>
          <div className={styles.featuresGrid}>
            {template.features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Icon id={f.iconId} size={20} />
                </div>
                <div className={styles.featureTitle}>{f.title}</div>
                <div className={styles.featureSub}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {TESTIMONIALS.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Отзывы клиентов</div>
            <div className={styles.testimonialsGrid}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={styles.testimonial}>
                  <p className={styles.testimonialQuote}>“{t.quote}”</p>
                  <div className={styles.testimonialAuthor}>
                    {t.initials && (
                      <div className={styles.testimonialAvatar}>{t.initials}</div>
                    )}
                    <div>
                      <div className={styles.testimonialName}>{t.author}</div>
                      <div className={styles.testimonialRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div className={styles.planTime}>
                <ClockIcon size={13} /> {plan.time}
              </div>
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
                href={tgLink(
                  `Здравствуйте! Заинтересовал пакет «${plan.name}» (${formatPrice(plan.priceSom, currency)}, ${plan.time}) по предложению ${documentId}${client ? ` для ${client}` : ''}. Готов обсудить детали.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('plan', plan.id, plan.name)}
                className={`${styles.planBtn} ${
                  plan.featured ? styles.planBtnPrimary : styles.planBtnSecondary
                }`}
              >
                Выбрать →
              </a>
              {slug && (
                <a
                  href={`/kp/${slug}/invoice/${plan.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.planInvoiceLink}
                >
                  <DownloadIcon size={12} /> Скачать счёт PDF
                </a>
              )}
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Технологии и архитектура</div>
          <p className={styles.techIntro}>
            Production-grade стек. Каждый компонент выбран осознанно — типизация
            end-to-end, идемпотентные webhooks, observability с первого дня.
          </p>
          <div className={styles.techGroups}>
            {template.techStack.map((category) => (
              <div key={category.label} className={styles.techCategory}>
                <div className={styles.techCategoryLabel}>{category.label}</div>
                <div className={styles.techCategoryItems}>
                  {category.items.map((item) => (
                    <div key={item.name} className={styles.techItem}>
                      <span className={styles.techItemName}>{item.name}</span>
                      {item.note && (
                        <span className={styles.techItemNote}>— {item.note}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>
              <ShieldIcon size={16} />
              Принципы разработки
            </div>
            <ul className={styles.principlesList}>
              {template.techPrinciples.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Условия проекта</div>
          <div className={styles.detailsGrid}>
            <div className={styles.detailsCol}>
              <div className={styles.detailsTitle}>
                <span className={styles.detailsIcon} aria-hidden="true">✓</span>
                Что входит в цену
              </div>
              <ul className={styles.detailsList}>
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.detailsCol}>
              <div className={styles.detailsTitle}>
                <span className={`${styles.detailsIcon} ${styles.detailsIconMuted}`} aria-hidden="true">—</span>
                Не входит
              </div>
              <ul className={`${styles.detailsList} ${styles.detailsListMuted}`}>
                {NOT_INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>
              <CreditCardIcon size={16} />
              Условия оплаты
            </div>
            <ul className={styles.paymentList}>
              {PAYMENT_TERMS.map((p) => (
                <li key={p.label}>
                  <strong>{p.label}:</strong> {p.schedule}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>
              <ClipboardIcon size={16} />
              Что нужно от вас
            </div>
            <ul className={styles.detailsList}>
              {FROM_CLIENT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Почему Anteyko</div>
          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className={styles.whyItem}>
                <div className={styles.whyIcon}>
                  <Icon id={item.iconId} size={22} />
                </div>
                <div>
                  <div className={styles.whyTitle}>{item.title}</div>
                  <div className={styles.whyDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showcaseCase && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Похожий проект из портфолио</div>
            <a
              href={showcaseCase.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.caseLink}
            >
              <div className={styles.caseBody}>
                <div className={styles.caseTitle}>{showcaseCase.title}</div>
                <div className={styles.caseDesc}>{showcaseCase.description}</div>
              </div>
              <div className={styles.caseArrow} aria-hidden="true">→</div>
            </a>
          </div>
        )}

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

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Частые вопросы</div>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className={styles.guarantee}>
          <div className={styles.guaranteeIcon}>
            <ShieldIcon size={28} />
          </div>
          <div>
            <div className={styles.guaranteeTitle}>{GUARANTEE_TITLE}</div>
            <p className={styles.guaranteeText}>{GUARANTEE_TEXT}</p>
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
            href={tgLink(
              `Здравствуйте! Хочу обсудить предложение ${documentId}${client ? ` для ${client}` : ''}. У меня есть вопросы по пакетам.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('footer')}
            className={styles.footerBtn}
          >
            Обсудить проект →
          </a>
        </div>

        <div className={styles.verify}>
          <div className={styles.verifyLeft}>
            Документ <strong>{documentId}</strong> подготовлен{' '}
            <a href={CONTACT_INFO.websiteUrl} className={styles.verifyLink}>
              Anteyko Labs
            </a>
            {client ? <> для <strong>{client}</strong></> : null}.
            <br />
            {validUntilFormatted
              ? <>Срок действия предложения — до <strong>{validUntilFormatted.replace(/ г\.?$/, '')}</strong>.</>
              : <>Срок действия предложения — 14 дней с момента отправки.</>}
          </div>
          <div>
            <a href={`${CONTACT_INFO.websiteUrl}/contact`} className={styles.verifyLink}>
              {CONTACT_INFO.website}/contact
            </a>
          </div>
        </div>

        <div className={styles.legalInfo}>
          <div className={styles.legalCol}>
            <div className={styles.legalLabel}>Исполнитель</div>
            <div><strong>{LEGAL_INFO.name}</strong></div>
            <div>ИНН: {LEGAL_INFO.inn}</div>
            <div>{LEGAL_INFO.city}</div>
          </div>
          <div className={styles.legalCol}>
            <div className={styles.legalLabel}>Банк</div>
            <div>{LEGAL_INFO.bank}</div>
            <div>БИК: {LEGAL_INFO.bik}</div>
            <div>Р/с ({LEGAL_INFO.accountCurrency}): {LEGAL_INFO.account}</div>
          </div>
          <div className={styles.legalCol}>
            <div className={styles.legalLabel}>Связь</div>
            <div>
              <a href={`mailto:${CONTACT_INFO.email}`} className={styles.legalLink}>
                {CONTACT_INFO.email}
              </a>
            </div>
            <div>
              <a href={CONTACT_INFO.telegramUrl} target="_blank" rel="noopener noreferrer" className={styles.legalLink}>
                {CONTACT_INFO.telegram}
              </a>
            </div>
            <div>
              <a href={CONTACT_INFO.websiteUrl} className={styles.legalLink}>
                {CONTACT_INFO.website}
              </a>
            </div>
          </div>
        </div>

      </div>

      <a
        href={tgLink(
          `Здравствуйте! Хочу обсудить предложение ${documentId}${client ? ` для ${client}` : ''}.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick('sticky')}
        className={`${styles.stickyCta} ${styles.noPrint}`}
        aria-label="Обсудить проект в Telegram"
      >
        <MessageIcon size={14} />
        Обсудить
      </a>
    </div>
  );
}

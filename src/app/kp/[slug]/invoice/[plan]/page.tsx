import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clients from '../../../../../../data/kp-clients.json';
import { getTemplate, formatPrice, docId, type Currency } from '@/lib/kp-templates';
import { LEGAL_INFO, CONTACT_INFO } from '@/lib/kp-data';
import styles from './invoice.module.css';
import { InvoicePrintButton } from './print-button';

type ClientEntry = {
  client: string;
  currency: string;
  template: string;
  validUntil?: string;
};

const CLIENTS = clients as Record<string, ClientEntry | string>;

function getClient(slug: string): ClientEntry | null {
  if (slug.startsWith('_')) return null;
  const entry = CLIENTS[slug];
  if (!entry || typeof entry === 'string') return null;
  return entry;
}

export const metadata: Metadata = {
  title: 'Счёт на оплату — Anteyko',
  description: 'Счёт на оплату от Anteyko Labs.',
  robots: { index: false, follow: false, nocache: true },
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ slug: string; plan: string }>;
}) {
  const { slug, plan: planId } = await params;
  const entry = getClient(slug);
  if (!entry) notFound();

  const currency: Currency = entry.currency === 'usd' ? 'usd' : 'som';
  const template = getTemplate(entry.template);
  const plan = template.plans.find((p) => p.id === planId);
  if (!plan) notFound();

  const documentId = docId(entry.client);
  const invoiceId = `${documentId}-INV-${plan.id.toUpperCase()}`;
  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={styles.page}>
      <InvoicePrintButton />

      <div className={styles.sheet}>
        <div className={styles.headerRow}>
          <div>
            <div className={styles.brand}>{LEGAL_INFO.name}</div>
            <div className={styles.subtle}>
              {LEGAL_INFO.city} · ИНН {LEGAL_INFO.inn}
            </div>
          </div>
          <div className={styles.docMeta}>
            <div className={styles.label}>Счёт на оплату</div>
            <div className={styles.invoiceId}>{invoiceId}</div>
            <div className={styles.date}>от {today}</div>
          </div>
        </div>

        <div className={styles.parties}>
          <div className={styles.party}>
            <div className={styles.partyLabel}>Исполнитель</div>
            <div className={styles.partyName}>{LEGAL_INFO.name}</div>
            <div className={styles.line}>ИНН: {LEGAL_INFO.inn}</div>
            <div className={styles.line}>{LEGAL_INFO.city}</div>
            <div className={styles.line}>{CONTACT_INFO.email}</div>
            <div className={styles.line}>{CONTACT_INFO.telegram}</div>
          </div>
          <div className={styles.party}>
            <div className={styles.partyLabel}>Заказчик</div>
            <div className={styles.partyName}>{entry.client}</div>
            <div className={styles.line}>
              Основание: коммерческое предложение {documentId}
            </div>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thNum}>№</th>
              <th>Наименование услуги</th>
              <th className={styles.thQty}>Кол-во</th>
              <th className={styles.thAmount}>Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tdNum}>1</td>
              <td>
                <div className={styles.serviceTitle}>
                  Пакет «{plan.name}» — {template.title}
                  {template.titleLine2 ? `, ${template.titleLine2}` : ''}
                </div>
                <div className={styles.serviceMeta}>
                  Срок: {plan.time} · 1 месяц поддержки включён
                </div>
              </td>
              <td className={styles.tdQty}>1</td>
              <td className={styles.tdAmount}>{formatPrice(plan.priceSom, currency)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className={styles.totalLabel}>Итого к оплате</td>
              <td className={styles.totalAmount}>{formatPrice(plan.priceSom, currency)}</td>
            </tr>
          </tfoot>
        </table>

        <div className={styles.payment}>
          <div className={styles.paymentLabel}>Реквизиты для оплаты</div>
          <div className={styles.paymentGrid}>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>Получатель</div>
              <div className={styles.cellValue}>{LEGAL_INFO.name}</div>
            </div>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>ИНН</div>
              <div className={styles.cellValue}>{LEGAL_INFO.inn}</div>
            </div>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>Банк получателя</div>
              <div className={styles.cellValue}>{LEGAL_INFO.bank}</div>
            </div>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>БИК</div>
              <div className={styles.cellValue}>{LEGAL_INFO.bik}</div>
            </div>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>Расчётный счёт ({LEGAL_INFO.accountCurrency})</div>
              <div className={styles.cellValue}>{LEGAL_INFO.account}</div>
            </div>
            <div className={styles.paymentCell}>
              <div className={styles.cellLabel}>Назначение платежа</div>
              <div className={styles.cellValue}>
                Оплата по счёту {invoiceId} (без НДС)
              </div>
            </div>
          </div>
        </div>

        <div className={styles.note}>
          <p>
            Счёт действителен 14 дней с даты выставления. Условия оплаты для пакета «{plan.name}»:
            {' '}
            {plan.id === 'start'
              ? '50% — авансом, 50% — после сдачи проекта.'
              : '30% — авансом, 40% — после демо, 30% — после сдачи проекта.'}
          </p>
          <p className={styles.subtle}>
            При получении оплаты — оригинал акта выполненных работ и подписанный экземпляр счёта
            предоставляется в течение 3 рабочих дней.
          </p>
        </div>

        <div className={styles.signature}>
          <div className={styles.signLeft}>
            <div className={styles.signLabel}>Исполнитель</div>
            <div className={styles.signLine}></div>
            <div className={styles.signName}>{LEGAL_INFO.name}</div>
          </div>
          <div className={styles.signRight}>
            <div className={styles.signLabel}>Заказчик</div>
            <div className={styles.signLine}></div>
            <div className={styles.signName}>{entry.client}</div>
          </div>
        </div>

        <div className={styles.footer}>
          Сгенерировано {today} · {CONTACT_INFO.websiteUrl}{slug ? `/kp/${slug}` : ''}
        </div>
      </div>
    </div>
  );
}

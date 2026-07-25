import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface NewMessageEmailProps {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

const subjectLabels: Record<string, string> = {
  genel: 'Genel Bilgi',
  fiyat: 'Fiyat Teklifi',
  mimar: 'Mimar Portal',
  bayi:  'Bayi Başvurusu',
}

export const NewMessageEmail = ({ name, email, phone, subject, message }: NewMessageEmailProps) => (
  <Html>
    <Head />
    <Preview>Yeni mesaj: {name} — {subjectLabels[subject] ?? subject}</Preview>
    <Body style={main}>
      <Container style={container}>

        {/* Header */}
        <Section style={header}>
          <Text style={logo}>ERAYDUŞ</Text>
          <Text style={headerSub}>Yeni İletişim Formu Mesajı</Text>
        </Section>

        {/* Alert bar */}
        <Section style={alertBar}>
          <Text style={alertText}>📬 Yeni bir mesaj aldınız</Text>
        </Section>

        {/* Details */}
        <Section style={body}>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              {[
                { label: 'Ad Soyad', value: name },
                { label: 'E-posta',  value: email },
                { label: 'Telefon',  value: phone ?? '—' },
                { label: 'Konu',     value: subjectLabels[subject] ?? subject },
              ].map(row => (
                <tr key={row.label}>
                  <td style={labelCell}>{row.label}</td>
                  <td style={valueCell}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Hr style={hr} />

          <Text style={messageLabel}>MESAJ</Text>
          <Text style={messageText}>{message}</Text>
        </Section>

        {/* CTA */}
        <Section style={ctaSection}>
          <Link href={`mailto:${email}?subject=Re: ${subjectLabels[subject] ?? subject}`} style={btnPrimary}>
            E-posta ile Yanıtla
          </Link>
          {phone && (
            <Link
              href={`https://wa.me/${phone.replace(/\D/g, '')}?text=Merhaba ${name}, mesajınız için teşekkürler.`}
              style={btnWhatsapp}
            >
              WhatsApp'tan Yaz
            </Link>
          )}
        </Section>

        <Hr style={hr2} />

        <Section style={footer}>
          <Text style={footerText}>
            Bu bildirim, Erayduş iletişim formundan otomatik gönderilmiştir.
          </Text>
          <Link href="https://eraydus.net/admin/messages" style={footerLink}>
            Admin panelinde görüntüle →
          </Link>
        </Section>

      </Container>
    </Body>
  </Html>
)

export default NewMessageEmail

const main = {
  backgroundColor: '#f4f4f5',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
}
const container = {
  backgroundColor: '#ffffff',
  margin: '32px auto',
  borderRadius: '12px',
  maxWidth: '560px',
  overflow: 'hidden',
  border: '1px solid #e4e4e7',
}
const header = {
  backgroundColor: '#0A0A0A',
  padding: '28px 32px 20px',
}
const logo = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '700',
  letterSpacing: '3px',
  margin: '0 0 4px',
}
const headerSub = {
  color: '#c9a86a',
  fontSize: '12px',
  letterSpacing: '1.5px',
  margin: 0,
}
const alertBar = {
  backgroundColor: '#fefce8',
  borderBottom: '1px solid #fde047',
  padding: '10px 32px',
}
const alertText = {
  color: '#854d0e',
  fontSize: '13px',
  fontWeight: '600',
  margin: 0,
}
const body = {
  padding: '28px 32px',
}
const labelCell = {
  color: '#71717a',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  paddingBottom: '12px',
  paddingRight: '20px',
  whiteSpace: 'nowrap' as const,
  verticalAlign: 'top' as const,
}
const valueCell = {
  color: '#18181b',
  fontSize: '14px',
  paddingBottom: '12px',
  verticalAlign: 'top' as const,
}
const hr = {
  borderColor: '#f4f4f5',
  margin: '8px 0 20px',
}
const hr2 = {
  borderColor: '#f4f4f5',
  margin: '0 32px',
}
const messageLabel = {
  color: '#71717a',
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '1px',
  margin: '0 0 10px',
}
const messageText = {
  color: '#18181b',
  fontSize: '15px',
  lineHeight: '24px',
  backgroundColor: '#fafafa',
  border: '1px solid #e4e4e7',
  borderRadius: '8px',
  padding: '16px',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
}
const ctaSection = {
  padding: '8px 32px 28px',
  display: 'flex',
  gap: '12px',
}
const btnPrimary = {
  backgroundColor: '#0A0A0A',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '600',
  lineHeight: '40px',
  paddingLeft: '20px',
  paddingRight: '20px',
  textDecoration: 'none',
  marginRight: '10px',
}
const btnWhatsapp = {
  backgroundColor: '#25D366',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '600',
  lineHeight: '40px',
  paddingLeft: '20px',
  paddingRight: '20px',
  textDecoration: 'none',
}
const footer = {
  padding: '20px 32px',
  textAlign: 'center' as const,
}
const footerText = {
  color: '#a1a1aa',
  fontSize: '12px',
  margin: '0 0 6px',
}
const footerLink = {
  color: '#c9a86a',
  fontSize: '12px',
}

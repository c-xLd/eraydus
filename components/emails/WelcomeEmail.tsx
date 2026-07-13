import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  email: string
}

export const WelcomeEmail = ({ email }: WelcomeEmailProps) => {
  const previewText = 'Erayduş dünyasına hoş geldiniz!'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>ERAYDUŞ</Text>
          </Section>
          
          <Section style={hero}>
            <Heading style={h1}>Mimari Zarafete<br/>Hoş Geldiniz</Heading>
            <Text style={text}>
              Merhaba,
            </Text>
            <Text style={text}>
              Bültenimize abone olduğunuz için teşekkür ederiz! Artık en yeni koleksiyonlarımızdan, mimari ilhamlardan ve özel tekliflerimizden ilk siz haberdar olacaksınız.
            </Text>
          </Section>

          <Section style={offerSection}>
            <Text style={offerTitle}>SİZE ÖZEL BİR HEDİYE</Text>
            <Text style={offerText}>
              Aramıza katılmanızı kutlamak adına, ilk siparişinizde veya ücretsiz ölçü/keşif hizmetimizde kullanabileceğiniz <strong>%5 İndirim</strong> fırsatını yakalayın.
            </Text>
            <Link href="https://eraydus.com/iletisim" style={button}>
              Ücretsiz Keşif Randevusu Alın
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Bu e-postayı, Erayduş bültenine ({email}) abone olduğunuz için aldınız.
            </Text>
            <Link href="https://eraydus.com" style={footerLink}>
              eraydus.com
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail

// Styles
const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 0',
  marginBottom: '64px',
  border: '1px solid #e6e6e6',
  borderRadius: '8px',
  maxWidth: '600px',
  overflow: 'hidden',
}

const header = {
  backgroundColor: '#0A0A0A',
  padding: '30px',
  textAlign: 'center' as const,
}

const logo = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: 0,
}

const hero = {
  padding: '40px 40px 20px',
}

const h1 = {
  color: '#0A0A0A',
  fontSize: '32px',
  fontWeight: '300',
  lineHeight: '1.2',
  marginBottom: '24px',
}

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '24px',
}

const offerSection = {
  backgroundColor: '#fdfbf7', // Subtle champagne/warm tint
  border: '1px solid #e8e2d4',
  borderRadius: '8px',
  margin: '0 40px 40px',
  padding: '30px',
  textAlign: 'center' as const,
}

const offerTitle = {
  color: '#b68d40', // Champagne
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0 0 12px',
}

const offerText = {
  color: '#525252',
  fontSize: '15px',
  lineHeight: '24px',
  marginBottom: '24px',
}

const button = {
  backgroundColor: '#0A0A0A',
  borderRadius: '4px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 'bold',
  lineHeight: '50px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  maxWidth: '280px',
}

const hr = {
  borderColor: '#e6e6e6',
  margin: '0 40px',
}

const footer = {
  padding: '30px 40px 0',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0 0 12px',
}

const footerLink = {
  color: '#a3a3a3',
  fontSize: '12px',
  textDecoration: 'underline',
}

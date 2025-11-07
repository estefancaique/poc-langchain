export const metadata = {
  title: 'POC LangChain - Planejador de Rotas',
  description: 'Planejador de rotas inteligente com LangChain, OpenAI e Google Maps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

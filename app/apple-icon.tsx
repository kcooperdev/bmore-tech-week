import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#241773',
          color: '#d4a017',
          fontSize: 118,
          fontWeight: 700,
          fontFamily: 'Impact, Arial Black, sans-serif',
          lineHeight: 1,
          borderRadius: 32,
        }}
      >
        B
      </div>
    ),
    size,
  )
}
